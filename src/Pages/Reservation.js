import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "../styles/Reservation.css";

function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formValid, setFormValid] = useState(false);
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
    hidden: {
      scale: 0.9,
      opacity: 0,
      rotateX: -10
    },
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
      boxShadow: "0 40px 80px rgba(196, 160, 110, 0.3)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
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
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const successVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#c4a06e",
      boxShadow: "0 0 25px rgba(196, 160, 110, 0.2)",
      transition: { duration: 0.2 }
    },
    error: {
      x: [0, -10, 10, -10, 10, 0],
      borderColor: "#f44336",
      transition: { duration: 0.5 }
    }
  };

  const floatingElements = {
    animate: {
      y: [0, -30, 0],
      rotate: [0, 360],
      opacity: [0.3, 0.7, 0.3]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Validation du formulaire
  useEffect(() => {
    const isValid =
      formData.nom.length >= 2 &&
      formData.prenom.length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.telephone.length >= 8 &&
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword &&
      passwordStrength >= 30;

    setFormValid(isValid);
  }, [formData, passwordStrength]);

  // Calcul de la force du mot de passe
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Effacer les erreurs lors de la saisie
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordStrength < 30) {
      setError("Votre mot de passe n'est pas assez sécurisé");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      // Création de l'utilisateur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Données utilisateur pour Firestore
      const userData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        role: formData.role,
        createdAt: new Date().toISOString(),
        status: 'active',
        accountType: 'standard'
      };

      // Sauvegarde dans Firestore
      await setDoc(doc(db, 'clients', user.uid), userData);

      setSuccess(true);

      // Animation de succès et redirection
      setTimeout(() => {
        navigate('/connection');
      }, 3000);

    } catch (err) {
      console.error("Erreur d'inscription:", err);

      let errorMessage = "Une erreur est survenue. Veuillez réessayer.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Cet email est déjà utilisé. Veuillez en choisir un autre.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "L'email fourni est invalide.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Le mot de passe est trop faible. Utilisez au moins 6 caractères.";
      } else if (err.code === "auth/operation-not-allowed") {
        errorMessage = "L'inscription par email n'est pas activée.";
      } else if (err.code === "auth/network-request-failed") {
        errorMessage = "Problème de connexion. Veuillez vérifier votre connexion internet.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Obtenir la couleur de la force du mot de passe
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return "#f44336";
    if (passwordStrength < 60) return "#ff9800";
    if (passwordStrength < 80) return "#4caf50";
    return "#2e7d32";
  };

  // Obtenir le texte de la force du mot de passe
  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return "Faible";
    if (passwordStrength < 60) return "Moyen";
    if (passwordStrength < 80) return "Bon";
    return "Excellent";
  };

  return (
    <div className="register-luxe">
      {/* BACKGROUND ANIMÉ */}
      <div className="register-background">
        {/* GRADIENTS ANIMÉS */}
        <motion.div
          className="register-gradient-1"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(196, 160, 110, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 50%, rgba(139, 30, 63, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 30%, rgba(196, 160, 110, 0.2) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="register-gradient-2"
          animate={{
            background: [
              "radial-gradient(circle at 60% 80%, rgba(139, 30, 63, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 20%, rgba(196, 160, 110, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 80%, rgba(139, 30, 63, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* ÉLÉMENTS FLOTTANTS */}
        <div className="floating-elements-register">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element-register"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1}rem`
              }}
              animate={floatingElements}
              transition={{
                ...floatingElements.transition,
                delay: Math.random() * 2
              }}
            >
              {['✨', '🎉', '🌟', '💫', '🎊', '💖', '👑', '🎭'][i % 8]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <motion.div
        className="register-main-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER ANIMÉ */}
        <motion.div
          className="register-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="register-logo"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            👤
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="register-title"
          >
            Rejoignez la Communauté
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="register-subtitle"
          >
            Créez votre compte pour accéder à nos services exclusifs et planifier vos moments magiques
          </motion.p>
        </motion.div>

        {/* CARTE DU FORMULAIRE */}
        <motion.div
          className="register-card"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="register-card-inner">
            {/* DÉCORATIONS */}
            <motion.div
              className="card-decoration-top"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ✨
            </motion.div>

            <motion.div
              className="card-decoration-bottom"
              animate={{
                rotate: [360, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💫
            </motion.div>

            {/* MESSAGE D'ERREUR */}
            {error && (
              <motion.div
                className="register-error"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                variants={inputVariants}
              // animate="error"
              >
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </motion.div>
            )}

            {/* FORMULAIRE */}
            <form onSubmit={handleSubmit} className="register-form-luxe">
              {/* NOM ET PRÉNOM */}
              <div className="form-row">
                <motion.div
                  className="form-group-luxe"
                  variants={itemVariants}
                >
                  <label htmlFor="nom" className="form-label">
                    <span className="label-icon">📝</span>
                    Nom *
                  </label>
                  <motion.input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Votre nom de famille"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  {formData.nom && formData.nom.length < 2 && (
                    <span className="input-hint">Minimum 2 caractères</span>
                  )}
                </motion.div>

                <motion.div
                  className="form-group-luxe"
                  variants={itemVariants}
                >
                  <label htmlFor="prenom" className="form-label">
                    <span className="label-icon">📝</span>
                    Prénom *
                  </label>
                  <motion.input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Votre prénom"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  {formData.prenom && formData.prenom.length < 2 && (
                    <span className="input-hint">Minimum 2 caractères</span>
                  )}
                </motion.div>
              </div>

              {/* EMAIL ET TÉLÉPHONE */}
              <div className="form-row">
                <motion.div
                  className="form-group-luxe"
                  variants={itemVariants}
                >
                  <label htmlFor="email" className="form-label">
                    <span className="label-icon">📧</span>
                    Email *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="votre@email.com"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  {formData.email && !formData.email.includes('@') && (
                    <span className="input-hint">Format d'email invalide</span>
                  )}
                </motion.div>

                <motion.div
                  className="form-group-luxe"
                  variants={itemVariants}
                >
                  <label htmlFor="telephone" className="form-label">
                    <span className="label-icon">📱</span>
                    Téléphone *
                  </label>
                  <motion.input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Votre numéro"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  {formData.telephone && formData.telephone.length < 8 && (
                    <span className="input-hint">Minimum 8 chiffres</span>
                  )}
                </motion.div>
              </div>

              {/* MOT DE PASSE */}
              <motion.div
                className="form-group-luxe"
                variants={itemVariants}
              >
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔐</span>
                  Mot de passe *
                </label>
                <div className="password-input-wrapper">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Créez un mot de passe sécurisé"
                    whileFocus="focus"
                    variants={inputVariants}
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
                </div>

                {/* BARRE DE FORCE DU MOT DE PASSE */}
                {formData.password && (
                  <div className="password-strength-container">
                    <div className="strength-indicator">
                      <span>Force du mot de passe:</span>
                      <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="strength-bar">
                      <motion.div
                        className="strength-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.5 }}
                        style={{ backgroundColor: getPasswordStrengthColor() }}
                      />
                    </div>
                    <div className="strength-requirements">
                      <span className={formData.password.length >= 6 ? "met" : "unmet"}>
                        ✓ Au moins 6 caractères
                      </span>
                      <span className={/[A-Z]/.test(formData.password) ? "met" : "unmet"}>
                        ✓ Contient une majuscule
                      </span>
                      <span className={/[0-9]/.test(formData.password) ? "met" : "unmet"}>
                        ✓ Contient un chiffre
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* CONFIRMATION MOT DE PASSE */}
              <motion.div
                className="form-group-luxe"
                variants={itemVariants}
              >
                <label htmlFor="confirmPassword" className="form-label">
                  <span className="label-icon">🔒</span>
                  Confirmer le mot de passe *
                </label>
                <div className="password-input-wrapper">
                  <motion.input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Retapez votre mot de passe"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                  <motion.button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </motion.button>
                </div>

                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <span className="input-hint">Les mots de passe ne correspondent pas</span>
                )}
              </motion.div>

              {/* CONDITIONS */}
              <motion.div
                className="form-group-luxe terms-section"
                variants={itemVariants}
              >
                {/* <div className="terms-container">
                  <motion.input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="terms-checkbox"
                    whileTap={{ scale: 0.95 }}
                  />
                  <label htmlFor="terms" className="terms-label">
                    J'accepte les{' '}
                    <a href="/conditions" className="terms-link">
                      conditions d'utilisation
                    </a>{' '}
                    et la{' '}
                    <a href="/confidentialite" className="terms-link">
                      politique de confidentialité
                    </a>
                  </label>
                </div> */}
              </motion.div>

              {/* BOUTON D'INSCRIPTION */}
              <motion.div
                className="form-submit-section"
                variants={itemVariants}
              >
                <motion.button
                  type="submit"
                  className="register-button"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={formValid && !loading ? "hover" : ""}
                  whileTap={formValid && !loading ? "tap" : ""}
                  animate={loading ? "loading" : "initial"}
                  disabled={!formValid || loading}
                >
                  {loading ? (
                    <div className="loading-content">
                      <motion.div
                        className="loading-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ✨
                      </motion.div>
                      <span>Création en cours...</span>
                    </div>
                  ) : (
                    <>
                      <span className="button-icon">🎉</span>
                      <span>Créer mon compte</span>
                    </>
                  )}
                </motion.button>

                {!formValid && (
                  <motion.p
                    className="form-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Remplissez tous les champs correctement pour continuer
                  </motion.p>
                )}
              </motion.div>
            </form>

            {/* LIEN DE CONNEXION */}
            <motion.div
              className="register-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="login-prompt">
                Déjà membre ?
                <motion.a
                  href="/connection"
                  className="login-link"
                  whileHover={{
                    scale: 1.05,
                    color: "#c4a06e"
                  }}
                >
                  Connectez-vous ici
                </motion.a>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* MODAL DE SUCCÈS */}
        {success && (
          <motion.div
            className="register-success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="success-content"
              variants={successVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="success-icon"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎊
              </motion.div>

              <h2>Bienvenue parmi nous !</h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Votre compte a été créé avec succès.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Redirection vers la page de connexion...
              </motion.p>

              <motion.div
                className="success-progress"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* AVANTAGES */}
        <motion.div
          className="register-advantages"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="advantages-title">Pourquoi créer un compte ?</h3>
          <div className="advantages-grid">
            <motion.div
              className="advantage-card"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <span className="advantage-icon">🎁</span>
              <h4>Réservations rapides</h4>
              <p>Planifiez vos événements en quelques clics</p>
            </motion.div>

            <motion.div
              className="advantage-card"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <span className="advantage-icon">💎</span>
              <h4>Offres exclusives</h4>
              <p>Accédez à des promotions réservées aux membres</p>
            </motion.div>

            <motion.div
              className="advantage-card"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <span className="advantage-icon">📱</span>
              <h4>Gestion simplifiée</h4>
              <p>Suivez toutes vos réservations au même endroit</p>
            </motion.div>
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.footer
          className="register-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="footer-security">
            <motion.div
              className="security-badge"
              whileHover={{ scale: 1.1 }}
            >
              <span className="security-icon">🔒</span>
              <span>Données cryptées</span>
            </motion.div>

            <motion.div
              className="security-badge"
              whileHover={{ scale: 1.1 }}
            >
              <span className="security-icon">🛡️</span>
              <span>Confidentialité garantie</span>
            </motion.div>

            <motion.div
              className="security-badge"
              whileHover={{ scale: 1.1 }}
            >
              <span className="security-icon">⚡</span>
              <span>Service 24/7</span>
            </motion.div>
          </div>

          <motion.p
            className="footer-credit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
          >
            ✨ Drindsud Surprise Event — Votre bonheur, notre passion ✨
          </motion.p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default Register;