

import party from "../assets/party.jpg";
import bouquet1 from "../assets/suprise2.jpg";
import bouquet from "../assets/cake1.jpg";
import party3 from "../assets/party3.jpg";
import party1 from "../assets/party1.jpg";
import suprise5 from "../assets/suprise5.jpg";
import suprise4 from "../assets/suprise4.jpg";
import suprise3 from "../assets/suprise3.jpg";
import livraison from "../assets/livraison.jpg";
import airport from "../assets/airport.jpg";


export const packageBox = [
  {
    id: 1,
    image: party1,
    title: "🎈 Package Classique",
    description: {
      intro: "💫 L'essentiel pour un moment plein d'émotion",
      list: [
        "🎂 Un délicieux gâteau d’anniversaire",
        "🎷 Une prestation musicale douce par un saxophoniste professionnel",
        "✍️ La rédaction et la lecture personnalisée d’un message émouvant"
      ],
      outro: '👉 Idéal pour dire "Je pense à toi" avec élégance et simplicité.'
    }
  },
  {
    id: 2,
    image: bouquet1,
    title: "🌟 Package Prestige",
    description: {
      intro: "🌺 Un soupçon de raffinement pour sublimer votre surprise",
      list: [
        "🎂 Gâteau d’anniversaire",
        "🎷 Saxophoniste",
        "✍️ Message personnalisé lu avec émotion",
        "🍇 Un panier garni (fruits frais, raisins, pommes, chocolat)"
      ],
      outro: "👉 Une surprise délicate qui allie musique, douceur et gourmandise."
    }
  },
  
  
  {
    id: 4,
    image: party,
    title: "💖 Package Bonheur",
    description: {
      intro: "🎉 Une explosion de bonheur et de saveurs",
      list: [
        "🎂 Gâteau d’anniversaire",
        "🎷 Saxophoniste",
        "✍️ Lecture d’un message touchant",
        "🍇 Panier garni complet (fruits, raisins, pommes, chocolat)"
      ],
      outro: "👉 Le package parfait pour transmettre joie, tendresse et affection."
    }
  },

  {
    id: 6,
    image: bouquet,
    title: "🔥 Package Inoubliable",
    description: {
      intro: "🌟 Parce que certains moments méritent d’être gravés à jamais",
      list: [
        "🎂 Gâteau d’anniversaire",
        "🎷 Saxophoniste en live",
        "✍️ Lecture personnalisée du message",
        "🍇 Panier garni de douceurs"
      ],
      outro: "👉 Un package complet pour marquer les esprits et toucher les cœurs."
    }
  },
  {
    id: 7,
    image: party3,
    title: "🌹 Package Premium",
    description: {
      intro: "👑 Une expérience élégante, romantique et mémorable",
      list: [
        "🎂 Gâteau d’anniversaire",
        "🎷 Saxophoniste",
        "✍️ Message sur mesure",
        "🍇 Panier garni gourmand",
        "🌹 Un somptueux bouquet de roses fraîches"
      ],
      outro: "👉 Un vrai coup de cœur pour une déclaration d’amour ou un moment inouï."
    }
  },



  {
    id:8,
    image :party,
    title:"👶 Package Baby Shower",
    description: {
      intro: "🍼 Une célébration tendre et joyeuse autour de l’arrivée de bébé Idéal pour fêter l’arrivée imminente d’un nouveau-né",
      list: [
        "🎈 Décoration personnalisée sur le thème de votre choix",
        "🎷 Saxophoniste",
        "🍰 Gâteau spécial baby shower (fille, garçon ou neutre)",
        "🍇 Panier garni gourmand",
        "🎁 Petits cadeaux pour les invités (souvenirs personnalisés)",
        // "📸 Mini séance photo souvenir",
      ],
      // outro: "👶 Un moment rempli de douceur, d’émotions et de complicité à partager entre proches."
    }
  }

,




  {
    id:9,
    image :suprise5,
    title:"🎉  Package Déco d’Anniversaire",
    description: {
      intro: "🎈 Une ambiance festive, colorée et inoubliable  pour petits et grands, ce package transforme chaque anniversaire en moment magique" 
,
      list: [
        "🎊 Décoration complète personnalisée (ballons, guirlandes, thème au choix",
        "🎷 Saxophoniste",
        "🍰 Gâteau d’anniversaire sur mesure",
        " 📸 Espace photo décoré pour souvenirs inoubliables",
        // "🎁 Table de cadeaux et accessoires festifs",
      ],
      // outro: "🎂 Un anniversaire clé en main qui fera briller les yeux de vos invités !"
    }
  }
,



  {
    id:10,
    image :suprise4,
    title:"💘 Package Saint-Valentin",
    description: {
      intro: "🌹 Une parenthèse romantique pour célébrer l’amourConçu pour une soirée inoubliable à deux, ce package allie tendresse, élégance et surprise " 
,
      list: [
        // "🕯️ Ambiance romantique (bougies, pétales de roses, lumière tamisée)",
        "🎷 Saxophoniste",
        "🍽️ Dîner en tête-à-tête (à domicile ou dans un lieu décoré)",
        " 💌 Message d’amour personnalisé sur carte élégante",
        "🌹 Bouquet de roses rouges",
        "📸 Mini séance photo souvenir pour immortaliser l’instant",
      ],
      // outro: "❤️ Le combo parfait pour faire battre les cœurs plus fort le 14 février (ou n’importe quel jour de l’année !)"
    }
  },


  {
    id:11,
    image :suprise3,
    title:"💍 Package Demande en Mariage",
    description: {
      intro: "✨ Une mise en scène magique pour un “oui” inoubliable Pensé pour créer l’émotion et marquer les esprits:" 
,
      list: [
        "🌅 Mise en scène romantique (lieu décoré selon vos envies : coucher de soleil, jardin, intérieur luxueux...)",
        "🎷 Saxophoniste",
        "💎 Présentation de la bague dans un écrin personnalisé",
        "💌 Carte avec message sur mesure ou lettre d’amour à lire à voix haute",
        // "📸 Photographe discret pour capturer le moment magique"
      ],
    }
  }
,



{
  id:12,
  image :livraison,
  title:"🍽️ Package Livraison Délices Maison",
  description: {
    intro: "🚚 Des saveurs faites maison livrées directement chez." ,
    list: [
      "🍹 Jus naturels 100 % frais (gingembre, ananas, bissap, cocktail détox…)",
      "🥞 Crêpes moelleuses, sucrées et salées selon vos envies",
      " 🍔 Burgers maison bien garnis avec frites croustillantes",
      "🍕 Pizzas généreuses, personnalisables (viande, végétarienne, fromage, spicy…)",
      "🥠 Croquettes croustillantes (poulet, poisson ou légumes)",
      // "🎁 Emballage soigné, livraison rapide et possibilité de petit message personnalisé."
    ],
  }
},


{
  id:13,
  image :airport,
  title:"✨ Accueil à l’aéroport – Offrez un retour au pays inoubliable ! ✨",
  description: {
    intro: "👑 Une expérience élégante,  pour célébrer le retour au pays." ,
    list: [
      "🎷 Un saxophoniste en live pour une ambiance envoûtante dès les premiers pas sur le sol natal.",
      "🌹 Un somptueux bouquet de roses fraîches pour dire « bienvenue » avec élégance et émotion.",
      // "🎁 Emballage soigné, livraison rapide et possibilité de petit message personnalisé."
    ],
  }
}




 
];
