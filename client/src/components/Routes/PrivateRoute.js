import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setOk(res.data.ok);
      } catch (error) {
        console.log(error);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  if (!auth?.user) return <Navigate to="/login" />; // not logged in
  return ok ? <Outlet /> : <Spinner />;             // user verified
}