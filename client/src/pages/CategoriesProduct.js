import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Categoryproduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API; // ✅ IMPORTANT

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  // 🔥 GET PRODUCTS BY CATEGORY
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/product-category/${params.slug}`
      );

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">
          Category - {category?.name}
        </h4>

        <h6 className="text-center">
          {products?.length} result found
        </h6>

        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  {/* ✅ FIX IMAGE */}
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />

                  <div className="card-body">
                    <h5>{p.name}</h5>

                    <p>
                      {p.description.substring(0, 30)}...
                    </p>

                    <p>₹ {p.price}</p>

                    <button
                      className="btn btn-primary ms-1"
                      onClick={() =>
                        navigate(`/product/${p.slug}`)
                      }
                    >
                      More Details
                    </button>

                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;