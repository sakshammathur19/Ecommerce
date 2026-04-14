import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const API = process.env.REACT_APP_API;

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // 🔥 GET TOKEN DIRECTLY FROM LOCALSTORAGE (FIX)
  const getToken = () => {
    const authData = localStorage.getItem("auth");
    return authData ? JSON.parse(authData).token : null;
  };

  // 🔥 GET ALL CATEGORY
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);

      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // 🔥 CREATE CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();

      const { data } = await axios.post(
        `${API}/api/v1/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Create failed");
    }
  };

  // 🔥 UPDATE CATEGORY
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();

      const { data } = await axios.put(
        `${API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(`${updatedName} updated`);
        setVisible(false);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // 🔥 DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const token = getToken();

      const { data } = await axios.delete(
        `${API}/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success("Deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Manage Category</h1>

            {/* CREATE FORM */}
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            {/* CATEGORY LIST */}
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setVisible(true);
                          setSelected(c);
                          setUpdatedName(c.name);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* UPDATE MODAL */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
