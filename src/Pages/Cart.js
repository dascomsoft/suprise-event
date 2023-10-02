import React, { useContext } from 'react';
import { FoodBoxtContext } from '../Helpers/FoodBoxtContext';
import "../styles/Cart.css"
import { Link } from 'react-router-dom';

const Cart = () => {
   const{add,remove,clear,foodBox} =useContext(FoodBoxtContext);
   
   const totalPrice = foodBox.reduce((price,foodItem) => price + foodItem.quantity * foodItem.price,0)
   
 if(foodBox.length===0){
  return <h3 className='center-cart'>Oo'ps No Food in the Food Box!!!</h3>
 }

  return (
    <div className="cartContainer">
    <div className='cart'>
      <div className="cart-wrapper">
        {foodBox.map((foodItem)  =>(
          <div className="cart-container" key={foodItem.id}>
              <img src={foodItem.image} alt=""  className='cartImage'/>
          <div className="grid-cart">
            <div className="cart-description">
              <p><b>{foodItem.name}</b></p>
               <h3 className="cart-title">Food Composition</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos numquam unde aut quia molestiae voluptate quae dolorum quod optio?</p>
                </div>
             <div className="cart-button-display">
              <p><b>Price:${foodItem.price}</b></p>
              <div className="cart-price-display">
              <button className="cart-remove"onClick={()=>remove(foodItem)}>-</button>
                 {foodItem.quantity}
              <button className="cart-add" onClick={() =>add(foodItem)}>+</button>
              </div>
              <div className="cart-button-click">
              <button className="clear-cart"onClick={clear} >Clear Food Box</button>
              <Link to ="/Menu" className='cart-link'>See more</Link>
              </div>
              </div>
            </div>
          </div>
          
        ))}
      </div>
      <p className='total'><b>TOTAL PRICE:${totalPrice}</b></p>
      
    </div>
  </div>
  )
}

export default Cart
