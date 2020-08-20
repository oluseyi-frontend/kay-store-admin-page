import React, { Component, useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase, { db } from './../firebase';
import { adminContext } from './../context';

const OrderList = ({ order, orders, displayedOrder,message, setMessage, handleViewOrder, handleModal}) => {
 
  const {HighlightedOrders, setHighlightedOrders} = useContext(adminContext)

  
  
  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setHighlightedOrders([...HighlightedOrders, value]);
    } else {
      let deleted = [];
      deleted = [...HighlightedOrders];
      const index = HighlightedOrders.indexOf(value);
      deleted.splice(index, 1);
      setHighlightedOrders(deleted);
    }



    const parent = document.getElementsByClassName('parent')
    const children = document.getElementsByClassName('children')
    for (var i = 0; i < children.length; i++) {
      if (children[i].checked == false) {
        parent[0].checked = false
      }
    }
  }
  const handleOrderStage = (event) => {
   
    const { value } = event.target

    const orderRef = firebase
      .database()
      .ref("orders/" + order.id)
    orderRef.on('value', ((snapshot) => {
     const databaseOrder = snapshot.val()
      if (databaseOrder.status === 'paid') {
        firebase
          .database()
          .ref("orders/" + order.id)
          .update({
            orderStage: 'processed',
          }).then(() => {
            console.log('success')
          }).catch((error) => {
            console.log(error)
          })
      } else {
        setTimeout(() => {
          setMessage('')
        }, 3000)
        setMessage('you cannot process, it hasnt been paid for')
      }
}))
   

  }
   
  

  return (
    <>
     
      <div className="row">
       
        <div className="col-1">
          <input type="checkbox" className='children' onClick={handleChange} value={order.id} />
        </div>
        <div className="col-1">
          <p>{displayedOrder.indexOf(order) + 1}</p>
        </div>
        <div className="col-4 order-id">
          <p>{order.id} </p>
        </div>
        <div className="col-2">
          <span
            className={
              order.status == "not paid"
                ? "badge badge-danger"
                : "badge badge-success"
            }
          >
            {order.status}{" "}
          </span>
        </div>
        <div className="col-4 order-actions">
       
          <button className={order.orderStage ==='pending'? 'btn btn-sm btn-warning mx-1': 'btn btn-sm btn-success mx-1'} onClick={handleOrderStage}>{order.orderStage=='pending'? 'process?': 'processed'}</button>
        
          <Link to={`/orders/viewOrder/${order.id}`}>
            <button className='btn btn-primary btn-sm'>View Order</button>
          </Link>
        
        </div>
      </div>
      </>
    );
}
 
export default OrderList;