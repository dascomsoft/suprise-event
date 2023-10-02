import React, { useContext, useEffect, useState } from 'react';
import {Link,useLocation} from "react-router-dom"
import "../styles/Navbar.css"
import cartIcon from "../assets/cart-icon.png"
import { FoodBoxtContext } from '../Helpers/FoodBoxtContext';
const Navbar = () => {

  const{foodBox} =useContext(FoodBoxtContext)
  const[link,setLink] = useState(false)

  const update =()=>{
    setLink(!link)
  }

   const location =useLocation()

   useEffect(()=>{
    setLink(false)
   }, [location])




  return (
   <div className="nav-container">
    <div className='nav'>
      <div className="nav-header">
       <div className="nav-logo">
          <h2 className="nav-title"><span className='spa-logo'>das</span>fast<span className='span-logo'>food</span></h2>
      </div>

        <div className="nav-links" id={link ? "hidden" : ""}>
           <Link to="/">home</Link>
           <Link to="/About">about</Link>
           <Link to="/Menu">Menu</Link>
           <Link to="/Contact">contact</Link>
           <Link to="/Cart"><img src={cartIcon} alt=""  className='cartIcon'/>({foodBox.length})</Link>
    </div>
    <div className="open-button" onClick={update}><i class="fa fa-bars"></i></div>

  </div>
</div>
</div>
  )
}

export default Navbar
