import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/auth"; // ✅ IMPORTANT

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [auth] = useAuth(); // ✅ TOKEN

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // ✅ GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`,
      );

      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // ✅ GET ALL CATEGORY
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ✅ UPDATE PRODUCT
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
        `/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // 🔥 FIX
          },
        },
      );

      if (data?.success) {
        toast.success("Product Updated Successfully ✅");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed ❌");
    }
  };

  // ✅ DELETE PRODUCT
  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;

      await axios.delete(`/api/v1/product/delete-product/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // 🔥 FIX
        },
      });

      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Update Product</h1>

            <div className="m-1 w-75">
              {/* Category */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Photo Upload */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              {/* Preview */}
              <div className="mb-3 text-center">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `/api/v1/product/product-photo/${id}`
                  }
                  alt="product"
                  height="200"
                />
              </div>

              {/* Inputs */}
              <input
                type="text"
                value={name}
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                className="form-control mb-3"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                className="form-control mb-3"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                className="form-control mb-3"
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* Shipping */}
              <Select
                bordered={false}
                className="form-select mb-3"
                value={shipping}
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              {/* Buttons */}
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>

              <button className="btn btn-danger ms-2" onClick={handleDelete}>
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
