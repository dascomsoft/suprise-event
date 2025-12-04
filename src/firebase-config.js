

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialiser l'application principale
const app = initializeApp(firebaseConfig);

// Initialiser une deuxième application pour la création d'utilisateurs
const secondaryApp = initializeApp(firebaseConfig, "Secondary");

// Export des authentifications
export const auth = getAuth(app); // Pour la session principale
export const secondaryAuth = getAuth(secondaryApp); // Pour créer des utilisateurs sans déconnexion
export const db = getFirestore(app);

export default app;
