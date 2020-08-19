import React, { Component } from "react";
import UserInfo from "./userInfo";
import { Spinner } from "react-bootstrap";

const UserList = ({ allUsers, allUsersMain, handleChange, handleViewUserModal }) => {
  return (
    <>
      {allUsers.length === 0 ? <Spinner className='my-spinner' animation="border" variant="warning" />: allUsers.map((user) => {
        return (
          
          <UserInfo
            user={user}
            allUsersMain={allUsersMain}
            handleViewUserModal={handleViewUserModal}
            allUsers={allUsers}
            key={user.id}
            handleChange={handleChange}
          />
        );
      })}
    </>
  );
};

export default UserList;
