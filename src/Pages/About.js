import React from 'react';
import {Link} from "react-router-dom"
import portrait2 from "../assets/portrait2.jpg"
import portrait3 from "../assets/portrait3.jpg"
import portrait4 from "../assets/portrait4.jpg"
import "../styles/About.css"

const About = () => {
  
  return (
    <div className="about-main">
    <div className='about'>
      <div className="about-wrapper">
        <div className="about-container">
          <img src={portrait3} alt=""  className='portraitAbout'/>
          <div className="about-text">
            <h2 className="about-title"><span className="span-t">Enjoy</span> The Best <span className="span-title">Fast-Food</span> In The Region</h2>
             <p>Lorem ipsum dolor, sit ametion consectetur adipisicing elit. Nam quae nemo obcaecati unde iure maiores molestiae aut officia ullam laudantium blanditiis et dolorem voluptates architecto doloribus deserunt, accusantium id hic excepturi earum dolorum adipisci optio saepe? Unde accusantium quasi ipsa.</p>
             <Link to ="/Menu" className="about-link">Learn more</Link>
          </div>
        </div>
      </div>
    </div>
    <div className="testimony-section">
      <h2 className="title-testi">Clients Testimonies</h2>
      <div className="testimony-wrapper">
        <div className="testimony-container">
          <div className="testi">
          <i class="fa fa-quote-left"></i>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quibusdam quod sequi consequatur culpa odio?</p>
          <div className="ratingStyle">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
         </div>
         <img src={portrait2} alt=""  className='testiImage'/>
         <h5>Lewis Kroos</h5>
        </div>
        <div className="testi">
          <i class="fa fa-quote-left"></i>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quibusdam quod sequi consequatur culpa odio?</p>
          <div className="ratingStyle">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
         </div>
         <img src={portrait3} alt=""  className='testiImage'/>
         <h5>Lea Parker</h5>
        </div>
        <div className="testi">
          <i class="fa fa-quote-left"></i>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quibusdam quod sequi consequatur culpa odio?</p>
          <div className="ratingStyle">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
         </div>
         <img src={portrait4} alt=""  className='testiImage'/>
         <h5>Cloe Kimi</h5>
        </div>
        </div>
      </div>
     
    </div>
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

export default About
