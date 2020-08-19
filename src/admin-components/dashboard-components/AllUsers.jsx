import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import firebase from './../firebase';
import MainAllUsers from '../allUsers/allUsersMain';
import AllUsersTitle from '../allUsers/allUsersTitle';
import './../allUsers/allusers.css'

const AllUsers = () => {

   
    return (
      <div className="all-users-component">
        <div className="my-all-users-container">
          <AllUsersTitle/>
         <MainAllUsers/>
        </div>
      </div>
    );
}
 
export default AllUsers;