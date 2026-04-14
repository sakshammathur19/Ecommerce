import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/auth";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [auth] = useAuth();

  const API = process.env.REACT_APP_API;

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/get-product/${params.slug}`
      );

      const p = data.product;

      setName(p.name);
      setId(p._id);
      setDescription(p.description);
      setPrice(p.price);
      setQuantity(p.quantity);
      setShipping(p.shipping);
      setCategory(p.category?._id);
    } catch (error) {
      console.log(error);
      toast.error("Error loading product");
    }
  };

  // GET CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/category/get-category`
      );

      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
      getAllCategory();
    }
  }, [params?.slug]);

  // UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);

      if (photo) {
        productData.append("photo", photo);
      }

      const { data } = await axios.put(
        `${API}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;

      const { data } = await axios.delete(
        `${API}/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Product Deleted");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Update Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Update Product</h1>

            <div className="m-1 w-75">

              {/* CATEGORY */}
              <Select
                bordered={false}
                placeholder="Select Category"
                size="large"
                className="form-select mb-3"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* PHOTO */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary w-100">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              {/* IMAGE PREVIEW */}
              <div className="text-center mb-3">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `${API}/api/v1/product/product-photo/${id}`
                  }
                  alt="product"
                  height="200"
                />
              </div>

              {/* INPUTS */}
              <input
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              <textarea
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />

              <input
                className="form-control mb-3"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />

              <input
                className="form-control mb-3"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />

              {/* SHIPPING */}
              <Select
                className="form-select mb-3"
                value={shipping}
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              {/* BUTTONS */}
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>

              <button
                className="btn btn-danger ms-2"
                onClick={handleDelete}
              >
                DELETE PRODUCT
              </button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;