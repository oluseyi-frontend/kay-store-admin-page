import React, { Component } from "react";
import { useState } from "react";
import { useContext } from "react";
import { adminContext } from "./../context";
import { Link } from "react-router-dom";

const ProductDetail = ({
  item,
  products,
  localCheck,
  handleDelete,
  setLocalCheck,
  checkBox,
  mainProducts,
}) => {
  const { setDeletedProducts, deletedProducts } = useContext(adminContext);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDeletedProducts([...deletedProducts, value]);
    } else {
      let deleted = [];
      deleted = [...deletedProducts];
      const index = deletedProducts.indexOf(value);
      deleted.splice(index, 1);
      setDeletedProducts(deleted);
    }

    const parent = document.getElementsByClassName("parent");
    const children = document.getElementsByClassName("children");
    for (var i = 0; i < children.length; i++) {
      if (children[i].checked == false) {
        parent.all.checked = false;
      }
    }
  };

  return (
    <div className="row">
      <div className="col-1">
        <input
          type="checkbox"
          onChange={handleChange}
          value={item.id}
          className="children"
        />
      </div>
      <div className="col-1">
        <p>{mainProducts.indexOf(item) + 1}</p>
      </div>
      <div className="col-4">
        <p>{item.title}</p>
      </div>
      <div className="col-2">
        <p>{item.company}</p>
      </div>
      <div className="col-4">
        <Link to={`/products/edit/${item.id}`}>
          <button  className="btn btn-success mr-3">Edit</button>
        </Link>

        <button
          className="btn btn-danger"
          onClick={() => {
            handleDelete(item.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
