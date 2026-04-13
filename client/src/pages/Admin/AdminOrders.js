import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import { Select } from "antd";
import "../../styles/AdminOrders.css";

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

  // ✅ FIXED: useCallback added
  const getOrders = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log("ERROR IN GET ORDERS:", error);
    }
  }, [auth?.token]);

  // ✅ FIXED: dependency added safely
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token, getOrders]);

  // 🔥 HANDLE STATUS CHANGE
  const handleChange = async (value, orderId) => {
    try {
      await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      getOrders(); // refresh
    } catch (error) {
      console.log("STATUS UPDATE ERROR:", error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="admin-orders container-fluid">
        <div className="row">
          {/* LEFT MENU */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-9">
            <h1 className="admin-title">All Orders</h1>

            {orders?.length === 0 && (
              <h4 className="text-light">No Orders Found</h4>
            )}

            {orders?.map((o, i) => (
              <div className="order-card" key={o._id}>
                {/* ORDER HEADER */}
                <div className="order-header">
                  <span>Order #{i + 1}</span>
                  <span className="status-badge">{o?.status}</span>
                </div>

                {/* ORDER TABLE */}
                <div className="table-responsive">
                  <table className="table order-table">
                    <thead>
                      <tr>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Items</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>
                          <span
                            className={
                              o?.payment?.success
                                ? "payment-success"
                                : "payment-failed"
                            }
                          >
                            {o?.payment?.success ? "Success" : "Failed"}
                          </span>
                        </td>
                        <td>{o?.products?.length}</td>

                        <td>
                          <Select
                            variant="borderless"
                            className="status-select"
                            onChange={(value) => handleChange(value, o._id)}
                            defaultValue={o?.status}
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
                </div>

                {/* PRODUCTS */}
                <div className="products-grid">
                  {o?.products?.map((p) => (
                    <div className="product-mini-card" key={p._id}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
                      <div>
                        <h6>{p.name}</h6>
                        <p>{p.description.substring(0, 40)}...</p>
                        <span>₹ {p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
