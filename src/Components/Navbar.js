import React, { useContext, useState } from 'react';
import {Link} from "react-router-dom"
import "../styles/Navbar.css"
import { FoodBoxtContext } from '../Helpers/FoodBoxtContext';

const Navbar = () => {

  const{foodBox} =useContext(FoodBoxtContext)



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    // Fermer le dropdown lorsqu'un lien est cliqué
    setIsDropdownOpen(false);
  };



  return (
    <div className="header-container">
      <nav className="navbar navbar-expand-lg navbar-w bg-dark fixed-top box-shadow py-4">
        <div className="container">
          <Link className="navbar-brand" to="/"><h1 className='text-white'>DrinSud<span class="text-warning">SupriseEvents</span></h1></Link>
          <button
            className="navbar-toggler icon bg-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Inverser l'état du dropdown lors du clic sur le bouton
          >
            <span className="navbar-toggler-icon icon-btn"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`}
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav aria-expanded ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/" onClick={handleLinkClick}>Acceuil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold fw-bold" to="/about" onClick={handleLinkClick}>A propos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/menu" onClick={handleLinkClick}>Nos packages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/contact" onClick={handleLinkClick}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/cart" onClick={handleLinkClick}>CART({foodBox.length})</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
