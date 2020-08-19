import React, { Component } from "react";
import { useState } from "react";
import firebase, { db } from './../firebase';
import { Spinner } from "react-bootstrap";

const AddUsers = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState('')
    const handleChange = (event) => {
        const { name, value } = event.target
        
        if (name === 'firstName') {
            setFirstName(value)
        }
         if (name === "lastName") {
           setLastName(value);
        }
         if (name === "email") {
           setEmail(value);
        }
         if (name === "password") {
           setPassword(value);
        }
         if (name === "role") {
             setRole(value);
      }
      if (name === "phoneNumber") {
        setPhoneNumber(value);
      }
        console.log(value)
    }
  const handleSubmit = (event) => {
      setSpinner(true)
      event.preventDefault()
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          
          db.collection("users")
            .doc(data.user.uid)
            .set({
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNumber: phoneNumber,
              role: role,
              status: 'valid'
            })
            .then(() => {
              setMessage('user created successfully')
              setSpinner(false)
            })
            
            .catch(() => {
              var currentUser = firebase.auth().currentUser;
              setMessage('creation unsuccessful, please try again')
              setSpinner(false)
              currentUser.delete().then(() => {});
            });
        }).catch(() => {
          setMessage('creation unsuccessful, please try again')
          setSpinner(false)
        })
}

  return (
    <div className="add-users-component">
      <div className="add-users-container">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-title">
            <h4>Add new User</h4>
            <p>Create a new user to take part on your ecommerce platform</p>
          </div>
          <input type="text" placeholder="First Name" name='firstName'  onChange={handleChange}  value={firstName} />
          <input type="text" placeholder="Last Name" name='lastName'  onChange={handleChange} value={lastName}/>
          <input type="email" placeholder="Email" name='email' onChange={handleChange} value={email} />
          <input type="tel" placeholder="phone Number" name='phoneNumber' onChange={handleChange} value={phoneNumber} />
          <input type="password" placeholder="Password" name='password' onChange={handleChange}  value={password} />
          <label htmlFor="">
            Role
            <select name="role" id="" onChange={handleChange} >
              <option value="user">set as User</option>
              <option value="admin">set as Administrator</option>
            </select>
          </label>
          <p style={{color: 'red'}}>{message}</p>
          <button className='btn btn-md btn-info'>{spinner ? <Spinner
            as="span"
            animation="border"
            variant='light'
            size="sm"
            role="status"
            aria-hidden="true"
          /> : 'CREATE'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
