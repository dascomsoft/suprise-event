

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Données pour les valeurs
  const values = [
    {
      icon: "🎨",
      title: "Créativité Illimitée",
      description: "Chaque événement est une toile vierge que nous peignons avec une touche artistique unique et originale.",
      color: "#c4a06e"
    },
    {
      icon: "❤️",
      title: "Émotion Pure",
      description: "Nous ne créons pas seulement des décors, mais des moments forts remplis de joie, de surprise et d'émotion pure.",
      color: "#8b1e3f"
    },
    {
      icon: "👂",
      title: "Écoute Active",
      description: "Vous êtes au centre de notre attention. Vos rêves et envies guident chaque étape de notre travail.",
      color: "#c4a06e"
    },
    {
      icon: "🤝",
      title: "Fiabilité Totale",
      description: "Professionnalisme, ponctualité et engagement absolu sont nos maîtres-mots pour chaque projet.",
      color: "#8b1e3f"
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Nous visons la perfection dans les moindres détails pour une expérience sans compromis.",
      color: "#c4a06e"
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Nous repoussons les limites de l'imaginaire pour créer des expériences uniques et inoubliables.",
      color: "#8b1e3f"
    }
  ];

  // Histoire de l'entreprise
  const timeline = [
    {
      year: "2020",
      title: "Naissance d'un Rêve",
      description: "Création de Drindsud avec une vision simple : transformer les moments ordinaires en souvenirs extraordinaires.",
      icon: "🚀"
    },
    {
      year: "2021",
      title: "Premières Émotions",
      description: "Première demande en mariage organisée. Les larmes de joie confirment notre vocation.",
      icon: "💍"
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Ouverture de notre atelier créatif et élargissement de notre équipe d'artistes passionnés.",
      icon: "📈"
    },
    {
      year: "2023",
      title: "Reconnaissance",
      description: "Prix 'Excellence Événementielle' et partenariat avec des fournisseurs premium.",
      icon: "🏆"
    },
    {
      year: "2024",
      title: "Innovation",
      description: "Lancement de nos expériences immersives et réalité augmentée pour les événements.",
      icon: "✨"
    },
    {
      year: "2025",
      title: "Légende",
      description: "Plus de 500 événements magiques créés, des souvenirs éternels gravés dans les cœurs.",
      icon: "👑"
    }
  ];
  // Équipe créative avec avatars africains fictifs
  const team = [
    {
      name: "Sarah M.",
      role: "Directrice Artistique",
      specialty: "Scénographie & Ambiance",
      quote: "Chaque détail raconte une histoire.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/african-woman-avatar-3d-icon-123456.png"
    },
    {
      name: "David K.",
      role: "Master Planificateur",
      specialty: "Logistique & Timing Parfait",
      quote: "La magie réside dans l'impeccable.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/african-man-avatar-3d-icon-654321.png"
    },
    {
      name: "Léa T.",
      role: "Alchimiste Émotionnelle",
      specialty: "Moments de Suspense & Surprise",
      quote: "Je crée les battements de cœur suspendus.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/african-girl-avatar-3d-icon-789012.png"
    },
    {
      name: "Marc D.",
      role: "Architecte Sensoriel",
      specialty: "Lumières & Son Immersif",
      quote: "La technologie au service de l'émotion.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/african-boy-avatar-3d-icon-345678.png"
    }
  ];
  ;

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -15,
      boxShadow: "0 25px 50px rgba(196, 160, 110, 0.3)",
      transition: { duration: 0.4 }
    }
  };

  const infiniteFloat = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="about-luxe">
      {/* HERO SECTION - Background Image Spectaculaire */}
      <motion.section
        className="hero-about-luxe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-overlay-about"></div>
        <div className="floating-elements">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 2 + 1}rem`
              }}
              animate={{
                y: [0, -100, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {['✨', '🎉', '💫', '🎊', '🌟', '🎈', '🎁', '💖'][i % 8]}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hero-content-about"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="hero-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            ✨
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="hero-title-about"
          >
            L'Art de Créer<br />l'Émotion Pure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="hero-subtitle-about"
          >
            Depuis 2020, nous transformons vos rêves<br />en souvenirs éternels
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="cta-buttons-about"
          >
            <motion.a
              href="#histoire"
              className="btn-gold-about"
              whileHover={{
                backgroundColor: "#c4a06e",
                color: "#0a0a0a",
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir Notre Histoire
            </motion.a>

            <motion.a
              href="#equipe"
              className="btn-outline-gold"
              whileHover={{
                backgroundColor: "rgba(196, 160, 110, 0.1)",
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              Rencontrer l'Équipe
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>↓</span>
        </motion.div>
      </motion.section>

      {/* STATISTIQUES MÉTAPHORIQUES & INTERACTIVES */}
      <motion.section
        className="stats-metaphor-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2 }}
      >
        <div className="container">
          {/* TITRE ANIMÉ */}
          <motion.div
            className="section-header-metaphor"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="title-sparkle"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
            <h2>L'Émotion en Chiffres</h2>
            <p className="subtitle-metaphor">
              Des statistiques qui racontent plus que des nombres<br />
              elles racontent des sourires, des larmes de joie, des moments magiques
            </p>
          </motion.div>

          {/* STATISTIQUES PRINCIPALES EN 3D */}
          <div className="stats-3d-grid">
            {/* CARD 1 - ÉVÉNEMENTS */}
            <motion.div
              className="stat-card-3d"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0 30px 60px rgba(196, 160, 110, 0.4)"
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="stat-card-inner">
                <div className="stat-front">
                  <motion.div
                    className="stat-icon-3d"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🎭
                  </motion.div>
                  <motion.div
                    className="stat-number-3d"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    500+
                  </motion.div>
                  <h3>Moments Magiques</h3>
                  <p>Chaque chiffre cache une émotion unique</p>

                  <motion.div
                    className="stat-progress-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className="progress-fill"></div>
                  </motion.div>
                </div>
                <div className="stat-back">
                  <div className="stat-quote">
                    "500 sourires éclatants, 500 cœurs touchés"
                  </div>
                </div>
              </div>

              <motion.div
                className="stat-glow"
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

            {/* CARD 2 - SATISFACTION */}
            <motion.div
              className="stat-card-3d"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0 30px 60px rgba(139, 30, 63, 0.4)"
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="stat-card-inner">
                <div className="stat-front">
                  <motion.div
                    className="stat-icon-3d"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    ❤️
                  </motion.div>
                  <motion.div
                    className="stat-number-3d"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  >
                    100%
                  </motion.div>
                  <h3>Cœurs Touchés</h3>
                  <p>Une émotion garantie à chaque fois</p>

                  <motion.div
                    className="stat-progress-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className="progress-fill"></div>
                  </motion.div>
                </div>
                <div className="stat-back">
                  <div className="stat-quote">
                    "Chaque client repart avec un sourire et un souvenir"
                  </div>
                </div>
              </div>

              <motion.div
                className="stat-glow"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* CARD 3 - DISPONIBILITÉ */}
            <motion.div
              className="stat-card-3d"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0 30px 60px rgba(196, 160, 110, 0.4)"
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="stat-card-inner">
                <div className="stat-front">
                  <motion.div
                    className="stat-icon-3d"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut"
                    }}
                  >
                    ⏰
                  </motion.div>
                  <motion.div
                    className="stat-number-3d"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  >
                    24/7
                  </motion.div>
                  <h3>Disponibilité</h3>
                  <p>Vos rêves n'attendent pas</p>

                  <motion.div
                    className="pulse-circle"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="stat-back">
                  <div className="stat-quote">
                    "La magie opère à toute heure, pour chaque urgence de bonheur"
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 4 - EXPÉRIENCE */}
            <motion.div
              className="stat-card-3d"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0 30px 60px rgba(139, 30, 63, 0.4)"
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="stat-card-inner">
                <div className="stat-front">
                  <motion.div
                    className="stat-icon-3d"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    📅
                  </motion.div>
                  <motion.div
                    className="stat-number-3d"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                  >
                    5+
                  </motion.div>
                  <h3>Années d'Excellence</h3>
                  <p>Un savoir-faire qui s'affine avec le temps</p>

                  <div className="timeline-dots">
                    {[1, 2, 3, 4, 5].map((dot, index) => (
                      <motion.span
                        key={dot}
                        className="timeline-dot"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 1.2 + (index * 0.1),
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.5 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="stat-back">
                  <div className="stat-quote">
                    "5 ans à créer des étoiles dans les yeux"
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* PARTICLES INTERACTIVES */}
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="stat-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? "#c4a06e" :
                    i % 3 === 1 ? "#8b1e3f" : "#fff"
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  rotate: [0, 360],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* CTA INTERACTIF */}
          <motion.div
            className="stats-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="cta-bubble">
              <motion.div
                className="bubble-content"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [-1, 1, -1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="bubble-icon">💫</span>
                <h4>Ces chiffres ne sont que le début</h4>
                <p>Votre histoire sera notre prochaine statistique</p>

                <motion.button
                  className="bubble-button"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#c4a06e",
                    color: "#0a0a0a"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(196, 160, 110, 0.3)",
                      "0 0 40px rgba(196, 160, 110, 0.6)",
                      "0 0 20px rgba(196, 160, 110, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Devenir une statistique heureuse
                </motion.button>
              </motion.div>

              <div className="bubble-tail"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* HISTOIRE DE L'ENTREPRISE */}
      <section className="histoire-section" id="histoire">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-about"
          >
            <h2>Notre Voyage Magique</h2>
            <p className="subtitle-about">De la première étincelle à la légende</p>
          </motion.div>

          <div className="timeline-luxe">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover="hover"
              >
                <motion.div
                  className="timeline-content"
                  variants={cardHoverVariants}
                >
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
                <div className="timeline-dot"></div>
              </motion.div>
            ))}
            <div className="timeline-line"></div>
          </div>
        </div>
      </section>

      {/* VALEURS FONDAMENTALES */}
      <section className="valeurs-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-about"
          >
            <h2>Notre ADN Créatif</h2>
            <p className="subtitle-about">Les piliers de notre excellence</p>
          </motion.div>

          <motion.div
            className="valeurs-grid-luxe"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="valeur-card-luxe"
                variants={itemVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div
                  className="valeur-icon-container"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  style={{ color: value.color }}
                >
                  <span className="valeur-icon">{value.icon}</span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, color: value.color }}
                >
                  {value.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {value.description}
                </motion.p>

                <motion.div
                  className="valeur-decoration"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  style={{ backgroundColor: value.color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ÉQUIPE CRÉATIVE */}
      <section className="equipe-section" id="equipe">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header-about"
          >
            <h2>Les Artistes de l'Émotion</h2>
            <p className="subtitle-about">La magie naît de nos passions réunies</p>
          </motion.div>

          <div className="equipe-grid-luxe">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="member-card-luxe"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover="hover"
              >
                <motion.div
                  className="member-image-container"
                  variants={cardHoverVariants}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-image-luxe"
                  />
                  <div className="member-overlay">
                    <div className="member-quote">"{member.quote}"</div>
                  </div>
                </motion.div>

                <div className="member-info-luxe">
                  <motion.h3
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, color: "#c4a06e" }}
                  >
                    {member.name}
                  </motion.h3>

                  <motion.div
                    className="member-role"
                    whileHover={{ scale: 1.1 }}
                  >
                    {member.role}
                  </motion.div>

                  <motion.p
                    className="member-specialty"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {member.specialty}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section className="philosophy-section">
        <div className="container">
          <motion.div
            className="philosophy-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="philosophy-quote"
              animate={infiniteFloat}
            >
              "
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Nous ne créons pas des événements.<br />
              Nous créons des <span className="gold-text">émotions pures</span>,<br />
              des <span className="gold-text">souvenirs vivants</span>,<br />
              des <span className="gold-text">instants éternels</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="philosophy-author"
            >
              — Philosophie Drindsud
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-about-section">
        <div className="container">
          <motion.div
            className="cta-about-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Prêt à Écrire Votre Propre Histoire Magique ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Rejoignez les centaines de personnes qui nous ont fait confiance<br />
              pour transformer leurs rêves en réalité.
            </motion.p>

            <motion.div
              className="cta-buttons-final"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://wa.me/237699377664"
                className="btn-whatsapp-about"
                whileHover={{ scale: 1.05, backgroundColor: "#128C7E" }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Parler à un Magicien
              </motion.a>

              <motion.a
                href="#contact"
                className="btn-portfolio"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "transparent",
                  borderColor: "#c4a06e",
                  color: "#c4a06e"
                }}
                whileTap={{ scale: 0.95 }}
              >
                🎬 Voir Nos Réalisations
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
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
    </div>
  );
};

export default About;