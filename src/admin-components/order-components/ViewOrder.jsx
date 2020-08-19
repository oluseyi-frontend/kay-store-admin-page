import React, { Component } from "react";
import { useContext } from "react";
import { adminContext } from "./../context";

const ViewOrder = ({ match }) => {
  const { orders } = useContext(adminContext);
  return (
    <div className="view-order">
      <div className="view-order-container">
        {orders.map((order) => {
          if (order.id == match.params.id) {
            return (
              <div className="view-order-container2" key={order.id}>
                <div className="customer-details">
                  <h4 className="text-center">ORDER DETAILS</h4>
                </div>
                <div className="customer">
                  <p>Customer Name: </p>
                  <h6>
                    {order.lastName} {order.firstName}
                  </h6>
                </div>
                <div className="customer">
                  <p>Customer State: </p>
                  <h6>{order.userstate}</h6>
                </div>
                <div className="customer">
                  <p>Customer Prefered Delivery: </p>
                  <h6>{order.deliveryType}</h6>
                </div>
                <div className="customer">
                  <p>Customer Local Goverment: </p>
                  <h6>{order.userLGA}</h6>
                </div>
                <div className="customer">
                  <p>Customer Address: </p>
                  <h6>{order.address}</h6>
                </div>
                <div className="customer">
                  <p>Customer Phone Number: </p>
                  <h6>{order.phone}</h6>
                </div>
                <div className="order-details">
                  {order.cart.map((item) => {
                    return (
                      <div className="order-details-inner" key={item.id}>
                        <img src={item.img} alt="" />
                        <div className="product-details">
                          <p>Product Name: </p>
                          <h6>{item.title}</h6>
                        </div>
                        <div className="product-details">
                          <p>Product Quantity:</p>
                          <h6>{item.count}</h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ViewOrder;
