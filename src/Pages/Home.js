import React from 'react';
import "../styles/Home.css";
import {Link} from "react-router-dom"
import burger from "../assets/burger.jpg"
import burger1 from "../assets/burger1.jpg"
import burger2 from "../assets/burger2.jpg"
import burger3 from "../assets/burger3.jpg"
import burger12 from "../assets/burger12.jpg"
import burger5 from "../assets/burger5.jpg"
import icecream from "../assets/icecream.jpg"
import icecream1 from "../assets/icecream1.jpg"
import icecream6 from "../assets/icecream6.jpg"
import icecream7 from "../assets/icecream7.jpg"
import icecream8 from "../assets/icecream8.jpg"
import icecream5 from "../assets/icecream5.jpg"
import frite from "../assets/frite.jpg"
import frite1 from "../assets/frite1.jpg"
import frite2 from "../assets/frite2.jpg"
import frite3 from "../assets/frite3.jpg"
import frite4 from "../assets/frite4.jpg"
import frite5 from "../assets/frite5.jpg"
import sandwich from "../assets/sandwich.jpg"
import sandwich1 from "../assets/sandwich1.jpg"
import sandwich2 from "../assets/sandwich2.jpg"
import sandwich3 from "../assets/sandwich3.jpg"
import sandwich4 from "../assets/sandwich4.jpg"
import sandwich5 from "../assets/sandwich5.jpg"
import burger16 from "../assets/burger16.jpg"
import payment from "../assets/paid.png"
import pick from "../assets/pick1.png"
import address from "../assets/addres.png"
import receive from "../assets/receive.jpg"
import bike from "../assets/bike.jpg"
import portrait14 from "../assets/portrait14.jpg"
import portrait10 from "../assets/portrait10.jpg"
import portrait13 from "../assets/portrait13.jpg"


