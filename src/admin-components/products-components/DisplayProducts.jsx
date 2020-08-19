import React, { Component, useState } from "react";
import firebase, { db } from "./../firebase";
import { useEffect } from "react";
import Products from "./../dashboard-components/Products";
import InfiniteScroll from "react-infinite-scroll-component";
import { Pagination } from "react-bootstrap";
import DatabaseProducts from "./databaseProduct";
import MyPagination from './pagination';
import ProductHdeading from "./productsHeading";
import "./products.css";
import { StoreProducts } from './data';
import { useContext } from "react";
import { adminContext } from './../context';


const DisplayProducts = (props) => {
  


  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(10)
  const [checkBox, setCheckBox] = useState(false)
  const [localCheck, setLocalCheck] = useState();
  const { deletedProducts, setDeletedProducts } = useContext(adminContext)
  const { title, setTitle, price, setPrice, company, setCompany, info, setInfo, imageUrl, setImageUrl } = useContext(adminContext)
    useEffect(() => {
    const productsRef = firebase.database().ref("store-products");
    productsRef.on("value", (snapshot) => {
      const databaseProducts = snapshot.val();
      let newArray = [];
      for (let databaseProduct in databaseProducts) {
        newArray.push({
          id: databaseProduct,
          title: databaseProducts[databaseProduct].title,
          company: databaseProducts[databaseProduct].company,
          info: databaseProducts[databaseProduct].info,
          img: databaseProducts[databaseProduct].img,
          price: databaseProducts[databaseProduct].price,
          inCart: databaseProducts[databaseProduct].incart,
          count: databaseProducts[databaseProduct].count,
          total: databaseProducts[databaseProduct].total,
        });
      }
      setProducts(newArray);
    });
      //setProducts(StoreProducts);
  }, []);
    
    



  const handleDelete = (id) => {
    if (window.confirm("are you sure you want to delete this item")) {
      const itemRef = firebase.database().ref(`/store-products/${id}`);
      itemRef.remove();
    }
  };

    //GET CURRENT POST

    const indexOfLastPage = currentPage * productsPerPage
    
    const indexOfFirstPage = indexOfLastPage - productsPerPage
    
    const currentProducts = products.slice(indexOfFirstPage, indexOfLastPage)
    
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber)
  
  }
  
  const handleChange = (event) => {
    const parent = document.getElementsByClassName('parent')
   
    const children = document.getElementsByClassName('children')
 
    if (parent.all.checked === true) {
      for (var i = 0; i < children.length; i++){
    
        if (children[i].checked == false) {
          children[i].checked = true
        
        
      //setDeletedProducts([...deletedProducts, children[i].value ])
        }
      }
    }
    if (parent.all.checked === false) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].checked == true) {
          children[i].checked = false
         
        }
      }
    }
  }
  
 

    return (
      <>
        <div className="displaying-products">
          <div className="m-container">
            <ProductHdeading handleChange={handleChange} />
            <DatabaseProducts
              products={currentProducts}
              mainProducts={products}     
              setLocalCheck={setLocalCheck}
              handleDelete={handleDelete}
            />
          </div>
        </div>
        <MyPagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          handlePageChange={handlePageChange}
        />
      </>
    );
};

export default DisplayProducts;
