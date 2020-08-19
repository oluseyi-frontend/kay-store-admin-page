import React, { Component } from 'react';
import { FaDivide } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyPagination = ({ productsPerPage, totalProducts, handlePageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='my-pagination'>
      {pageNumbers.map((pageNumber) => {
          return <Link onClick={() => { handlePageChange(pageNumber) }}>{pageNumber}</Link>;
      })}
    </div>
  );
};
 
export default MyPagination;