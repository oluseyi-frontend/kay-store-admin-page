import React, { Component } from "react";
import { useState } from "react";
import { useContext } from "react";
import { adminContext } from './../context';
import firebase from './../firebase';
import { firestore } from "firebase";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const FormField = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const{user, setUser} = useContext(adminContext)
    const [message, setMessage] = useState('')
    const [spinner, setSpinner] = useState(false)
    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
    }

    useEffect(() => {
      
    })

    const handleSubmit = (event) => {
       setSpinner(true)
        event.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
            const userId = data.user.uid
            const events = firebase.firestore().collection("users").doc(userId)
            events.get().then((doc) => {
                if (doc.exists) {
                
                    if (doc.data().role === 'admin') {
                        setUser(data.user)
                    } else if (doc.data().role === 'user') {
                        setSpinner(false)
                        setMessage('you are not permitted to view this page')
                    } else {
                        setSpinner(false)
                        setMessage('you are not permitted to view this page')
                    }
                } else {
                    setSpinner(false)
               }
            }).catch((error) => {
                setMessage('please try again')
                setSpinner(false)
               
            })
        }).catch((error) => {
            setSpinner(false)
            setMessage(error.message)
           
        })
    }
    
  return (
    <>
      <div className="form-heading">
        <h4  className='text-center'>Admin Login</h4>
        <h6 className='text-center'>Login to your dashboard area to manage your website</h6>
      </div>
          <form action="" onSubmit={handleSubmit}>
              <p className='text-center'>{message}</p>
        <input type="text" name="email" value={email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="password" value={password} onChange={handleChange} placeholder="Password" />
              <button>{spinner ? <Spinner
                  as="span"
                  animation="border"
                  variant='light'
                  size="sm"
                  role="status"
                  aria-hidden="true"
              /> : 'LOG IN'}</button>
      </form>
    </>
  );
};

export default FormField;
