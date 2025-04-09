import React from 'react';
import "../styles/Home.css";
import { Link } from "react-router-dom"
import burger1 from "../assets/burg.jpg"
import burger2 from "../assets/burg1.jpg"
import burger3 from "../assets/frie7.webp"
import icecream from "../assets/ice.webp"
import icecream1 from "../assets/ice1.webp"
import icecream2 from "../assets/ice2.webp"
import frite from "../assets/frie3.webp"
import frite1 from "../assets/frie6.jpeg"
import frite2 from "../assets/frie5.jpeg"
import sandwich from "../assets/sand3.jpg"
import sandwich1 from "../assets/sand1.jpg"
import sandwich2 from "../assets/sand2.jpg"
import payment from "../assets/paid.png"
import pick from "../assets/pick1.png"
import address from "../assets/addres.png"
import de from "../assets/de.png"
import portrait2 from "../assets/che.jpg"
import portrait3 from "../assets/che1.jpg"
import portrait14 from "../assets/che2.jpg"
import portrait10 from "../assets/che2.jpg"
import portrait13 from "../assets/che2.jpg"
import portrait4 from "../assets/che2.jpg"


import surprise from "../assets/suprise1.jpg"
import { servicesBox } from '../BoxServices/servicesBox';
import { useState } from 'react';

const Home = () => {

  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeDetails = () => {
    setSelectedService(null);
  };



  return (
    <div className='home'>
      <article>
        <div className="container">
          <div className="article-text">
            <h2 className="article-title display-3 mb-3 text-warning">Drindsud Suprise Event </h2>
            <p className='fs-4'>Drindsud Surprise Event est une entreprise événementielle spécialisée dans la création de moments inoubliables. Nous vous accompagnons avec passion dans l’organisation de vos événements et surprises, en vous proposant une gamme de services sur mesure pour faire de chaque instant un souvenir unique. Que ce soit pour un anniversaire, une demande en mariage, une baby shower ou toute autre célébration, Drindsud Surprise Event transforme vos idées en réalité avec créativité, élégance et émotion..</p>
            <Link to="/Menu" className='btn btn-danger btn-lg mt-3'>En savoir plus</Link>
          </div>
        </div>
      </article>


      <div className="aside-content">
        <div className="aside-wrapper">
          <aside>
            <h2 className="aside-title display-4">Nos Services</h2>
            <p className='text-dangerous'>  Transformez vos moments en souvenirs inoubliables</p>
            <p className="aside-text">  Drindsud Surprise Event vous accompagne pour rendre chaque surprise magique et mémorable.</p>
          </aside>
        </div>
        <div className="container">

          <div className={`container ${selectedService ? 'dimmed' : ''}`}>
            <div className="aside-images">
              {servicesBox.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className="clickable-container"
                >
                  <div className="aside-box">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="image-aside"
                    />
                    <div className="aside-description">
                      <h4 className="mt-4">{service.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedService && (
              <div className="details-overlay">
                <div className="overlay-backdrop" onClick={closeDetails}></div>
                <div className="details-content">
                  {/* <button
                    className="close-button"
                    onClick={closeDetails}
                    aria-label="Fermer"
                  >
                    ×
                  </button> */}
                  <h2>{selectedService.title}</h2>
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="detail-image"
                  />
                  <p>{selectedService.description}</p>
                  <button
                    className="cta-button"
                    onClick={closeDetails}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <div className='home-about'>
        <div className='container'>
            <h1>À Propos De Nous</h1>
            <h3>💎 Nos valeurs</h3>
            <p className=''>Chez Drindsud Surprise Event, nous croyons que chaque moment de vie mérite d’être célébré de manière unique et inoubliable.Née d’une passion pour l’art de surprendre et de créer l’émotion, notre agence événementielle accompagne particuliers et professionnels dans la conception et la réalisation de moments magiques.</p>
            <p className=''>Notre objectif est simple : transformer vos idées en souvenirs inoubliables. Qu’il s’agisse d’un anniversaire, d’une demande en mariage, d’une baby shower, d’un événement d’entreprise ou d’une surprise personnalisée, nous mettons tout en œuvre pour que votre événement soit exceptionnel, du premier échange jusqu’au grand jour.</p>
            <Link to="/about" className='btn btn-primary btn-lg mt-3'>En savoir plus</Link>
        </div>
      </div>
      <div className="staff-wrapper">
        <div className="container">
          <h2 className="display-4">Notre<span className='text-danger'> Equipe</span></h2>
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
                <p>Cook</p>
              </div>
            </div>
            <div className="staff-post">
              <img src={portrait13} alt="" className='portrait' />
              <div className="staff-text">
                <h4>Samantha Joyce</h4>
                <p>Cook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="testimony-section">
        <h2 className="title-testi">Temoignages <span className='text-warning'> - Clients</span></h2>
        <div className="testimony-wrapper">
          <div className="testimony-container">
            <div className="testi">
              <span><svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="orange"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.9 0-2.99-1.52-2.99-4.25 0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.89 0-2.98-1.52-2.98-4.25 0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z" /></svg></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quibusdam quod sequi consequatur culpa odio?</p>
              <div className="mb-4">
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>

              </div>
              <img src={portrait2} alt="" className='testiImage' />
              <h5 className='mt-4'>Lewis Kroos</h5>
            </div>
            <div className="testi">
              <span><svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="orange"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.9 0-2.99-1.52-2.99-4.25 0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.89 0-2.98-1.52-2.98-4.25 0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z" /></svg></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quibusdam quod sequi consequatur culpa odio?</p>
              <div className="mb-4">
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
              </div>
              <img src={portrait3} alt="" className='testiImage' />
              <h5 className='mt-4'>Lea Parker</h5>
            </div>
            <div className="testi">
              <span><svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="orange"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.9 0-2.99-1.52-2.99-4.25 0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.89 0-2.98-1.52-2.98-4.25 0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z" /></svg></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quibusdam quod sequi consequatur culpa odio?</p>
              <div className="mb-4">

                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
                <span>
                  <svg fill="orange" width="20px" height="20px" viewBox="0 -19 550 550" xmlns="http://www.w3.org/2000/svg" ><title>star</title><path d="M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z" /></svg>
                </span>
              </div>
              <img src={portrait4} alt="" className='testiImage' />
              <h5 className='mt-4'>Cloe Kimi</h5>
            </div>
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

export default Home

