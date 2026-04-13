import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import "../../styles/AuthStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // 🔥 FIX: Works for both CRA and Vite deploy
  const API = process.env.REACT_APP_API || import.meta.env.VITE_API;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/v1/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data?.success) {
        toast.success(res.data.message || "Login successful");

        const userData = {
          user: res.data.user,
          token: res.data.token,
        };

        setAuth(userData);
        localStorage.setItem("auth", JSON.stringify(userData));

        if (res.data.user?.role === "admin" || res.data.user?.role === 1) {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/user");
        }
      } else {
        toast.error(res.data?.message || "Login failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
