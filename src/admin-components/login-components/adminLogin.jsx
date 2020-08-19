import React, { PureComponent } from "react";
import { useContext } from "react";
import { adminContext } from "../context";
import FormField from "./formField";
import "./login.css";
const AdminLogin = () => {
  const { user, setUser } = useContext(adminContext);
  return (
    <>
      <div className="login-page">
        <div className="login-page-container">
          <FormField />
        </div>
      </div>
      <div className="login-overlay"></div>
    </>
  );
};

export default AdminLogin;
