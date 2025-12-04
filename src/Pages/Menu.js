import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { packageBox } from '../Box/packageBox';
import "../styles/Menu.css";

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'premium', 'classique', 'special', 'luxe'];

  // Filtrer les packages par catégorie
  const filteredPackages = activeCategory === 'all'
    ? packageBox
    : packageBox.filter(pkg => pkg.category === activeCategory);

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setSelectedPackage(null);
    document.body.style.overflow = 'auto';
  };

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
    },
    hover: {
      scale: 1.05,
      y: -15,
      boxShadow: "0 30px 60px rgba(196, 160, 110, 0.4)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className='menu-luxe'>
      {/* HERO SECTION SPECTACULAIRE */}
      <motion.section
        className="hero-menu-luxe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-overlay-menu"></div>

        {/* PARTICULES FLOTTANTES */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="menu-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 4 === 0 ? "#c4a06e" :
                  i % 4 === 1 ? "#8b1e3f" :
                    i % 4 === 2 ? "#fff" : "#d4b98a"
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <motion.div
          className="hero-content-menu"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="hero-badge-menu"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            🎁
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="hero-title-menu"
          >
            Nos Packages d'Exception
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="hero-subtitle-menu"
          >
            Chaque package est une œuvre d'art<br />
            dédiée à créer l'émotion parfaite
          </motion.p>

          <motion.div
            className="hero-scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span>↓</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* FILTRES CATÉGORIES ANIMÉS */}
      <motion.section
        className="categories-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="categories-wrapper">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`category-filter ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="filter-icon">
                  {category === 'all' && '✨'}
                  {category === 'premium' && '👑'}
                  {category === 'classique' && '🎩'}
                  {category === 'special' && '💝'}
                  {category === 'luxe' && '💎'}
                </span>
                <span className="filter-text">
                  {category === 'all' ? 'Tous' :
                    category === 'premium' ? 'Premium' :
                      category === 'classique' ? 'Classique' :
                        category === 'special' ? 'Spéciaux' : 'Luxe'}
                </span>

                {activeCategory === category && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GRILLE DE PACKAGES 3D */}
      <motion.section
        className="packages-grid-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <div className="packages-grid-luxe">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className="package-card-luxe"
                variants={itemVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                onHoverStart={() => setHoveredPackage(pkg.id)}
                onHoverEnd={() => setHoveredPackage(null)}
                onClick={() => handlePackageClick(pkg)}
              >
                <motion.div
                  className="package-card-inner"
                  variants={cardHoverVariants}
                  style={{ perspective: "1000px" }}
                >
                  {/* BADGE BEST-SELLER */}
                  {pkg.bestSeller && (
                    <motion.div
                      className="best-seller-badge"
                      initial={{ rotate: -45, x: -50 }}
                      animate={{ rotate: -45, x: -35 }}
                      whileHover={{ rotate: -35, scale: 1.1 }}
                    >
                      <span>⭐ BEST-SELLER</span>
                    </motion.div>
                  )}

                  {/* IMAGE DU PACKAGE */}
                  <div className="package-image-container">
                    <motion.img
                      src={pkg.image}
                      alt={pkg.title}
                      className="package-image-luxe"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="package-image-overlay">
                      <motion.div
                        className="view-details-btn"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredPackage === pkg.id ? 1 : 0,
                          y: hoveredPackage === pkg.id ? 0 : 20
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Voir les détails →
                      </motion.div>
                    </div>
                  </div>

                  {/* CONTENU DU PACKAGE */}
                  <div className="package-content-luxe">
                    <div className="package-header">
                      <motion.h3
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: hoveredPackage === pkg.id ? 1 : 0.8 }}
                      >
                        {pkg.title}
                      </motion.h3>

                      {pkg.category && (
                        <motion.span
                          className="package-category"
                          whileHover={{ scale: 1.1 }}
                        >
                          {pkg.category}
                        </motion.span>
                      )}
                    </div>

                    {/* ÉTOILES DE POPULARITÉ */}
                    {pkg.popularity && (
                      <motion.div
                        className="popularity-stars"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {[...Array(pkg.popularity)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="star"
                            animate={{
                              rotate: [0, 20, 0],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut"
                            }}
                          >
                            ★
                          </motion.span>
                        ))}
                      </motion.div>
                    )}

                    {/* PRIX ANIMÉ */}
                    <motion.div
                      className="package-price"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="price-from">À partir de</span>
                      <motion.div
                        className="price-amount"
                        whileHover={{ scale: 1.1 }}
                      >
                        {pkg.price}
                      </motion.div>
                    </motion.div>

                    {/* DESCRIPTION */}
                    <motion.p
                      className="package-description"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: hoveredPackage === pkg.id ? 1 : 0.7 }}
                    >
                      {pkg.shortDescription}
                    </motion.p>

                    {/* TAGS */}
                    {pkg.tags && (
                      <motion.div
                        className="package-tags"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        {pkg.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="tag"
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* EFFET DE LUEUR */}
                  <motion.div
                    className="package-glow"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION COMPARATIF */}
      <motion.section
        className="comparison-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="comparison-header"
          >
            <h2>Quel Package Choisir ?</h2>
            <p className="comparison-subtitle">
              Trouvez le package parfait pour votre moment magique
            </p>
          </motion.div>

          <div className="comparison-cards">
            {packageBox.slice(0, 3).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className="comparison-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <h3>{pkg.title}</h3>
                <div className="comparison-price">{pkg.price}</div>
                <ul className="comparison-features">
                  {pkg.features?.slice(0, 4).map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      ✓ {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className="comparison-select-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#c4a06e", color: "#0a0a0a" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePackageClick(pkg)}
                >
                  Choisir ce package
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA PERSONALISATION */}
      <motion.section
        className="customization-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.div
            className="customization-content"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="customization-icon"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚡
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Votre Package Sur Mesure
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Ces packages ne sont que des bases.<br />
              Contactez-nous pour créer ensemble votre expérience unique.
            </motion.p>

            <motion.div
              className="customization-buttons"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.a
                href={`https://wa.me/237699377664?text=${encodeURIComponent(
                  "Bonjour, je souhaite créer un package sur mesure avec Drindsud Surprise Event."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-custom"
                whileHover={{ scale: 1.05, backgroundColor: "#128C7E" }}
                whileTap={{ scale: 0.95 }}
              >
                💬 Discuter avec un expert
              </motion.a>

              <motion.a
                href="tel:+237699377664"
                className="btn-call-custom"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "transparent",
                  borderColor: "#c4a06e",
                  color: "#c4a06e"
                }}
                whileTap={{ scale: 0.95 }}
              >
                📞 Appeler maintenant
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* MODAL DE DÉTAILS */}
      {selectedPackage && (
        <motion.div
          className="package-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDetails}
        >
          <motion.div
            className="package-modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="modal-close-btn"
              onClick={closeDetails}
              whileHover={{ rotate: 90, backgroundColor: "#8b1e3f" }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>

            <div className="modal-header-luxe">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {selectedPackage.title}
              </motion.h2>
              <motion.div
                className="modal-price"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {selectedPackage.price}
              </motion.div>
            </div>

            <motion.img
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="modal-image-luxe"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            />

            <motion.div
              className="modal-body-luxe"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="modal-description">
                <h3>Description complète</h3>
                <p>
                  {selectedPackage.description?.intro || selectedPackage.shortDescription}
                  <br /><br />
                  {selectedPackage.description?.list && (
                    <ul className="feature-list">
                      {selectedPackage.description.list.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (index * 0.1) }}
                        >
                          ✓ {item}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                  <br />
                  {selectedPackage.description?.outro && (
                    <p className="modal-outro">{selectedPackage.description.outro}</p>
                  )}
                </p>
              </div>

              {selectedPackage.fullFeatures && (
                <motion.div
                  className="modal-features"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3>Inclus dans ce package</h3>
                  <div className="features-grid">
                    {selectedPackage.fullFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="feature-item"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + (index * 0.05) }}
                      >
                        <span className="feature-icon">✨</span>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="modal-footer-luxe"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="btn-modal-close"
                onClick={closeDetails}
                whileHover={{ backgroundColor: "#8b1e3f" }}
                whileTap={{ scale: 0.95 }}
              >
                Continuer à explorer
              </motion.button>

              <motion.a
                href={`https://wa.me/237699377664?text=${encodeURIComponent(
                  `Bonjour, je souhaite réserver le package : ${selectedPackage.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-reserve"
                whileHover={{
                  backgroundColor: "#25d366",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
              >
                Réserver maintenant
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* FOOTER LUXE */}
      <footer className="footer-menu-luxe">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="footer-content-menu"
          >
            <div className="footer-grid-luxe">
              <div className="footer-col">
                <motion.h3
                  whileHover={{ color: "#c4a06e" }}
                >
                  Drindsud Surprise Event
                </motion.h3>
                <p>Créateurs d'émotions magiques depuis 2020</p>
                <p>📍 155 Rue Charles Atangana, Yaoundé</p>
              </div>

              <div className="footer-col">
                <h3>Contact Rapide</h3>
                <motion.a
                  href="tel:+237699377664"
                  whileHover={{ scale: 1.05 }}
                >
                  📞 +237 699 377 664
                </motion.a>
                <motion.a
                  href="mailto:wambolecourant@yahoo.fr"
                  whileHover={{ scale: 1.05 }}
                >
                  ✉️ wambolecourant@yahoo.fr
                </motion.a>
              </div>

              <div className="footer-col">
                <h3>Suivez la Magie</h3>
                <div className="social-links-menu">
                  {[
                    { icon: '📘', label: 'Facebook', url: 'https://www.facebook.com/share/1KaSEYsuHb/' },
                    { icon: '📸', label: 'Instagram', url: '#' },
                    { icon: '💬', label: 'WhatsApp', url: 'https://wa.me/237699377664' },
                    { icon: '🎥', label: 'YouTube', url: '#' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-menu"
                      whileHover={{
                        scale: 1.3,
                        rotate: 360,
                        backgroundColor: "#c4a06e",
                        color: "#0a0a0a"
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="footer-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="copyright-menu"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              © 2025 Drindsud Surprise Event — Tous droits réservés
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Menu;