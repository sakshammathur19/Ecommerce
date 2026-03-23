import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../Context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="User Dashboard">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Welcome {auth?.user?.name}</h1>
            <p>Email: {auth?.user?.email}</p>
            <p>Contact: {auth?.user?.phone}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;