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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const API = process.env.REACT_APP_API;

  // GET CATEGORY
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // GET PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/v1/product/product-list/${page}`,
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // TOTAL COUNT
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // LOAD MORE
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/v1/product/product-list/${page}`,
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
    }
  };

  // FILTER CATEGORY
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // FILTER API
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${API}/api/v1/product/product-filters`,
        { checked, radio },
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"ALL Products - Best offers"}>
      <div className="homepage container-fluid">
        <div className="row">
          {/* FILTER */}
          <div className="col-md-2 filter-panel">
            <h4>Filter By Category</h4>

            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}

            <h4 className="mt-3">Filter By Price</h4>

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

            <div className="product-grid">
              {products?.map((p) => (
                <div key={p._id} className="product-card">
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />

                  <h5>{p.name}</h5>
                  <p>{p.description?.substring(0, 40)}...</p>
                  <h6>₹{p.price}</h6>

                  <button onClick={() => navigate(`/product/${p.slug}`)}>
                    View
                  </button>

                  <button
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p]),
                      );
                      toast.success("Added");
                    }}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            {products.length < total && (
              <button onClick={() => setPage(page + 1)}>
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
