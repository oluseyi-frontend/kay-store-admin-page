import React, { Component } from 'react';

const OrderHeading = ({handleChange}) => {
    return (
      <>
        <div className="row">
          <div className="col-1">
            <input type="checkbox" onClick={handleChange} className='parent' name="" id="" />
          </div>
          <div className="col-1">
            <h6>No</h6>
          </div>
          <div className="col-4">
            <h6>OID</h6>
          </div>
          <div className="col-2">
            <h6>Payment Status</h6>
          </div>
          <div className="col-4">
            <h6>Action</h6>
          </div>
        </div>
      </>
    );
}
 
export default OrderHeading;