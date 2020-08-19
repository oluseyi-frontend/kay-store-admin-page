import React, { Component } from 'react';
import ProductHdeading from './../products-components/productsHeading';

import MyPagination from './../products-components/pagination';
import firebase, {auth} from './../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { StoreOrders } from './Orderdata';
import OrderList from './OrderList';
import OrderHeading from './orderHeading';
import OrderActionBtns from './orderActions';
import OrderModal from './ModalOrder';
import { useContext } from 'react';
import { adminContext } from './../context';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const MainOrder = () => {
  const history = useHistory()
  const {orders, setOrders, HighlightedOrders, setHightlightedOrders} = useContext(adminContext)
  const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(10);
  const [displayedOrder, setDisplayedOrder] = useState(orders)
  const [modalOrder, setModalOrder] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [message, setMessage] = useState('')

const [spinner, setSpinner]= useState(false)
  const { user, setUser } = useContext(adminContext)
    
    
    useEffect(() => {
      setDisplayedOrder(orders);
    }, [orders])
  
  
  
  


  const indexOfLastPage = currentPage * ordersPerPage;

  const indexOfFirstPage = indexOfLastPage - ordersPerPage;

  const currentOrders = displayedOrder.slice(indexOfFirstPage, indexOfLastPage);

   
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleViewOrder = (id) => {
  
    const viewedOrder = orders.filter((item) => {
      if (id === item.id) {
        return item;
      }
    });
    setModalOrder(viewedOrder[0].cart)
  
    setUserInfo(viewedOrder[0])
  };
    
    const handleOrderCategory = (event) => { 
      const { value } = event.target
     
        if (value === "Paid Orders") {
         const tempOrder  = orders.filter((order) => {
                if (order.status === 'paid') {
         return order
                }         
         })          
            setDisplayedOrder(tempOrder)
        } else if (value === 'Unpaid Orders') {
              const tempOrder = orders.filter((order) => {
                if (order.status === "not paid") {
                  return order;
                }
              });
            
            setDisplayedOrder(tempOrder);
        } else if (value === 'Processed Orders') {
        
          const tempOrder = orders.filter((order) => {
            
             if (order.orderStage == "processed") {            
                  return order;
                }
              });
          
            setDisplayedOrder(tempOrder);
        }
        else {
              const tempOrder = orders.filter((order) => {          
                  return order;
              });
            setDisplayedOrder(orders);
        }
      
  }
  const handleModal = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }
  const handleChange = (event) => {
    const parent = document.getElementsByClassName('parent')
    const children = document.getElementsByClassName('children')
    if (parent[0].checked === true) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].checked == false) {
          children[i].checked = true
        }
      }
    }
    if (parent[0].checked === false) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].checked == true) {
          children[i].checked = false
        }
      }
    }
  }

  const handleDelete = () => {
    setSpinner(true)
    const parent = document.getElementsByClassName('parent')

    const children = document.getElementsByClassName('children')
    if (window.confirm("are you sure you want to delete this item")) {
      if (parent[0].checked === true) {
        for (var i = 0; i < children.length; i++) {
       
          const OrderRef = firebase.database().ref('orders/' + children[i].value)
          OrderRef.remove().then(() => {
            setSpinner(false)
          })
        }
      } else {
        HighlightedOrders.map((order) => {
       
          const OrderRef = firebase.database().ref('orders/' + order)
          OrderRef.remove().then(() => {
            setSpinner(false)
          })
        })
      }
    }
 
  }
  return (
    <div>
      <OrderActionBtns spinner={spinner} handleDelete={handleDelete} handleOrderCategory={handleOrderCategory} />
      <p style={{ color: 'red' }}>{message}</p>
      <div className="displaying-all-orders">
       
        <div className="m-container">
          
          <OrderHeading handleChange={handleChange} />
          
          {orders.length === 0 ? <Spinner className='my-spinner' animation="border" variant="warning" /> : currentOrders.map((order) => {
            return (
              <OrderList
                key={order.id}
                order={order}
                handleModal={handleModal}
                handleViewOrder={handleViewOrder}
                orders={orders}
                displayedOrder={displayedOrder}
                message={message}
                setMessage={setMessage}
              />
            );
          })}
        </div>
      </div>
      <MyPagination
        productsPerPage={ordersPerPage}
        totalProducts={displayedOrder.length}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
 
export default MainOrder;