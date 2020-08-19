import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

const OrderActionBtns = ({ handleOrderCategory, spinner, handleDelete }) => {
  
    return (
      <div className="order-actions-btn">
        { //<button className="btn btn-primary">Activate Selected</button>
        }
        <button className="btn btn-danger" onClick={handleDelete} >{spinner ? <Spinner
          as="span"
          animation="border"
          variant='light'
          size="sm"
          role="status"
          aria-hidden="true"
        /> : 'DELETE SELECTED'}</button>
        {//<button className="btn btn-warning">Cancel Selected</button>
        }
          <select onChange={handleOrderCategory} name="" id="">
          <option value="All Orders">All Orders</option>
          <option value="Paid Orders">Paid Orders</option>
          <option value="Unpaid Orders">Unpaid Orders</option>
          <option value="Processed Orders">Processed Orders</option>
        </select>
      </div>
    );
}
 
export default OrderActionBtns;