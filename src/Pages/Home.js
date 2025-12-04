

import { useEffect } from 'react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import '../styles/Home.css';

// Import des assets (gardez vos imports existants)
import patissiere from "../assets/pati.jpg";
import pico from '../assets/pico.png';
import pico1 from '../assets/pico1.png';
import pico2 from '../assets/pico2.png';
import saxophoniste from "../assets/saxo.jpg";
import { servicesBox } from '../Box/servicesBox';

const Home = () => {

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);


  
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeDetails = () => {
    setSelectedService(null);
  };

  // Données avec animations Framer Motion
  const features = [
    {
      icon: "🎁",
      title: "Cadeaux Uniques",
      description: "Des paniers soigneusement créés avec des produits locaux de qualité supérieure."
    },
    {
      icon: "📦",
      title: "Personnalisation Complète",
      description: "Créez le panier parfait en choisissant chaque élément selon vos préférences."
    },
    {
      icon: "🚚",
      title: "Livraison Rapide",
      description: "Livraison fiable dans tout le Cameroun, avec options express disponibles."
    },
    {
      icon: "⚙️",
      title: "Service Sur Mesure",
      description: "Un service client attentif pour répondre à toutes vos exigences."
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Choisissez',
      text: 'Sélectionnez un panier prêt-à-offrir ou créez votre propre composition.'
    },
    {
      number: '2',
      title: 'Personnalisez',
      text: 'Ajoutez une touche personnelle avec un message et un emballage spécial.'
    },
    {
      number: '3',
      title: 'Recevez',
      text: 'Livraison à l\'adresse de votre choix ou retrait en boutique.'
    }
  ];

  const testimonials = [
    {
      name: "Lewis Onana",
      text: "J'ai réservé un Package Prestige pour l'anniversaire de ma sœur, et tout était parfait ! Gâteau délicieux, saxophoniste incroyable… Elle a pleuré de joie. Merci Drindsud Event pour cette magie !",
      image: pico1,
      rating: 4
    },
    {
      name: "Lea Fotso",
      text: "Nous avons fait appel à Drindsud Event pour sonoriser notre mariage. Le son était clair, puissant, et l'ambiance juste parfaite. Une équipe professionnelle et à l'écoute !",
      image: pico,
      rating: 4
    },
    {
      name: "Kimi Aziz",
      text: "Le bouquet, le gâteau, la musique… tout était tellement bien coordonné ! Drindsud a rendu la surprise pour mon fiancé inoubliable. Je recommande à 100%.",
      image: pico2,
      rating: 4
    }
  ];

  // Variants pour animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardHoverEffect = {
    rest: { y: 0 },
    hover: { 
      y: -15,
      boxShadow: "0 20px 40px rgba(196, 160, 110, 0.15)",
      borderColor: "#c4a06e"
    }
  };

  return (
    <div className='home-luxe'>
      {/* HERO SECTION LUXE */}
      <motion.section 
        className="hero-home-luxe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-overlay-luxe"></div>
        <motion.div 
          className="hero-content-luxe"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hero-title-luxe"
          >
            Drindsud<br />Surprise Event
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hero-subtitle-luxe"
          >
            Nous transformons vos moments spéciaux<br />en souvenirs éternels
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.a
              href="#services"
              className="cta-gold-luxe"
              whileHover={{ 
                backgroundColor: "#c4a06e",
                color: "#0a0a0a"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir nos services
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section 
        className="about-luxe"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-luxe"
          >
            <h2>L'Art de Créer l'Émotion</h2>
            <p className="subtitle-luxe">Depuis 2020, nous sublimons vos moments de vie</p>
          </motion.div>
          
          <motion.div 
            className="about-content-luxe"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="about-text-luxe" variants={itemVariants}>
              <p className="lead-luxe">
                Chez Drindsud Surprise Event, nous croyons que chaque moment de vie mérite d'être célébré 
                de manière unique et inoubliable. Née d'une passion pour l'art de surprendre et de créer 
                l'émotion, notre agence événementielle accompagne particuliers et professionnels dans la 
                conception et la réalisation de moments magiques.
              </p>
              <p className="lead-luxe">
                Notre objectif est simple : transformer vos idées en souvenirs inoubliables. Qu'il s'agisse 
                d'un anniversaire, d'une demande en mariage, d'une baby shower, d'un événement d'entreprise 
                ou d'une surprise personnalisée, nous mettons tout en œuvre pour que votre événement soit 
                exceptionnel, du premier échange jusqu'au grand jour.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/about" className="btn-gold-outline">
                  Notre histoire
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* SERVICES SECTION */}
      <section className="services-luxe" id="services">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-luxe"
          >
            <h2>Nos Services d'Exception</h2>
            <p className="subtitle-luxe">Transformez vos moments en souvenirs inoubliables</p>
          </motion.div>

          <motion.div 
            className="services-grid-luxe"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {servicesBox.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card-luxe"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                animate="rest"
                onClick={() => handleServiceClick(service)}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="service-card-inner"
                  variants={cardHoverEffect}
                  transition={{ duration: 0.4 }}
                >
                  <div className="service-image-container">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="service-image-luxe"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="service-overlay"></div>
                  </div>
                  <div className="service-content-luxe">
                    <h3>{service.title}</h3>
                    <motion.p 
                      className="service-desc-luxe"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {service.description.substring(0, 100)}...
                    </motion.p>
                    <motion.span 
                      className="service-link-luxe"
                      whileHover={{ x: 5 }}
                    >
                      Voir les détails →
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal Service Details */}
        {selectedService && (
          <motion.div 
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetails}
          >
            <motion.div 
              className="service-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeDetails}>×</button>
              
              <motion.div 
                className="modal-header-luxe"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2>{selectedService.title}</h2>
              </motion.div>
              
              <motion.img
                src={selectedService.image}
                alt={selectedService.title}
                className="modal-image-luxe"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              
              <motion.div 
                className="modal-body-luxe"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>{selectedService.description}</p>
              </motion.div>
              
              <motion.div 
                className="modal-footer-luxe"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="btn-modal-close"
                  onClick={closeDetails}
                  whileHover={{ backgroundColor: "#8b1e3f" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fermer
                </motion.button>
                <motion.a
                  href={`https://wa.me/237699377664?text=${encodeURIComponent(
                    `Bonjour, je souhaite obtenir plus d'informations sur le service : ${selectedService.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-whatsapp"
                  whileHover={{ backgroundColor: "#25d366" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discuter sur WhatsApp
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* FEATURES SECTION */}
      <section className="features-luxe">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-luxe"
          >
            <h2>Pourquoi Nous Choisir</h2>
            <p className="subtitle-luxe">L'excellence dans chaque détail</p>
          </motion.div>

          <motion.div 
            className="features-grid-luxe"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card-luxe"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="feature-icon-luxe"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="process-luxe">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-luxe"
          >
            <h2>Notre Processus Créatif</h2>
            <p className="subtitle-luxe">Trois étapes vers l'émotion parfaite</p>
          </motion.div>

          <div className="process-steps-luxe">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="process-step-luxe"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="step-number-luxe"
                  whileHover={{ scale: 1.2, backgroundColor: "#c4a06e", color: "#0a0a0a" }}
                >
                  {step.number}
                </motion.div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-luxe">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-luxe"
          >
            <h2>Notre Équipe d'Artistes</h2>
            <p className="subtitle-luxe">Des passionnés au service de vos émotions</p>
          </motion.div>

          <div className="team-grid-luxe">
            <motion.div
              className="team-member-luxe"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="team-image-container">
                <motion.img
                  src={patissiere}
                  alt="Patissière"
                  className="team-image-luxe"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="team-overlay"></div>
              </div>
              <div className="team-info-luxe">
                <h3>Patissière d'Exception</h3>
                <p>Créations sucrées qui racontent une histoire</p>
              </div>
            </motion.div>

            <motion.div
              className="team-member-luxe"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="team-image-container">
                <motion.img
                  src={saxophoniste}
                  alt="Saxophoniste"
                  className="team-image-luxe"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="team-overlay"></div>
              </div>
              <div className="team-info-luxe">
                <h3>Saxophoniste Virtuose</h3>
                <p>Mélodies qui touchent l'âme</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials-home-luxe">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-luxe"
          >
            <h2>Ils Nous Ont Fait Confiance</h2>
            <p className="subtitle-luxe">Des émotions partagées</p>
          </motion.div>

          <motion.div 
            className="testimonials-grid-luxe"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card-luxe"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="testimonial-content-luxe">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text-luxe">{testimonial.text}</p>
                  <div className="stars-luxe">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="testimonial-author-luxe">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="author-image-luxe"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p className="author-role-luxe">Client Satisfait</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-home-luxe">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cta-content-luxe"
          >
            <h2>Prêt à Créer des Émotions ?</h2>
            <p>Contactez-nous pour une consultation personnalisée</p>
            <div className="cta-buttons-luxe">
              <motion.a
                href="https://wa.me/237699377664"
                className="btn-whatsapp-home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WhatsApp Direct
              </motion.a>
              <motion.a
                href="tel:+237699377664"
                className="btn-call-home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Appeler Maintenant
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
            {/* FOOTER LUXE */}
    
    
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

export default Home;












