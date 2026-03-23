import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/UserMenu.css";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <h4>User Panel</h4>
        <NavLink
          to="/dashboard/user"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          My Orders
        </NavLink>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
