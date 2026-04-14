import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const API = process.env.REACT_APP_API; // ✅ IMPORTANT

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔥 GET ALL CATEGORY
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // 🔥 GET TOTAL
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  // 🔥 LOAD MORE
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // 🔥 FILTER
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  // 🔥 FILTER PRODUCTS
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"ALL Products - Best offers"}>
      <div className="homepage container-fluid">
        <div className="row">
          
          {/* FILTER */}
          <div className="col-md-2">
            <h4>Filter By Category</h4>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}

            <h4 className="mt-4">Filter By Price</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>

            <button
              className="btn btn-danger mt-3"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
          </div>

          {/* PRODUCTS */}
          <div className="col-md-10">
            <h1>All Products</h1>

            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                  
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`} // ✅ FIXED
                    className="card-img-top"
                    alt={p.name}
                  />

                  <div className="card-body">
                    <h5>{p.name}</h5>
                    <p>{p.description.substring(0, 30)}...</p>
                    <h6>₹ {p.price}</h6>

                    <button
                      className="btn btn-primary me-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Added to cart");
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE */}
            {products && products.length < total && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-warning"
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;