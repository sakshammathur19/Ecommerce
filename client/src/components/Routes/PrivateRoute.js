import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(null); // 🔥 IMPORTANT: null start
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

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  // 🔥 WAIT FOR CHECK
  if (ok === null) return <Spinner />;

  // 🔥 NOT LOGGED IN
  if (!auth?.token) return <Navigate to="/login" />;

  // 🔥 NOT AUTHORIZED
  if (!ok) return <Navigate to="/login" />;

  return <Outlet />;
}