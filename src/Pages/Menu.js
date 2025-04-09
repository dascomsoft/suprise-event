import React, { useState } from 'react';
import { FoodList } from "../Components/FoodList";
import "../styles/Menu.css"
import { useContext } from 'react';
import { FoodBoxtContext } from '../Helpers/FoodBoxtContext';
import { Link } from "react-router-dom"



const Menu = () => {

  const { add } = useContext(FoodBoxtContext)

  const [data, setData] = useState(FoodList)

  const filterItem = (item) => {

    setData(FoodList.filter((data) => data.category === item))
  }

  const [detail, setDetail] = useState([])

  const pageDetail = (product) => {
    setDetail([{ ...product }])
    setClose(true)
  }

  const [close, setClose] = useState(false)


  return (

    <div className='menu'>

      <h2 className="menu-header-title">Nos Differents Packages</h2>
      <h3 className="menu-title">Categories Package</h3>
      <div className="categories-button">
        <button className="category-button" onClick={() => setData(FoodList)}>all</button>
        <button className="category-button" onClick={() => filterItem('burger')}>burger</button>
        <button className="category-button" onClick={() => filterItem('icecream')} >icecream</button>
        <button className="category-button" onClick={() => filterItem('frite')}  >fries</button>
        <button className="category-button" onClick={() => filterItem('sandwich')}  >sandwich</button>
      </div>
      <div className="menu-container">
        <div className="menu-wrapper">
          {data.map((food) => (
            <section key={food.id}>
              <div className="image-section">
                <img src={food.image} alt="" className='imageSection' />
              </div>
              <div className="sectionText">
                <p><b>{food.name}</b></p>
                <p><b>${food.price}</b></p>
                <button className='btn btn-secondary' onClick={() => pageDetail(food)}>View</button>
              </div>
            </section>
          ))}
        </div>
      </div>

      {close ?

        <div className="details">
          {detail.map((x) => (
            <div className="detail-wrapper" key={x.id}>
              <div className="detail-container">
                <img src={x.image} alt="" className='imageDetail' />
                <div className="moreInfo">
                  <h3>{x.name}</h3>
                  <h4 className="cart-title">Food Composition</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos numquam unde aut quia molestiae voluptate quae dolorum quod optio?</p>
                  <p><b>${x.price}</b></p>
                  <div className="buttonDetail">
                    <Link to="/Cart" onClick={() => add(x)} className='btn btn-secondary'>Order</Link>
                    <button className='btn btn-secondary' onClick={() => setClose(false)}>Close</button>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div> : null}




      <div className='banner'>
        <div className="container">
          <div className="article-text">
            <h4 className="article-title fw-bold mb-3 text-danger">ENJOY GOOD FOOD WITH US</h4>
            <h2 className="article-title display-3 mb-3 text-dark fw-bold">ORDER NOW!!!</h2>
            <p className='fw-bold fs-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus voluptates repudiandae temporibus facilis libero dolore corrupti eligendi aliquid quia consequatur.</p>
            <Link to="/Menu" className='btn btn-danger btn-lg mt-3'>Explore more</Link>
          </div>
        </div>
      </div>




      <footer className="wrapper">
        <div className="container">
          <div className="footer-showcase">
            <div className="foot-a">
              <h3 className='display-5'>USEFUL LINKS</h3>
              <p>Blog posts</p>
              <p>coupons</p>
              <p>Join affiliate</p>
            </div>
            <div className="foot-a">
              <h3 className='display-5'>FOLLOW US</h3>
              <p>Follow us on social media</p>

              <i>
                <svg class="social-icon" fill="orange" width="20px" height="20px" viewBox="-7 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-facebook"><path d='M2.046 3.865v2.748H.032v3.36h2.014v9.986H6.18V9.974h2.775s.26-1.611.386-3.373H6.197V4.303c0-.343.45-.805.896-.805h2.254V0H6.283c-4.34 0-4.237 3.363-4.237 3.865z' /></svg>
              </i>

              <i className='ms-3'>
                <svg class="social-icon" fill="orange" width="20px" height="20px" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-whatsapp"><path d='M9.516.012C4.206.262.017 4.652.033 9.929a9.798 9.798 0 0 0 1.085 4.465L.06 19.495a.387.387 0 0 0 .47.453l5.034-1.184a9.981 9.981 0 0 0 4.284 1.032c5.427.083 9.951-4.195 10.12-9.58C20.15 4.441 15.351-.265 9.516.011zm6.007 15.367a7.784 7.784 0 0 1-5.52 2.27 7.77 7.77 0 0 1-3.474-.808l-.701-.347-3.087.726.65-3.131-.346-.672A7.62 7.62 0 0 1 2.197 9.9c0-2.07.812-4.017 2.286-5.48a7.85 7.85 0 0 1 5.52-2.271c2.086 0 4.046.806 5.52 2.27a7.672 7.672 0 0 1 2.287 5.48c0 2.052-.825 4.03-2.287 5.481z' /><path d='M14.842 12.045l-1.931-.55a.723.723 0 0 0-.713.186l-.472.478a.707.707 0 0 1-.765.16c-.913-.367-2.835-2.063-3.326-2.912a.694.694 0 0 1 .056-.774l.412-.53a.71.71 0 0 0 .089-.726L7.38 5.553a.723.723 0 0 0-1.125-.256c-.539.453-1.179 1.14-1.256 1.903-.137 1.343.443 3.036 2.637 5.07 2.535 2.349 4.566 2.66 5.887 2.341.75-.18 1.35-.903 1.727-1.494a.713.713 0 0 0-.408-1.072z' /></svg>
              </i>


              <i className='ms-3'>
                <svg class="social-icon" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="orange"><path fill="orange" fill-rule="evenodd" d="M13.478 3.399c.6.161 1.072.634 1.234 1.234C15 5.728 15 8 15 8s0 2.272-.288 3.367a1.754 1.754 0 01-1.234 1.234C12.382 12.89 8 12.89 8 12.89s-4.382 0-5.478-.289a1.754 1.754 0 01-1.234-1.234C1 10.283 1 8 1 8s0-2.272.288-3.367c.162-.6.635-1.073 1.234-1.234C3.618 3.11 8 3.11 8 3.11s4.382 0 5.478.289zm-3.24 4.612l-3.645 2.1V5.9l3.644 2.11z" clip-rule="evenodd" /></svg>
              </i>

              <i className='ms-3'>
                <svg fill="orange" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z" /></svg>
              </i>

            </div>
            <div className="foot-b">
              <h3 className='display-5'>GET IN TOUCH</h3>
              <div class="d-flex">
                <p>
                  <svg fill="orange" width="20px" height="20px" viewBox="-3 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group_31" data-name="Group 31" transform="translate(-241.002 -321.05)">
                      <path id="Path_296" data-name="Path 296" d="M267,349.05v-24a4,4,0,0,0-4-4H245a4,4,0,0,0-4,4v24a4,4,0,0,0,4,4h18A4,4,0,0,0,267,349.05Zm-22,0v-24h18v24Z" />
                      <rect id="Rectangle_6" data-name="Rectangle 6" width="10" height="12" transform="translate(249.002 329.05)" />
                      <rect id="Rectangle_7" data-name="Rectangle 7" width="18" height="4" transform="translate(245.002 345.05)" />
                    </g>
                  </svg>
                </p>
                <p class="ms-2">Tel:+1(675)-599-17-74</p>
              </div>


              <div class="d-flex">
                <p>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" ><title>mail</title><path d="M64 128Q64 113 73 105 81 96 96 96L416 96Q431 96 440 105 448 113 448 128L448 144 256 272 64 144 64 128ZM256 328L448 200 448 384Q448 416 416 416L96 416Q64 416 64 384L64 200 256 328Z" /></svg>
                </p>
                <p class="ms-2">Email: dasfood@food.com</p>
              </div>

              <div class="d-flex">
                <p>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 0 24 24" version="UT1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"><path d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0-3.124 3.074-3.124 8.057 0 11.13l5.656 5.565 5.657-5.565c3.124-3.073 3.124-8.056 0-11.13zm-5.657 8.195c-.668 0-1.295-.26-1.768-.732-.975-.975-.975-2.561 0-3.536.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732c.975.975.975 2.562 0 3.536-.472.472-1.1.732-1.768.732z" /></svg>
                </p>
                <p class="ms-2">155 Morgan Street , New-York</p>
              </div>
            </div>
            <div className="foot-a">
              <h3 className='display-5'>FOODS MENU</h3>
              <p>Burger</p>
              <p>Icecream</p>
              <p>Frites</p>
              <p>Sandwich</p>
            </div>

          </div>
        </div>
        <p class="text-center text-warning mt-5">&copy;Copyright all rights reserved, 2023 DASCOM Ltd</p>

      </footer>
    </div>
  )
}

export default Menu

