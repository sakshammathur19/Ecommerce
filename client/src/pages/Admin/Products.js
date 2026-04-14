import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const API = process.env.REACT_APP_API;

  // ================= GET ALL PRODUCTS =================
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-product`);

      // 🔥 SAFE CHECK
      if (data?.success) {
        setProducts(data?.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
      setProducts([]);
    }
  };

  // ================= LIFECYCLE =================
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products - Admin"}>
      <div className="row">
        {/* LEFT MENU */}
        <div className="col-md-3">
          <AdminMenu />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>

          <div className="d-flex flex-wrap justify-content-center">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="text-decoration-none text-dark"
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem", cursor: "pointer" }}
                  >
                    <img
                      src={`${API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5>{p.name}</h5>
                      <p>{p.description?.substring(0, 40)}...</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h4 className="text-center mt-5">No Products Found</h4>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
