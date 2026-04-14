import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API;

  // 💰 TOTAL PRICE
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  // 🗑 REMOVE ITEM
  const removeCartItem = (pid) => {
    const updated = cart.filter((item) => item._id !== pid);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Item removed");
  };

  // 🔑 GET TOKEN
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/braintree/token`);

      setClientToken(data?.clientToken || null);
    } catch (err) {
      console.log("TOKEN ERROR:", err);
      setClientToken(null);
    }
  };

  // 🔥 LOAD TOKEN ON LOGIN
  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // 💳 PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);

      const { nonce } = await instance.requestPaymentMethod();

      await axios.post(`${API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });

      toast.success("Payment Successful 🎉");
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
    } catch (err) {
      console.log(err);
      toast.error("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <h3>Hello {auth?.user?.name}</h3>

        {/* CART ITEMS */}
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div key={p._id} className="card mb-3 p-2">
                <img
                  src={`${API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  width="100"
                />

                <h5>{p.name}</h5>
                <p>₹ {p.price}</p>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="col-md-4">
            <h4>Total: ₹ {totalPrice()}</h4>

            {auth?.user?.address ? (
              <p>Address: {auth.user.address}</p>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => navigate("/login")}
              >
                Login to Checkout
              </button>
            )}

            {/* PAYMENT SAFE RENDER */}
            {clientToken && cart?.length > 0 && (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                  }}
                  onInstance={(inst) => setInstance(inst)}
                />

                <button
                  className="btn btn-dark w-100 mt-2"
                  onClick={handlePayment}
                  disabled={!instance || loading}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
