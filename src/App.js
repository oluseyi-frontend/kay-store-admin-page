import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";


import Home from "./admin-components/dashboard-components/Home";
import AllUsers from "./admin-components/dashboard-components/AllUsers";
import Products from "./admin-components/dashboard-components/Products";
import Orders from "./admin-components/dashboard-components/Orders";
import Header from "./admin-components/header";
import CreateProducts from "./admin-components/products-components/CreateProducts";
import AddUsers from "./admin-components/allUsers/addUsers";
import UserPersonalInfo from "./admin-components/allUsers/UserPersonalInfo";
import ViewOrder from "./admin-components/order-components/ViewOrder";
import { adminContext } from './admin-components/context';
import AdminLogin from './admin-components/login-components/adminLogin';
import EditProducts from './admin-components/products-components/EditProducts';

function App() {
  const {user, setUser} = useContext(adminContext)
  return !user ? (
    <Router>
      <Route path="/" exact component={AdminLogin} />
    </Router>
  ) : (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard/users" component={AllUsers} />
        <Route path="/dashboard/products" component={Products} />
        <Route path="/dashboard/orders" component={Orders} />
        <Route path="/products/add" component={CreateProducts} />
        <Route path="/users/add" component={AddUsers} />
        <Route path="/users/userInfo/:id" component={UserPersonalInfo} />
        <Route path="/orders/viewOrder/:id" component={ViewOrder} />
        <Route path="/products/edit/:id" component={EditProducts} />
      </Switch>
    </Router>
  );
}

export default App;
