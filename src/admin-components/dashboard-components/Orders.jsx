import React, { Component } from 'react';
import OrderTitle from './../order-components/orderTitle';
import MainOrder from './../order-components/OrderMain';
import './../order-components/order.css'
import OrderActionBtns from '../order-components/orderActions';
const Orders = () => {
    return (
      <div className="orders-component">
        <div className="my-orders-component-container">
          <OrderTitle />
          <MainOrder/>
        </div>
      </div>
    );
}
 
export default Orders;