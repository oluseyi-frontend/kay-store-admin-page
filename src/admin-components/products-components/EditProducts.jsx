import React, { Component, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import ImageModal from './ImageModal';
import firebase, { db } from './../firebase';
import { useEffect} from 'react';
import { useContext } from 'react';
import { adminContext } from './../context';
import { Spinner } from 'react-bootstrap';



const EditProducts = ({ match }) => {
   
    const [myModal, setMyModal] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [message, setMessage] = useState('')
    const {title, setTitle, price, setPrice, company, setCompany, info, setInfo, imageUrl, setImageUrl} = useContext(adminContext)
    const handleChange = (event) => {
        const { name, value } = event.target
      
        if (name === 'title') {
            setTitle(value)
        }
        if (name === "price") {
            setPrice(value);
        }
        if (name === "company") {
            setCompany(value);
        }
        if (name === "info") {
            setInfo(value);
        }
    }

    useEffect(() => {
        retrieveProductFromDatabase()
      
    }, [])
    const retrieveProductFromDatabase = () => {   
        const productRef = firebase.database().ref("store-products/" + match.params.id);
      
        productRef.once ("value", (snapshot) => {
            const databaseProduct = snapshot.val();  
           
                setTitle(databaseProduct.title)
                setPrice(databaseProduct.price)
                setCompany(databaseProduct.company)
                setInfo(databaseProduct.info)
                setImageUrl(databaseProduct.img)
            
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.length == 0 || price.length == 0 || company.length == 0 || info.length == 0 || imageUrl.length == 0) {
           setMessage('fill up all fields')
        } else {
            setSpinner(true)
            firebase
                .database()
                .ref("store-products/" + match.params.id)
                .set({
                    title: title,
                    img: imageUrl,
                    price: price,
                    company: company,
                    info: info,
                    incart: false,
                    count: 0,
                    total: 0
                }).then(() => {
                    setMessage('edited successfully')
                    setSpinner(false)
                }).catch(() => {
                    setMessage('error in editing, please try again')
                    setSpinner(false)
                })
        }
       
    }

    const handleImageModal = () => {
        setMyModal(true)
    }
    return (

        <div className="add-products">
            {myModal ? <ImageModal imageUrl={imageUrl} setImageUrl={setImageUrl} toSetModal={setMyModal} /> : null}
            <div className="add-products-container">
                <div className="add-products-title">
                    <h2>Add New Products</h2>
                </div>
                <button onClick={handleImageModal}>
                    <FaPlus /> add image
          </button>
                <form onSubmit={handleSubmit}>
                    <h5>fill in all fields</h5>
                    <input
                        type="text"
                        name="title"
                        placeholder="product name"
                        value={title}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="amount"
                        value={price}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="company"
                        value={company}
                        onChange={handleChange}
                    />
                    <textarea
                        name="info"
                        placeholder="product info"
                        value={info}
                        onChange={handleChange}
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                    <p style={{color:'red'}}>{message}</p>
                    <button>{spinner ? <Spinner
                        as="span"
                        animation="border"
                        variant='light'
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : 'EDIT'}</button>
                </form>
                <div className="add-image"></div>
            </div>
        </div>
    );
}

export default EditProducts;