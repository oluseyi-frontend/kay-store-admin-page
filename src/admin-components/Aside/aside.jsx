import React, { Component } from "react";

import { Link } from "react-router-dom";
import { FaUsers, FaProductHunt, FaHome } from "react-icons/fa";
import { RiOrderPlayLine  } from "react-icons/ri";
const MainAside = () => {
  return (
    <div className="main-aside">
      <div className="main-aside-container">
        <div className="main-aside-title">
          <h3>Admin</h3>
          <p>admin@gmail.com</p>
        </div>
        <div className="main-aside-links">
          <Link to="/"><FaHome/>Home</Link>
          <h4>USERS</h4>
          <Link to="/dashboard/users"><FaUsers/>All Users</Link>
          <h4>STORE</h4>
          <Link to="/dashboard/products"><FaProductHunt/>Products</Link>
          <Link to="/dashboard/orders"><RiOrderPlayLine/>Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default MainAside;
