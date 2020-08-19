import React, { Component, useEffect, useState } from 'react';
import Aside from "./Aside/aside";
import MainAside from './Aside/aside';
import { FiLogOut } from "react-icons/fi";
import SmallScreenAside from './Aside/SmallScreenAside';
import { useHistory } from "react-router-dom";
import { auth } from './firebase';
import { useContext } from 'react';
import { adminContext } from './context';


const Header = () => { 
  const {history} = useHistory()
    const [decider, setDecider] = useState(false)
  const [mainDecider, setMainDecider] = useState(false)
  const{user, setUser, handleLogOut} = useContext(adminContext)
   useEffect(() => {
       handleAsideWithEfect();
      
   }, []);

   const handleAsideWithEfect = () => {
       if (window.innerWidth < 768) {
         setMainDecider(true)
         setDecider(true);
            window.addEventListener("click", (event) => {
              const element = event.target;
              if (element.tagName == "ASIDE") {              
                setDecider(true);
              }
            });
         
     } else {
           setDecider(true);
            setMainDecider(false);
     }
     window.addEventListener("resize", () => {
       if (window.innerWidth < 768) {
           setDecider(true);
            setMainDecider(true);
              window.addEventListener("click", (event) => {
                const element = event.target;
               
                if (element.tagName == "ASIDE") {
               
                  setDecider(true);
                }
              });
       } else {
           setDecider(true);
            setMainDecider(false);
              window.addEventListener("click", (event) => {
                const element = event.target;
               
                if (element.tagName == "ASIDE") {
                 
                  setDecider(false);
                }
              });
       }
     });
    };
    
      const handleAside = () => {
        setDecider(false);
  };
  


  return (
      <header>     
        <div className="my-container">
          <div onClick={handleAside} className='opening-burger'> <span className='top-line'></span> <span className='middle-line'></span> <span className='bottom-line'></span></div>
          <div className="brand-logo">
            <h5 className="brand-title-active">KAY STORE ADMIN DASHBOARD</h5>
          </div>
          <div className="logout-btn">
            <button className='btn btn-sm btn-danger' onClick={handleLogOut}><FiLogOut/></button>
          </div>
        </div>
            {mainDecider?<aside className={decider ? "aside-active" : null}>
                <SmallScreenAside/>
            </aside> :
           <MainAside/>
            }
      </header>
    );
}
 
export default Header;