import React, { Component } from "react";
import firebase from "./../firebase";
import { useEffect } from "react";
import { useState } from "react";
import AllUsersActionBtns from "./actionBtns";
import UserList from "./UsersList";
import { UsersData } from "./Usersdata";
import AllUsersHeading from "./allUsersHeading";
import MyPagination from "./../products-components/pagination";
import AllUsersModal from "./UserPersonalInfo";
import { useContext } from "react";
import { ContextProvider } from "../context";
import { adminContext } from "./../context";

const MainAllUsers = () => {
  const { allUsers } = useContext(adminContext);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [spinner, setSpinner] = useState(false)
  const [spinner2, setSpinner2] = useState(false)
  const { HighlightedUsers, setHighlightedUsers } = useContext(adminContext)
  const indexOfLastPage = currentPage * usersPerPage;

  const indexOfFirstPage = indexOfLastPage - usersPerPage;

  const currentUsers = allUsers.slice(indexOfFirstPage, indexOfLastPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewUserModal = (id) => {

  };
  const handleChange = (event) => {
    const parent = document.getElementsByClassName("parent");

    const children = document.getElementsByClassName("children");

    if (parent[0].checked === true) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].checked == false) {
          children[i].checked = true;
        }
      }
    }
    if (parent[0].checked === false) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].checked == true) {
          children[i].checked = false;
        }
      }
    }
  };

  const handleDactivation = () => {
    setSpinner2(true)
    const parent = document.getElementsByClassName("parent");
    const children = document.getElementsByClassName("children");

    if (window.confirm("are you sure you want to delete this item")) { 
      if (parent[0].checked === true) {
        for (var i = 0; i < children.length; i++) {
          if (children[i].checked == true) {
            const events = firebase
              .firestore()
              .collection("users")
              .doc(children[i].value);
            events.update({
              status: "invalid",
            }).then(() => {
              setSpinner2(false)
            })
          }
        }
      } else {
        HighlightedUsers.map((hUser) => {
    
          const events = firebase
            .firestore()
            .collection("users")
            .doc(hUser);
          events.update({
            status: "invalid",
          }).then(() => {
            setSpinner2(false)
          })
        })
      }
    } else {
      setSpinner2(false)
    }
  
  };
  const handleActivation = () => {
    setSpinner(true)
    const parent = document.getElementsByClassName("parent");
    const children = document.getElementsByClassName("children");

    if (window.confirm("are you sure you want to activate this item")) {
      if (parent[0].checked === true) {
        for (var i = 0; i < children.length; i++) {
          if (children[i].checked == true) {
            const events = firebase
              .firestore()
              .collection("users")
              .doc(children[i].value);
            events.update({
              status: "valid",
            }).then(() => {
              setSpinner(false)
            })
          }
        }
      } else {
        HighlightedUsers.map((hUser) => {
          const events = firebase
            .firestore()
            .collection("users")
            .doc(hUser);
          events.update({
            status: "valid",
          }).then(() => {
            setSpinner(false)
          })
        })
      }
    } else {
      setSpinner(false)
     }
 
  };
  return (
    <div>
      <AllUsersActionBtns spinner={spinner} spinner2={spinner2} handleDactivation={handleDactivation} handleActivation={handleActivation} />
      <div className="displaying-all-users">
        <div className="m-container">
          <AllUsersHeading handleChange={handleChange} />
          <UserList
            handleViewUserModal={handleViewUserModal}
            allUsersMain={allUsers}
            allUsers={currentUsers}
            handleChange={handleChange}
          />
        </div>
      </div>
      <MyPagination
        productsPerPage={usersPerPage}
        totalProducts={allUsers.length}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default MainAllUsers;
