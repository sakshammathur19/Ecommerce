import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import "../styles/Categories.css";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories && categories.length > 0 ? (
            categories.map((c) => (
              <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <Link
                  to={`/category/${c.slug}`}
                  className="btn btn-primary w-100"
                >
                  {c.name}
                </Link>
              </div>
            ))
          ) : (
            <h4 className="text-center mt-5">No Categories Found</h4>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
