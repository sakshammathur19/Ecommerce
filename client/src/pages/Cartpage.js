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
  const API = process.env.REACT_APP_API;

  // 💰 INR conversion
  const convertToINR = (usd) => usd * 83;

  // 💰 Total price
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });

    const inr = convertToINR(total);

    return inr.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  // 🗑 REMOVE ITEM
  const removeCartItem = (pid) => {
    const myCart = [...cart];
    const index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    toast.success("Item removed");
  };

  // 🔑 GET TOKEN (PAYMENT)
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 CALL TOKEN ON LOAD
  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // 💳 PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);

      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post(
        `${API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Successful 🎉");
      navigate("/dashboard/user/orders");
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
          <h2>Hello {auth?.user?.name || "Guest"}</h2>
          <p>
            {cart?.length
              ? `You have ${cart.length} items in cart`
              : "Cart is empty"}
          </p>
        </div>

        <div className="row">

          {/* LEFT CART ITEMS */}
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="cart-card mb-3" key={p._id}>

                {/* ✅ FIXED IMAGE */}
                <div className="cart-img">
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>

                <div className="cart-details">
                  <h5>{p.name}</h5>
                  <p>{p.description?.substring(0, 60)}...</p>

                  <div className="d-flex justify-content-between">
                    <h6>₹ {convertToINR(p.price)}</h6>

                    <button
                      className="btn btn-danger btn-sm"
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

            <h4>Cart Summary</h4>
            <hr />

            <h5>Total: {totalPrice()}</h5>

            {/* ADDRESS */}
            {auth?.user?.address ? (
              <div>
                <h6>Delivery Address</h6>
                <p>{auth.user.address}</p>

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

              {clientToken && cart?.length > 0 && (
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
                    disabled={loading || !instance}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                </>
              )}

            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
};

export default CartPage;