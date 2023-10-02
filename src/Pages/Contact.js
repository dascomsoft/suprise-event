import React from 'react';
import "../styles/Contact.css"

const Contact = () => {
  return (
    <div className='contact'>
      <h2 className='contactUs'>Contact Us</h2>
       <div className="contact-wrapper">
        <form>
          <label htmlFor="name">Name</label>
          <input type="text"  id="name" placeholder='Enter your name' required/>
          <label htmlFor="surname">Surname</label>
          <input type="text"  id="surname" placeholder='Enter your surname' required/>
          <label htmlFor="email">Email</label>
          <input type="email"  id="email" placeholder='Enter your email' required/>
          <label htmlFor="phone">Phone Number</label>
          <input type="phone" id="phone" placeholder='Enter your phone number' required/>
          <textarea name="" id="" cols="30" rows="10" class="textarea" placeholder="Type your message here..."></textarea>
          <input type="submit" value="Submit" id="submit"/>
        </form>
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

export default Contact
