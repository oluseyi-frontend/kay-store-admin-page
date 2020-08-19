import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

const ProductHdeading = ({ handleChange }) => {
  
    return (
      <>
        <div className="row">
          <div className="col-1">
            <input
              type="checkbox"
              onClick={handleChange}
              name="all"
           className='parent'
              id=""
            />
          </div>
          <div className="col-1">
            <h6>No</h6>
          </div>
          <div className="col-4">
            <h6>Name</h6>
          </div>
          <div className="col-2">
            <h6>Company</h6>
          </div>
          <div className="col-4">
            <h6>Action</h6>
          </div>
        </div>
      </>
    );
}
 
export default ProductHdeading;