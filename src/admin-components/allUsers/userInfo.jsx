import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase from './../firebase';
import { adminContext } from './../context';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';


const UserInfo = ({ user, allUsers, allUsersMain, handleViewUserModal }) => {
  const { HighlightedUsers, setHighlightedUsers } = useContext(adminContext)
  const [spinner, setSpinner] = useState(false)

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setHighlightedUsers([...HighlightedUsers, value]);
    } else {
      let highlighted = [];
      highlighted = [...HighlightedUsers];
      const index = HighlightedUsers.indexOf(value);
     highlighted.splice(index, 1);
      setHighlightedUsers(highlighted);
    }
    const parent = document.getElementsByClassName('parent')
    const children = document.getElementsByClassName('children')
    for (var i = 0; i < children.length; i++) {
      if (children[i].checked == false) {
        parent[0].checked = false
      } 
    }
  }

  const handleClick = (id) => {
   setSpinner(true)
    const events = firebase.firestore().collection("users").doc(id)
    events.update({
    status: 'invalid'
    }).then(() => {
    setSpinner(false)
    }).catch(() => {
    
  })
    
  }
    return (
      <div className="row">
        <div className="col-1">
          <input type="checkbox" onClick={handleChange} value={user.id} className='children' />
        </div>
        <div className="col-1">
          <p>{allUsersMain.indexOf(user) + 1}</p>
        </div>
        <div className="col-2">
          <p>
            {user.lastName} {user.firstName}
          </p>
        </div>
        <div className="col-4">
          <p>{user.email}</p>
        </div>
        <div className="col-1">
          <p>{user.role}</p>
        </div>
        <div className="col-3 user-actions">
          <button className="btn btn-sm btn-danger" onClick={() => { handleClick(user.id) }}>
            {spinner ? <Spinner
              as="span"
              animation="border"
              variant='light'
              size="sm"
              role="status"
              aria-hidden="true"
            /> : 'DEACTIVATE'}</button>
          
          <Link to={`/users/userInfo/${user.id}`}>
          <button className="btn btn-sm btn-primary">View</button>
          </Link>
          
        </div>
      </div>
    );
}
 
export default UserInfo;