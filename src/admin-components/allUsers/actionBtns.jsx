import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const AllUsersActionBtns = ({ handleDactivation, spinner, spinner2, handleActivation}) => {
  return (
      
      <div className="all-users-action-btn">
        <div className="add-new-user">
          <Link to='/users/add'>
            <button className="btn btn-primary">
              <FaPlus />
            </button>
          </Link>
        </div>
        <div className="selection-btns">
        <button className="btn btn-danger" onClick={handleDactivation}>
          {spinner2 ? <Spinner
            as="span"
            animation="border"
            variant='light'
            size="sm"
            role="status"
            aria-hidden="true"
          /> : 'DEACTIVATE SELECTED'}</button>
          <button className="btn btn-success" onClick={handleActivation}>
            {spinner ? <Spinner
              as="span"
              animation="border"
              variant='light'
              size="sm"
              role="status"
              aria-hidden="true"
            /> : 'ACTIVATE SELECTED'}
            </button>
        </div>
      </div>
    );
}
 
export default AllUsersActionBtns;