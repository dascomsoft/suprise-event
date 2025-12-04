


import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/PricingPage.css';

const pricingData = [
  { title: "Package Classique", price: "50 000 FCFA", desc: "Élégance minimaliste pour une surprise réussie.", popular: false },
  { title: "Package Prestige", price: "80 000 FCFA", desc: "Raffinement et attention portée aux moindres détails.", popular: false },
  { title: "Package Bonheur", price: "100 000 FCFA", desc: "Une explosion de douceur et d’émotion pure.", popular: true },
  { title: "Package Inoubliable", price: "60 000 FCFA", desc: "Des souvenirs gravés à jamais dans les cœurs.", popular: false },
  { title: "Package Premium", price: "150 000 FCFA", desc: "Service sur-mesure, shooting photo professionnel inclus.", popular: false },
  { title: "Package Baby Shower", price: "200 000 FCFA", desc: "Célébration féerique pour l’arrivée de bébé.", popular: false },
  { title: "Package Anniversaire", price: "100 000 FCFA", desc: "Décoration couture pour un anniversaire d’exception.", popular: false },
  { title: "Package Saint-Valentin", price: "150 000 FCFA", desc: "Une déclaration d’amour spectaculaire et romantique.", popular: false },
  { title: "Package Demande en Mariage", price: "200 000 FCFA", desc: "Le moment parfait, mis en scène avec émotion et élégance.", popular: true },
  { title: "Package Accueil Aéroport", price: "60 000 FCFA", desc: "Retour au pays inoubliable, digne des plus grands films.", popular: false },
];

const testimonials = [
  { name: "Carine & Ulrich", text: "Ma demande en mariage était absolument parfaite. Des larmes, des cris, de l’émotion… Merci Drindsud.", event: "Demande en mariage" },
  { name: "Famille Mbarga", text: "L’accueil de ma mère à l’aéroport Nsimalen restera gravé à jamais. Professionnalisme 5 étoiles.", event: "Accueil diaspora" },
  { name: "Stella", text: "Ma baby shower était digne d’un conte de fées. Tout était sublime.", event: "Baby Shower" },
];

const PricingPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* HERO LUXE */}
      <motion.section className="hero-luxe">
        <div className="hero-overlay"></div>
        <motion.div className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            Drindsud<br />Surprise Event
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Nous ne créons pas des événements.<br />
            Nous créons des souvenirs qui durent toute une vie.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <a href="#packages" className="cta-gold">Découvrir nos offres</a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* PRICING SECTION */}
      <section className="pricing-luxe" id="packages">
        <div className="container">
          <motion.div className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Nos Formules d’Exception</h2>
            <p className="subtitle">Chaque détail est pensé pour sublimer votre moment</p>
          </motion.div>

          <motion.div className="pricing-grid-luxe"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {pricingData.map((item, i) => (
              <motion.div
                key={i}
                className={`card-luxe ${item.popular ? 'popular' : ''}`}
                variants={{
                  hidden: { y: 80, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                whileHover={{ y: -15, transition: { duration: 0.4 } }}
              >
                {item.popular && <span className="ribbon">Best-seller</span>}
                <h3>{item.title}</h3>
                <div className="price-luxe">
                  <span>À partir de</span>
                  <strong>{item.price}</strong>
                </div>
                <p>{item.desc}</p>
                {/* <motion.button
                  className="btn-select"
                  whileHover={{ backgroundColor: "#41403fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choisir cette formule
                </motion.button> */}
                <motion.a
                  href="https://wa.me/237699377664" // remplace par ton numéro WhatsApp
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-select"
                  whileHover={{ backgroundColor: "#41403fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choisir cette formule
                </motion.a>


              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="testimonials-luxe">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >Ils ont vécu l’expérience Drindsud</motion.h2>
          <div className="testi-grid-luxe">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="testi-card-luxe"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <p className="quote">“{t.text}”</p>
                <p className="author">— {t.name} <span>{t.event}</span></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final-luxe">
        <motion.div className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Votre moment d’exception commence maintenant</h2>
          <p>Contactez-nous pour un devis 100% personnalisé</p>
          <div className="cta-buttons">
            <motion.a href="https://wa.me/237699377664" className="btn-whatsapp-luxe"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              WhatsApp Direct
            </motion.a>
            <motion.a href="tel:+237699377664" className="btn-call-luxe"
              whileHover={{ scale: 1.05 }}>
              Appeler +237 699 377 664
            </motion.a>
          </div>
        </motion.div>
      </section>



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
    </>
  );
};

export default PricingPage;