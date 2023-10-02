import React from 'react'
import { FoodBoxtContext } from '../Helpers/FoodBoxtContext';
import { useContext } from 'react';
import{Link} from "react-router-dom";
import "../styles/Details.css"

const Details = () => {


  const{add,addDetail} = useContext(FoodBoxtContext)

 
  return (
    <div className='details'>
     
      
    </div>
  )
}

export default Details
