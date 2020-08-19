import React, { Component } from 'react';

const AllUsersHeading = ({handleChange}) => {
    return (
      <>
        <div className="row">
          <div className="col-1">
            <input type="checkbox" className='parent' onClick={handleChange} name="" id="" />
          </div>
          <div className="col-1">
            <h6>No</h6>
          </div>
          <div className="col-2">
            <h6>Name</h6>
          </div>
          <div className="col-4">
            <h6>Email</h6>
          </div>
          <div className="col-1">
            <h6>Role</h6>
          </div>
          <div className="col-3">
            <h6>Action</h6>
          </div>
        </div>
      </>
    );
}
 
export default AllUsersHeading;