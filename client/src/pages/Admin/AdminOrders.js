import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // 🔥 GET ORDERS
  const getOrders = async () => {
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
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

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
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          {/* LEFT MENU */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-9">
            <h1>All Orders</h1>

            {orders?.length === 0 && <h4>No Orders Found</h4>}

            {orders?.map((o, i) => (
              <div className="border shadow mb-3" key={o._id + i}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{i + 1}</td>

                      <td>
                        <Select
                          variant="borderless"
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

                      <td>{o?.buyer?.name}</td>

                      <td>{moment(o?.createdAt).fromNow()}</td>

                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>

                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                {/* PRODUCTS */}
                <div className="container">
                  {o?.products?.map((p) => (
                    <div className="row mb-2 p-2 card flex-row" key={p._id + i}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>

                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : ₹ {p.price}</p>
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
