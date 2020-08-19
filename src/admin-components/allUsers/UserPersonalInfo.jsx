import React, { Component } from 'react';
import AllUsers from './../dashboard-components/AllUsers';
import { useContext } from 'react';
import { adminContext } from './../context';
import { useEffect } from 'react';
import { useState } from 'react';

const UserPersonalInfo = ({ match }) => {
  const { allUsers } = useContext(adminContext);
  const [user, setUser] = useState([])

  useEffect(() => {
    allUsers.map((user) => {
   
      if (user.id == match.params.id) {
        
      }
    });

  }, [])
  
    return (
      <div className="all-users-modal">
        <div className="all-users-modal-container">
          { allUsers.map((user) => {
      if (user.id == match.params.id) {
        return (
          <div className="user-details" key={user.id}>
            <div>
              <h4 className="text-center">USER DETAILS</h4>
            </div>
            <div className="customer">
              <p>Customer Name: </p>
              <h6>
                {user.lastName} {user.firstName}
              </h6>
            </div>
            <div className="customer">
              <p>User Email: </p>
              <h6>{user.email}</h6>
            </div>
            <div className="customer">
              <p>User State: </p>
              <h6>{user.userstate}</h6>
            </div>
            <div className="customer">
              <p>User Local Goverment: </p>
              <h6>{user.userLGA}</h6>
            </div>
            <div className="customer">
              <p>User Address: </p>
              <h6>{user.address}</h6>
            </div>
            <div className="customer">
              <p>User Phone Number: </p>
              <h6>{user.phoneNumber}</h6>
            </div>
            <div className="customer">
              <p>User Role: </p>
              <h6>{user.role}</h6>
            </div>
            <div className="customer">
              <p>User Status: </p>
              <h6>{user.status}</h6>
            </div>
          </div>
        );
      }
    })}
        </div>
      </div>
    );
}
 
export default UserPersonalInfo;