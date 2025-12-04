import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import logo from '../assets/logo.jpg';
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const clientDoc = await getDoc(doc(db, 'clients', user.uid));
        const adminDoc = await getDoc(doc(db, 'administrateurs', user.uid));
        if (clientDoc.exists()) setRole('client');
        else if (adminDoc.exists()) setRole('admin');
        else setRole(null);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  // Fermer le menu quand on clique sur un lien
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Variants d'animation
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    scrolled: {
      background: "rgba(10, 10, 10, 0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(196, 160, 110, 0.2)"
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: 30 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Liens de navigation
  const navLinks = [
    { path: "/", label: "Accueil", icon: "🏠" },
    { path: "/about", label: "À propos", icon: "✨" },
    { path: "/prix", label: "Plan Tarifaire", icon: "💰" },
    { path: "/menu", label: "Nos Packages", icon: "🎁" },
  ];

  const authLinks = !user
    ? [
        { path: "/reservation", label: "Réservation", icon: "📅" },
        { path: "/connection", label: "Se connecter", icon: "🔑" }
      ]
    : [
        {
          path: role === 'client' ? "/client" : "/administrateur",
          label: role === 'client' ? "Tableau Client" : "Tableau Admin",
          icon: role === 'client' ? "👤" : "👑",
          badge: role === 'admin' ? 'PRO' : 'VIP'
        },
        { 
          path: "/", 
          label: "Déconnexion", 
          icon: "🚪",
          action: handleSignOut,
          isDanger: true 
        }
      ];

  const allLinks = [...navLinks, ...authLinks];

  return (
    <>
      {/* NAVBAR PRINCIPALE */}
      <motion.nav
        className="navbar-luxe"
        variants={navVariants}
        initial="hidden"
        animate={["visible", isScrolled ? "scrolled" : ""]}
      >
        <div className="nav-container-luxe">
          {/* LOGO */}
          <motion.div 
            className="nav-brand-luxe"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <div className="logo-wrapper">
                <motion.img 
                  src={logo} 
                  alt="DrindSud Logo" 
                  className="logo-img"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <motion.div 
                  className="logo-glow-effect"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(196, 160, 110, 0.3)",
                      "0 0 40px rgba(196, 160, 110, 0.5)",
                      "0 0 20px rgba(196, 160, 110, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </Link>
          </motion.div>

          {/* MENU DESKTOP */}
          <div className="nav-links-desktop">
            {allLinks.map((link, i) => (
              <motion.div
                key={link.path}
                className="nav-item-wrapper"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className={`nav-link-item ${link.isDanger ? 'danger' : ''} ${
                    location.pathname === link.path ? 'active' : ''
                  }`}
                  onClick={() => {
                    if (link.action) {
                      link.action();
                      return;
                    }
                  }}
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="link-icon">{link.icon}</span>
                  <span className="link-text">{link.label}</span>
                  {link.badge && (
                    <motion.span 
                      className="link-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {link.badge}
                    </motion.span>
                  )}
                  {hoveredLink === link.path && (
                    <motion.div 
                      className="link-underline"
                      layoutId="underline"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* BOUTON MENU MOBILE */}
          <motion.button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
          >
            <motion.span
              className="menu-line top"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 7 : 0,
                width: isMenuOpen ? "100%" : "80%"
              }}
            />
            <motion.span
              className="menu-line middle"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                width: isMenuOpen ? "0%" : "60%"
              }}
            />
            <motion.span
              className="menu-line bottom"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -7 : 0,
                width: isMenuOpen ? "100%" : "40%"
              }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* OVERLAY ET MENU MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* MENU MOBILE */}
            <motion.div
              className="mobile-menu-luxe"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* HEADER MOBILE */}
              <div className="mobile-menu-header">
                <div className="mobile-user-info">
                  {user ? (
                    <>
                      <div className="user-avatar">
                        {role === 'admin' ? '👑' : '👤'}
                      </div>
                      <div className="user-details">
                        <p className="user-email">{user.email}</p>
                        <p className="user-role">
                          {role === 'admin' ? 'Administrateur' : 'Client Premium'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="guest-avatar">
                      👋
                    </div>
                  )}
                </div>
                <button
                  className="close-menu-btn"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Fermer le menu"
                >
                  ✕
                </button>
              </div>

              {/* LIENS MOBILE */}
              <div className="mobile-links-container">
                {allLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    className="mobile-link-wrapper"
                    variants={mobileItemVariants}
                    custom={i}
                  >
                    <Link
                      to={link.path}
                      className={`mobile-link ${link.isDanger ? 'danger' : ''} ${
                        location.pathname === link.path ? 'active' : ''
                      }`}
                      onClick={handleLinkClick}
                    >
                      <div className="link-content">
                        <span className="mobile-link-icon">{link.icon}</span>
                        <span className="mobile-link-text">{link.label}</span>
                        {link.badge && (
                          <span className="mobile-badge">
                            {link.badge}
                          </span>
                        )}
                        <span className="mobile-link-arrow">→</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* FOOTER MOBILE */}
              <div className="mobile-menu-footer">
                <div className="security-badges">
                  <div className="security-badge">
                    <span>🔒</span>
                    <span>Sécurisé</span>
                  </div>
                  <div className="security-badge">
                    <span>⚡</span>
                    <span>Rapide</span>
                  </div>
                  <div className="security-badge">
                    <span>🌟</span>
                    <span>Premium</span>
                  </div>
                </div>
                <p className="mobile-copyright">
                  © {new Date().getFullYear()} DrindSud Surprise Event
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;