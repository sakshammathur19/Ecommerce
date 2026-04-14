import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const API = process.env.REACT_APP_API;

  // GET ALL ORDERS
  const getOrders = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/auth/all-orders`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      // 🔥 SAFE CHECK (IMPORTANT)
      if (data?.success) {
        setOrders(data?.orders || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log("GET ORDERS ERROR:", error);
      setOrders([]);
    }
  }, [auth?.token, API]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token, getOrders]);

  // UPDATE STATUS
  const handleChange = async (value, orderId) => {
    try {
      await axios.put(
        `${API}/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      getOrders();
    } catch (error) {
      console.log("STATUS ERROR:", error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>All Orders</h1>

            {/* 🔥 SAFE MAP CHECK */}
            {Array.isArray(orders) &&
              orders.map((o, i) => (
                <div className="border p-3 mb-3" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Items</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.buyer?.name}</td>

                        {/* 🔥 FIXED createdAt */}
                        <td>{moment(o?.createdAt).fromNow()}</td>

                        <td>
                          {o?.payment?.success ? "Success" : "Failed"}
                        </td>

                        <td>{o?.products?.length || 0}</td>

                        <td>
                          <Select
                            defaultValue={o?.status}
                            onChange={(value) =>
                              handleChange(value, o._id)
                            }
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* PRODUCTS */}
                  <div className="d-flex flex-wrap">
                    {o?.products?.map((p) => (
                      <div
                        key={p._id}
                        className="card m-2 p-2"
                        style={{ width: "16rem" }}
                      >
                        <img
                          src={`${API}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <h6>{p.name}</h6>
                          <p>{p.description?.substring(0, 30)}...</p>
                          <p>₹ {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* EMPTY STATE */}
            {orders.length === 0 && (
              <h4 className="text-center">No Orders Found</h4>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;