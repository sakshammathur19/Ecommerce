import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // ================= GET ALL PRODUCTS =================
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong"); // ✅ typo fixed
    }
  };

  // ================= LIFECYCLE =================
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products - Admin"}>
      <div className="row">

        {/* ================= LEFT MENU ================= */}
        <div className="col-md-3">
          <AdminMenu />
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>

          <div className="d-flex flex-wrap">
            {products && products.length > 0 ? (
              products.map((p) => (
                <Link
                  key={p._id} // ✅ correct key
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem", cursor: "pointer" }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>

                      <p className="card-text">
                        {p.description?.substring(0, 40)}...
                      </p>
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