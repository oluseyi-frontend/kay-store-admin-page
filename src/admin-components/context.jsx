import React, { Component } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useEffect } from "react";
import { useState } from "react";
import { UsersData } from "./allUsers/Usersdata";
import { StoreOrders } from "./order-components/Orderdata";
import firebase, { db, auth } from "./firebase";
import { useHistory, Redirect } from 'react-router-dom';
export const adminContext = React.createContext();

export const ContextProvider = (props) => {
const history = useHistory()
  const [allUsers, setAllUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [HighlightedUsers, setHighlightedUsers] = useState([]);
  const [HighlightedOrders, setHighlightedOrders] = useState([]);
  const [title, setTitle] = useState()
  const [price, setPrice] = useState()
  const [company, setCompany] = useState()
  const [info, setInfo] = useState()
  const [imageUrl, setImageUrl] = useState()
  
  useEffect(() => {
    retrieveUsers();
  }, []);

  useEffect(() => {
    getFromDatabase();
  }, []);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    }, []);

  const handleLogOut = () => {
    auth.signOut()
      .then(() => {        
      })
  }
  const getFromDatabase = () => {
    const OrdersRef = firebase.database().ref("orders");
    OrdersRef.on("value", (snapshot) => {
      const databaseOrders = snapshot.val();
      let newArray = [];
      for (let databaseOrder in databaseOrders) {
        newArray.push({
          id: databaseOrder,
          address: databaseOrders[databaseOrder].address,
          deliveryType: databaseOrders[databaseOrder].deliveryType,
          firstName: databaseOrders[databaseOrder].firstName,
          lastName: databaseOrders[databaseOrder].lastName,
          paymentType: databaseOrders[databaseOrder].paymentType,
          phone: databaseOrders[databaseOrder].phone,
          status: databaseOrders[databaseOrder].status,
          userLGA: databaseOrders[databaseOrder].userLGA,
          userstate: databaseOrders[databaseOrder].userstate,
          cart: databaseOrders[databaseOrder].cart,
          orderStage: databaseOrders[databaseOrder].orderStage,
        });
      }
      setOrders(newArray);
    });
    //setOrders(StoreOrders);
  };

  const retrieveUsers = () => {
    const events = firebase.firestore().collection("users");
    events.onSnapshot((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
    })
   
    
     
      
      setAllUsers(tempDoc);
    });
    //setAllUsers(UsersData)
  };

  return (
    <adminContext.Provider
      value={{
        allUsers: allUsers,
        setAllUsers: setAllUsers,
        orders: orders,
        setOrders: setOrders,
        user: user,
        setUser: setUser,
        deletedProducts: deletedProducts,
        setDeletedProducts: setDeletedProducts,
        HighlightedOrders: HighlightedOrders,
        HighlightedUsers: HighlightedUsers,
        setHighlightedOrders: setHighlightedOrders,
        setHighlightedUsers: setHighlightedUsers,
        title: title,
        setTitle: setTitle,
        price: price,
        setPrice: setPrice,
        company: company,
        setCompany: setCompany,
        setInfo: setInfo,
        info: info,
        imageUrl: imageUrl,
        setImageUrl: setImageUrl,
        handleLogOut:handleLogOut
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};
