import React, { Component } from "react";
import ProductDetail from "./productDetail";
import { Spinner } from "react-bootstrap";

const DatabaseProducts = ({ products, localCheck,setLocalCheck, handleDelete, mainProducts, checkBox }) => {
  return (
   
      <>
      {products.length===0 ? <Spinner className='my-spinner' animation="border" variant="warning" />: products.map((item) => {
        return (
            
            <ProductDetail
              key={item.id}
              item={item}
              localCheck={localCheck}
              setLocalCheck={setLocalCheck}
              checkBox={checkBox}
              products={products}
              mainProducts={mainProducts}
              handleDelete={handleDelete}
            />
          );
        })}
     
    </>
  );
};

export default DatabaseProducts;
