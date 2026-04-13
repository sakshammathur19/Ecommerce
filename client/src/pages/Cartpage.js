import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartPage.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 💰 Convert USD → INR (static rate approx)
  const convertToINR = (usd) => usd * 83;

  // 💰 Total Price in INR
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });

      const inr = convertToINR(total);

      return inr.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 🗑 Remove item
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed");
    } catch (error) {
      console.log(error);
    }
  };

  // 🔑 Get payment token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // 💳 Payment
  const handlePayment = async () => {
    try {
      setLoading(true);

      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);

      navigate("/dashboard/user/orders");
      toast.success("Payment Successful 🎉");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment Failed");
    }
  };

  return (
    <Layout>
      <div className="cart-page container py-4">
        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-gold">
            Hello {auth?.user?.name || "Guest"} 
          </h2>
          <p className="text-muted cart-subtext">
            {cart?.length
              ? `You have ${cart.length} items in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        <div className="row">
          {/* LEFT CART ITEMS */}
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="cart-card shadow-sm mb-3" key={p._id}>
                <div className="cart-img">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>

                <div className="cart-details">
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 60)}...</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="price">
                      ₹ {convertToINR(p.price).toLocaleString("en-IN")}
                    </h6>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="col-md-4">
            <div className="cart-summary shadow">
              <h4 className="text-center mb-3">Cart Summary</h4>

              <hr />

              <h5 className="text-center mb-3">Total: {totalPrice()}</h5>

              {/* ADDRESS */}
              {auth?.user?.address ? (
                <div className="address-box">
                  <h6>Delivery Address</h6>
                  <p>{auth?.user?.address}</p>

                  <button
                    className="btn btn-outline-warning w-100"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-warning w-100"
                  onClick={() => navigate("/login", { state: "/cart" })}
                >
                  Login to Checkout
                </button>
              )}

              {/* PAYMENT */}
              <div className="mt-3">
                {!clientToken || !cart?.length ? null : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-dark w-100 mt-2"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
