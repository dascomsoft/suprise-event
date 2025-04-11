// import React, { useState } from 'react';
// import {Link} from "react-router-dom"
// import "../styles/Navbar.css"

// const Navbar = () => {




//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleLinkClick = () => {
//     // Fermer le dropdown lorsqu'un lien est cliqué
//     setIsDropdownOpen(false);
//   };



//   return (
//     <div className="header-container">
//       <nav className="navbar navbar-expand-lg navbar-w bg-dark fixed-top box-shadow py-4">
//         <div className="container">
//           <Link className="navbar-brand" to="/"><h1 className='text-white'>DrinSud<span class="text-warning">SupriseEvents</span></h1></Link>
//           <button
//             className="navbar-toggler icon bg-warning"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNavDropdown"
//             aria-controls="navbarNavDropdown"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Inverser l'état du dropdown lors du clic sur le bouton
//           >
//             <span className="navbar-toggler-icon icon-btn"></span>
//           </button>
//           <div
//             className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`}
//             id="navbarNavDropdown"
//           >
//             <ul className="navbar-nav aria-expanded ms-auto">
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold" to="/" onClick={handleLinkClick}>Acceuil</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold fw-bold" to="/about" onClick={handleLinkClick}>A propos</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold" to="/menu" onClick={handleLinkClick}>Nos packages</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold" to="/contact" onClick={handleLinkClick}>Contact</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold" to="/reservation" onClick={handleLinkClick}>Reservation</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold" to="/connection" onClick={handleLinkClick}>Se connecter</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold" to="/administrateur" onClick={handleLinkClick}>Tableau Admin</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-warning fw-bold" to="/client" onClick={handleLinkClick}>Tableau Client</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;












import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { auth, db } from '../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const clientDoc = await getDoc(doc(db, 'clients', user.uid));
        const adminDoc = await getDoc(doc(db, 'administrateurs', user.uid));

        if (clientDoc.exists()) {
          setRole('client');
        } else if (adminDoc.exists()) {
          setRole('admin');
        } else {
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <div className="header-container">
      <nav className="navbar navbar-expand-lg navbar-w bg-dark fixed-top box-shadow py-4">
        <div className="container">
          <Link className="navbar-brand" to="/"><h1 className='text-white'>DrinSud<span className="text-warning">SupriseEvents</span></h1></Link>
          <button
            className="navbar-toggler icon bg-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="navbar-toggler-icon icon-btn"></span>
          </button>
          <div className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`} id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/" onClick={handleLinkClick}>Accueil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/about" onClick={handleLinkClick}>À propos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/menu" onClick={handleLinkClick}>Nos packages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/reservation" onClick={handleLinkClick}>Réservation</Link>
              </li>

              {user ? (
                <>
                  {role === 'client' && (
                    <li className="nav-item">
                      <Link className="nav-link text-warning fw-bold" to="/client" onClick={handleLinkClick}>Tableau Client</Link>
                    </li>
                  )}
                  {role === 'admin' && (
                    <li className="nav-item">
                      <Link className="nav-link text-warning fw-bold" to="/administrateur" onClick={handleLinkClick}>Tableau Admin</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link text-danger fw-bold" to="/" onClick={() => { handleSignOut(); handleLinkClick(); }}>
                      Déconnexion
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-warning fw-bold" to="/connection" onClick={handleLinkClick}>Se connecter</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

