import React, { Component, useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import firebase, { storage } from "./../firebase";

const ImageModal = ({ toSetModal, setImageUrl, imageUrl }) => {
  const [image, setImage] = useState();
  const [message, setMessage] = useState()

  const handleImageUrl = (event) => {
    const folder = event.target.files[0];
    const path = event.target.value;
    const filename = path.replace(/^.*\\/, "");
    setImage(folder);
    sendToStorage(folder);
  };
  const sendToStorage = (folder) => {
   
    var storageRef = firebase.storage().ref(`phone-store/${folder.name}`);
    var task = storageRef.put(folder);
    task.then((data) => {
      const storageReference = firebase
        .storage()
        .ref(`phone-store/${folder.name}`);
      storageReference
        .getDownloadURL()
        .then(function (url) {
         setMessage('successful! proceed')
            setImageUrl(url);
             toSetModal(false);
        })
        .catch(function (error) {
          // Handle any errors
          setMessage('not successful! retry')
        
        });
    });
  };
  const handleModalClose = () => {
    toSetModal(false);
  };

  return (
    <div className="my-modal">
      <div className="my-modal-container">
        <div className="my-modal-inner-container">
          <div className="my-modal-headings">
            <h4>Upload Image</h4>
            <div className="my-modal-close">
              <button onClick={handleModalClose}>
                <FaWindowClose />
              </button>
            </div>
          </div>
          <div className="my-modal-body">
            <p style={{color: 'red'}} >{message}</p>
            <input type="file" onChange={handleImageUrl} name="image" id="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