const Home = () => {
  return (
    <div className='home'>
     <article>
      <div className="article-wrapper">
      <div className="article-container">
       <img src={burger16} alt="" className='burger16' />
       <div className="article-text">
        <h2 className="article-title">Order Your Food Here and <br/>Enjoy Your day</h2>
        <p>Lorem ipsum dolor sit ame t consectetur adipisicing elit. Perspiciatis ad exercitationem esse excepturi velit aspernatur voluptate quos consectetur! Repellat, voluptatum. </p>
         <Link  to="/Menu" className='articleBtn'>Explore more</Link>
       </div>
      </div>
      </div>
       </article>
       <div className="aside-wrapper">
       <aside>
        <h2 className="aside-title">How It Works</h2>
        <p className="aside-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dolores perspiciatis aliquid minima ipsam. Nihil eos ipsam, perferendis blanditiis similique quos vitae totam modi cumque?</p>
        </aside>
        </div>
        <div className="aside-container">
        <div className="aside-images">
          <div className="aside-box">
            <img src={pick} alt=""  className='image-aside'/>
              <div className="aside-description">
                 <h4>pick item</h4>
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              </div>
             </div>
              <div className="aside-box">
               <img src={payment} alt=""  className='image-aside'/>
               <div className="aside-description">
                 <h4>Payment</h4>
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              </div>
                 </div>
                  <div className="aside-box">
                   <img src={address} alt=""  className='image-aside'/>
                   <div className="aside-description">
                 <h4>Address</h4>
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              </div>
                   </div>
                    <div className="aside-box">
                     <img src={bike} alt=""  className='image-aside'/>
                     <div className="aside-description">
                 <h4>Delivery</h4>
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              </div>
                      </div>
                       <div className="aside-box">
                      <img src={receive} alt=""  className='image-aside'/>
                      <div className="aside-description">
                 <h4>Received</h4>
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              </div>
                </div>
           </div>
           </div>
  
        <div className="home-container">
         <h2 className="home-title">Food Menu</h2>
          <div className="underline"></div>
         <div className="food-menu">
          <p className="burger-section"><b>burger section</b></p>
           <div className="food-menu1">
            <div className="burger-package">
              <img src={burger} alt="burger"  className='burger'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Italiano Burger</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$10.00</b></p>
                   </div>
             </div>
             <div className="burger-package">
              <img src={burger1} alt="burger"  className='burger'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">French Burger</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$15.5</b></p>
                  
                   </div>
             </div>
             <div className="burger-package">
              <img src={burger2} alt="burger"  className='burger'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Burgatti Burger</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$25.00</b></p>
                   </div>
             </div>
             <div className="burger-package">
              <img src={burger12} alt="burger"  className='burger'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Burgatti Burger</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$25.00</b></p>
                   </div>
             </div>
             <div className="burger-package">
              <img src={burger5} alt="burger"  className='burger'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Burgatti Burger</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$25.00</b></p>
                   </div>
             </div>
             <div className="burger-package">
              <img src={burger3} alt="burger"  className='burger'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Cheese Burger</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$17.00</b></p>
                   </div>
             </div>
            </div>
            <p className="icecream-section"><b>icecream section</b></p>
            <div className="food-menu2">
             <div className="icecream-package">
              <img src={icecream} alt="ice"  className='icecream'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Honey Icrecream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$22.00</b></p>
                   </div>
             </div>
            
             <div className="icecream-package">
              <img src={icecream1} alt="ice"  className='icecream'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Juicey Icreacream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$15.00</b></p>
                   </div>
             </div>
             <div className="icecream-package">
              <img src={icecream6} alt="ice"  className='icecream'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Juicey Icreacream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$19.00</b></p>
                   
                   </div>
             </div>
             <div className="icecream-package">
              <img src={icecream8} alt="ice"  className='icecream'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Juicey Icreacream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$15.50</b></p>
                   </div>
             </div>
             <div className="icecream-package">
              <img src={icecream5} alt="ice"  className='icecream'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Juicey Icreacream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$16.50</b></p>
                   </div>
             </div>
             <div className="icecream-package">
              <img src={icecream7} alt="ice"  className='icecream'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Juicey Icreacream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$14.50</b></p>
                   </div>
             </div>
           </div>
           <p className="frite-section"><b>frites section</b></p>
            <div className="food-menu3">
             <div className="frite-package">
              <img src={frite} alt="ice"  className='frite'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Honey Icrecream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$35.50</b></p>
                   </div>
             </div>
             <div className="frite-package">
              <img src={frite1} alt="ice"  className='frite'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Honey Icrecream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$38.00</b></p>
                   
                   </div>
             </div>
             <div className="frite-package">
              <img src={frite2} alt="ice"  className='frite'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Honey Icrecream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$80.00</b></p>
                   
                   </div>
             </div>
             <div className="frite-package">
              <img src={frite3} alt="ice"  className='frite'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Honey Icrecream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$15.00</b></p>
                   </div>
             </div>
             <div className="frite-package">
              <img src={frite4} alt="ice"  className='frite'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Honey Icrecream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$28.00</b></p>
                   </div>
             </div>
             <div className="frite-package">
              <img src={frite5} alt="ice"  className='frite'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Honey Icrecream</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$12.00</b></p>
                   </div>
             </div>
             </div>
           <p className="sandwich-section"><b>sandwich section</b></p>
           <div className="food-menu4">
           <div className="sandwich-package">
              <img src={sandwich} alt="sandwich"  className='sandwich'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Bisco Sandwich</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$42.00</b></p>
                   </div>
             </div>
           
           <div className="sandwich-package">
              <img src={sandwich1} alt="sandwich"  className='sandwich'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Spycies Sandwich</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$53.00</b></p>
                   </div>
             </div>
             <div className="sandwich-package">
              <img src={sandwich4} alt="sandwich"  className='sandwich'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Spycies Sandwich</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$49.00</b></p>
                   </div>
             </div>
             <div className="sandwich-package">
              <img src={sandwich5} alt="sandwich"  className='sandwich'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Spycies Sandwich</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$65.00</b></p>
                   </div>
             </div>
             <div className="sandwich-package">
              <img src={sandwich2} alt="sandwich"  className='sandwich'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Spycies Sandwich</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$33.00</b></p>
                   </div>
             </div>
             <div className="sandwich-package">
              <img src={sandwich3} alt="sandwich"  className='sandwich'/>
               <div className="ratings">
                  <i className="fa fa-star"></i>
                   <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                     <i className="fa fa-star-half-o"></i>
                       </div>
                        <div className="food-description">
                         <h4 className="food-name">Spycies Sandwich</h4>
                          <p className="food-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                     <p className="food-price"><b>$41.00</b></p>
                   </div>
             </div>
           </div>
           </div>
         </div> 
         <div className="staff-wrapper">
         <div className="staff-menber">
            <h2 className="staff-title">Our <span className='span-staff'>Staff</span></h2>
            <div className="staff-container">
            <div className="staff-post">
              <img src={portrait14} alt="" className='portrait' />
              <div className="staff-text">
                <h4>Jacob Jones</h4>
                <p>Control Manager</p>
              </div>
              </div>
              <div className="staff-post">
              <img src={portrait10} alt="" className='portrait' />
              <div className="staff-text">
                <h4>Rogers MarcMiller</h4>
                <p>Cashier Manager</p>
              </div>
              </div>
              <div className="staff-post">
              <img src={portrait13} alt="" className='portrait' />
              <div className="staff-text">
                <h4>Samantha Joyce</h4>
                <p>Waiter Manager</p>
              </div>
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

export default Home

