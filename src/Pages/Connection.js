



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import "../styles/Login.css";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const navigate = useNavigate();

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, rotateX: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 30px 60px rgba(196, 160, 110, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#c4a06e",
      boxShadow: "0 0 20px rgba(196, 160, 110, 0.2)",
      transition: { duration: 0.2 }
    },
    blur: {
      scale: 1,
      borderColor: "#2a2a2a",
      boxShadow: "none",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: "#c4a06e",
      color: "#0a0a0a",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    },
    tap: { scale: 0.95 },
    loading: {
      scale: [1, 1.1, 1],
      rotate: [0, 360],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const errorVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingParticles = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 360],
      opacity: [0.3, 0.8, 0.3]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShakeError(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Animation de succès
      const successAnimation = async () => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const clientDoc = await getDoc(doc(db, 'clients', user.uid));
        const adminDoc = await getDoc(doc(db, 'administrateurs', user.uid));

        if (clientDoc.exists()) {
          navigate('/client');
        } else if (adminDoc.exists()) {
          navigate('/administrateur');
        } else {
          setError("Aucun rôle trouvé pour cet utilisateur");
          setShakeError(true);
        }
      };

      await successAnimation();
    } catch (err) {
      console.error("Erreur de connexion:", err);
      let errorMessage = "Erreur lors de la connexion";

      if (err.code === 'auth/invalid-email') {
        errorMessage = "Email invalide";
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = "Utilisateur non trouvé";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Mot de passe incorrect";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "Trop de tentatives. Réessayez plus tard";
      }

      setError(errorMessage);
      setShakeError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-luxe">
      {/* BACKGROUND ANIMÉ */}
      <div className="login-background">
        {/* GRADIENT ANIMÉ */}
        <motion.div
          className="login-gradient"
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(196, 160, 110, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 30%, rgba(139, 30, 63, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 20%, rgba(196, 160, 110, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* PARTICULES FLOTTANTES */}
        <div className="login-particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="login-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                background: i % 3 === 0 ? "#c4a06e" :
                  i % 3 === 1 ? "#8b1e3f" : "#d4b98a"
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* SECTION PRINCIPALE */}
      <motion.div
        className="login-main-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER ANIMÉ */}
        <motion.div
          className="login-header"
          variants={itemVariants}
        >
          <motion.div
            className="login-logo"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ rotate: 5 }}
          >
            🔐
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="login-title"
          >
            Accès à la Magie
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="login-subtitle"
          >
            Entrez dans l'univers exclusif Drindsud Suprise
          </motion.p>
        </motion.div>

        {/* CARTE DE CONNEXION */}
        <motion.div
          className="login-card-container"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="login-card-inner">
            {/* DÉCORATION DE CARTE */}
            <motion.div
              className="card-decoration"
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

            {/* MESSAGE D'ERREUR ANIMÉ */}
            {error && (
              <motion.div
                className="login-error-message"
                variants={errorVariants}
                initial="hidden"
                animate={shakeError ? ["visible", "shake"] : "visible"}
                onAnimationComplete={() => setShakeError(false)}
              >
                <span className="error-icon">⚠️</span>
                {error}
              </motion.div>
            )}

            {/* FORMULAIRE */}
            <form onSubmit={handleLogin} className="login-form-luxe">
              {/* CHAMP EMAIL */}
              <motion.div
                className="form-group-luxe"
                variants={itemVariants}
              >
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">📧</span>
                  Email
                </label>
                <motion.div
                  className="input-wrapper"
                  variants={inputVariants}
                  whileFocus="focus"
                  whileHover="hover"
                >
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                    placeholder="votre@email.com"
                    disabled={loading}
                  />
                  <div className="input-glow" />
                </motion.div>
              </motion.div>

              {/* CHAMP MOT DE PASSE */}
              <motion.div
                className="form-group-luxe"
                variants={itemVariants}
              >
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔒</span>
                  Mot de passe
                </label>
                <motion.div
                  className="input-wrapper password-wrapper"
                  variants={inputVariants}
                  whileFocus="focus"
                  whileHover="hover"
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                    placeholder="Votre mot de passe"
                    disabled={loading}
                  />
                  <motion.button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </motion.button>
                  <div className="input-glow" />
                </motion.div>

                {/* INDICATEUR DE FORCE DU MOT DE PASSE */}
                {password && (
                  <motion.div
                    className="password-strength"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div className="strength-bar">
                      <motion.div
                        className="strength-fill"
                        initial={{ width: "0%" }}
                        animate={{
                          width: password.length > 8 ? "100%" :
                            password.length > 5 ? "66%" : "33%"
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="strength-text">
                      {password.length > 8 ? "Fort" :
                        password.length > 5 ? "Moyen" : "Faible"}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* BOUTON DE CONNEXION */}
              <motion.button
                type="submit"
                className="login-button"
                variants={buttonVariants}
                initial="initial"
                whileHover={!loading ? "hover" : ""}
                whileTap={!loading ? "tap" : ""}
                animate={loading ? "loading" : "initial"}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <AiOutlineLoading3Quarters />
                    </motion.span>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <span className="button-icon">🚀</span>
                    Accéder à la magie
                  </>
                )}
              </motion.button>
            </form>

            {/* LIENS SUPPLÉMENTAIRES */}
            <motion.div
              className="login-links"
              variants={itemVariants}
            >
              <motion.a
                href="/reservation"
                className="register-link"
                whileHover={{
                  scale: 1.05,
                  color: "#c4a06e"
                }}
              >
                Pas encore de compte ?
                <motion.span
                  className="highlight-link"
                  whileHover={{ x: 5 }}
                >
                  Créer un compte
                </motion.span>
              </motion.a>


            </motion.div>

            {/* DIVISEUR */}
            <motion.div
              className="divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span>Welcome</span>
            </motion.div>

          </div>
        </motion.div>

        {/* FOOTER LUXE */}
        <motion.footer
          className="login-footer-luxe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="footer-content">
            <motion.div
              className="security-note"
              whileHover={{ scale: 1.05 }}
            >
              <span className="security-icon">🛡️</span>
              Connexion sécurisée par chiffrement SSL
            </motion.div>

            <motion.div
              className="contact-support"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p>Besoin d'aide ?</p>
              <motion.a
                href="tel:+237699377664"
                className="support-link"
                whileHover={{ scale: 1.05 }}
              >
                📞 +237 699 377 664
              </motion.a>
            </motion.div>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Login;






