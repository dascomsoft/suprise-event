import React, { useState } from 'react';
import  {FoodList} from "../Components/FoodList";
import "../styles/Menu.css"
import { useContext } from 'react';
import { FoodBoxtContext } from '../Helpers/FoodBoxtContext';
import {Link} from "react-router-dom"



const Menu = () => {

const{add}= useContext(FoodBoxtContext)

const[data,setData] =useState(FoodList)

const filterItem =(item)=>{
  
  setData(FoodList.filter((data) => data.category ===item))
}

const[detail,setDetail] = useState([])
 
 const pageDetail =(product)=>{
  setDetail([{...product}])
  setClose(true)
 }

 const[close,setClose] = useState(false)


  return (

    <div className='menu'>
      <h2 className="menu-header-title">Enjoy Your Favorite Food</h2>
        <h3 className="menu-title">food categories</h3>
         <div className="categories-button">
      <button className="category-button" onClick={()=>setData(FoodList)}>all</button>
          <button className="category-button"  onClick={() =>filterItem('burger')}>burger</button>
          <button className="category-button" onClick={() =>filterItem('icecream')} >icecream</button>
          <button className="category-button" onClick={() =>filterItem('frite')}  >frite</button>
         <button className="category-button" onClick={() =>filterItem('sandwich')}  >sandwich</button>
      </div>
      <div className="menu-container">
        <div className="menu-wrapper">
           {data.map((food) =>(   
             <section key={food.id}>
                <div className="image-section">
                  <img src={food.image} alt=""  className='imageSection'/>
                </div>
                <div className="sectionText">
                <p><b>{food.name}</b></p>
                <p><b>${food.price}</b></p>
                 <button className='menuBtn' onClick={()=>pageDetail(food)}>View</button>
                 </div>
             </section>
           ))}
        </div>
      </div>

       {close ?

      <div className="details">
       {detail.map((x) =>(
           <div className="detail-wrapper" key={x.id}>
        <div className="detail-container">
            <img src={x.image} alt="" className='imageDetail'/>
             <div className="moreInfo">
               <h3>{x.name}</h3>
               <h4 className="cart-title">Food Composition</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos numquam unde aut quia molestiae voluptate quae dolorum quod optio?</p>
                 <p><b>${x.price}</b></p>
                 <div className="buttonDetail">
                 <Link  to="/Cart"onClick={()=>add(x)} className='btnDetail'>Order Now</Link>
                 <button className='closeBtn' onClick={()=>setClose(false)}>Close</button>
                 </div>
             </div>
        </div>
      </div> 
    
  ))}
 </div>:null}  


      <footer className="wrapper">
          <div className="footer-container">
            <div className="footer-showcase">
            <div className="foot-a">
            <h5>Useful Links</h5>
            <p>Blog posts</p>
            <p>coupons</p>
             <p>Join affiliate</p>
         </div>
         <div className="foot-a">
            <h5>Follow Us</h5>
            <p>Follow us on social media</p>
            <i className='fa fa-facebook'></i>
            <i className='fa fa-whatsapp'></i>
            <i className='fa fa-linkedin'></i>
            <i className='fa fa-youtube'></i>
         </div>
         <div className="foot-b">
            <h5>Get In Touch</h5>
            <i className='fa fa-phone'><span className='span-footer'>Tel: +1(345)895660</span></i>
            <i className='fa fa-envelope'><span className='span-footer'>E-mail:store@gmail.com</span></i>
            <i className='fa fa-address-card-o'><span className='span-footer'>Address:Oliver Street, Cameroon</span></i>
         </div>
         <div className="foot-a">
           <h5>Foods</h5>
            <p>Burger</p>
            <p>Icecream</p>
            <p>Frites</p>
            <p>Sandwich</p>
         </div>
         
                </div>
              </div>
            
           </footer>
    </div>
  )
}

export default Menu

