import React, { Component } from "react";
import { Link } from "react-router-dom";
import DisplayProducts from "../products-components/DisplayProducts";
import { FaPlus } from "react-icons/fa";
import Numbering from "../products-components/numbering";
import firebase from './../firebase';
import { useContext } from "react";
import { adminContext } from './../context';
const Products = () => {
  const { deletedProducts, setDeletedProducts } = useContext(adminContext)
  

  const handleDeleteAll = () => {

    const parent = document.getElementsByClassName('parent')
    const children = document.getElementsByClassName('children')
    if (window.confirm("are you sure you want to delete this item")) {
      if (parent.all.checked) {
     
        for (var i = 0; i < children.length; i++) { 
         
          const ProductsRef = firebase.database().ref('store-products/'+ children[i].value)
          ProductsRef.remove()
        }     
      } else {
        
        deletedProducts.map((prod) => {
          
            const itemRef = firebase.database().ref(`/store-products/${prod}`);
            itemRef.remove();
          
        })
      }
    }
   
  }
  return (
    <div className="products-components">
      <div className="my-products-components-container">
        <div className="all-products-title">
          <h4>All Products</h4>
          <p>Displaying all Published products</p>
        </div>
        <div>
          <div className="all-products-others">
            <div className="all-products-others-link">
              <Link to="/products/add">
                <FaPlus />
              </Link>
            </div>
            <div className="all-products-others-btn">
              <button onClick={handleDeleteAll} >Delete selected</button>
            </div>
          </div>
          <DisplayProducts/>
        </div>
      </div>
    </div>
  );
};

export default Products;
