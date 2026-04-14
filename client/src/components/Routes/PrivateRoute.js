import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = auth?.token;

        if (!token) {
          setOk(false);
          return;
        }

        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          },
        );

        setOk(res.data?.ok);
      } catch (error) {
        console.log(error);
        setOk(false);
      }
    };

    authCheck();
  }, [auth?.token]);

  if (ok === null) return <Spinner />;

  if (!auth?.token || !ok) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
