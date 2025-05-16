import { useState, useEffect, useRef } from 'react';
import React from 'react';
import '../styles/EventBot.css';

const EventBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasWelcomed, setHasWelcomed] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const knowledgeBase = {
        greetings: [
            "Bonjour! 👋 Je suis EventBot, l'assistant virtuel de Drindsud Surprise Event. Comment puis-je vous aider à organiser votre événement?",
            "Salut! 😊 Prêt à créer un moment magique? Dites-moi ce que vous souhaitez organiser!",
            "Bienvenue chez Drindsud! 🎉 Je peux vous renseigner sur nos services, packages et idées de surprises."
        ],
        services: {
            list: "Nos services premium:\n\n🎷 Instrumentistes (saxo, piano, etc.)\n🎁 Surprises personnalisées\n🎹 Piano/Bar live\n🥘 Service traiteur haut de gamme\n🔊 Sonorisation professionnelle\n💸 Bouquets d'argent créatifs\n🚚 Livraisons surprises\n🎤 Maîtres de cérémonie expérimentés",
            details: "Chaque service est:\n\n• 100% personnalisable\n• Avec options premium\n• Géré par des professionnels\n• Disponible dans tout Yaoundé",
            booking: "Pour réserver un service:\n\n1. Choisissez votre package\n2. Contactez-nous au 699 377 664\n3. Nous créons une offre sur mesure\n4. Validation et paiement\n5. Nous gérons tout pour vous!"
        },
        packages: {
            list: "Nos packages populaires:\n\n💝 Package Bonheur (basique)\n🎀 Package Classique (standard)\n✨ Package Prestige (luxe)\n💎 Package Premium (VIP)\n🌠 Package Inoubliable (sur-mesure)",
            bonheur: "Package Bonheur (à partir de 50.000 FCFA):\n\n• Décoration simple\n• Petit gâteau\n• 30min de musique\n• 1 élément surprise",
            classique: "Package Classique (à partir de 100.000 FCFA):\n\n• Décoration complète\n• Gâteau moyen\n• 1h de musique live\n• 2 éléments surprises\n• Photos souvenirs",
            prestige: "Package Prestige (à partir de 200.000 FCFA):\n\n• Décoration luxe\n• Grand gâteau personnalisé\n• 2h de musique live (saxo/piano)\n• 3 éléments surprises\n• Album photo\n• Vidéo courte",
            premium: "Package Premium (sur devis):\n\n• Tout le Prestige +\n• Traiteur premium\n• Maître de cérémonie\n• Équipe dédiée\n• Cadeaux exclusifs",
            custom: "Package 100% sur-mesure:\n\nDites-nous votre rêve et nous le réalisons! Contactez-nous directement pour discuter de votre projet exceptionnel."
        },
        occasions: {
            list: "Occasions que nous couvrons:\n\n💍 Demandes en mariage\n🎂 Anniversaires\n👶 Baby showers\n🎓 Remises de diplômes\n💃 Soirées d'entreprise\n🎄 Événements festifs\n💐 Célébrations intimes\n... et bien plus!",
            marriage: "Demande en mariage:\n\n• Scénario personnalisé\n• Décoration romantique\n• Musique live\n• Photographe discret\n• Option vidéo\n• Fleurs et champagne",
            birthday: "Anniversaire surprise:\n\n• Thème au choix\n• Décoration complète\n• Animation musicale\n• Gâteau personnalisé\n• Livraison surprise\n• Option traiteur"
        },
        contact: {
            details: "📞 Contactez-nous:\n\nTél: 699 377 664\n📧 Email: wambolecourant@yahoo.fr\n📍 Adresse: 155 Charles Antagana St, Yaoundé\n\nDisponible 7j/7 sur rendez-vous",
            hours: "⏰ Heures de contact:\n\nLundi-Dimanche: 8h-21h\nUrgences: 24h/24 (avec supplément)"
        },
        about: "Drindsud Surprise Event:\n\n🌟 Spécialistes en événements mémorables\n🎯 Depuis 2023 à Yaoundé\n💎 Équipe de passionnés\n✨ 100+ événements réalisés\n😊 Satisfaction client: 98%",
        default: "Je n'ai pas bien compris. Voici ce que je peux vous expliquer:\n\n1️⃣ Nos services\n2️⃣ Nos packages\n3️⃣ Idées pour occasions spéciales\n4️⃣ Contact et réservations\n5️⃣ À propos de nous\n\nDites-moi ce qui vous intéresse!"
    };

    const getAutoResponse = (message) => {
        const lowerMsg = message.toLowerCase();

        if (/bonjour|salut|hello|hi|coucou|hey|bjr|slt/.test(lowerMsg)) {
            return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
        }

        if (/service|prestation|offre|proposition/.test(lowerMsg)) {
            if (/music|saxo|piano|instrument/.test(lowerMsg)) return "🎷 Musique live:\n" + knowledgeBase.services.list.split("\n")[1] + "\n\n" + knowledgeBase.services.details;
            if (/traiteur|nourriture|repas|manger/.test(lowerMsg)) return "🥘 Service traiteur:\n" + knowledgeBase.services.list.split("\n")[4] + "\n\n" + knowledgeBase.services.details;
            if (/sono|sonorisation|micro/.test(lowerMsg)) return "🔊 Sonorisation:\n" + knowledgeBase.services.list.split("\n")[5] + "\n\n" + knowledgeBase.services.details;
            if (/livraison|delivery|surprise/.test(lowerMsg)) return "🚚 Livraison surprise:\n" + knowledgeBase.services.list.split("\n")[7] + "\n\n" + knowledgeBase.services.details;
            return "Nos services:\n" + knowledgeBase.services.list + "\n\n" + knowledgeBase.services.details;
        }

        if (/package|formule|tarif|prix|combien|coute/.test(lowerMsg)) {
            if (/bonheur|basique|entrée de gamme/.test(lowerMsg)) return knowledgeBase.packages.bonheur;
            if (/classique|standard|moyen/.test(lowerMsg)) return knowledgeBase.packages.classique;
            if (/prestige|luxe/.test(lowerMsg)) return knowledgeBase.packages.prestige;
            if (/premium|vip|haut de gamme/.test(lowerMsg)) return knowledgeBase.packages.premium;
            if (/sur-mesure|personnalisé|custom/.test(lowerMsg)) return knowledgeBase.packages.custom;
            return "Nos packages:\n" + knowledgeBase.packages.list + "\n\nDites-moi lequel vous intéresse!";
        }

        if (/occasion|événement|evenement|fête|fete|surprise|célébration/.test(lowerMsg)) {
            if (/mariage|proposition|fiançailles/.test(lowerMsg)) return knowledgeBase.occasions.marriage;
            if (/anniv|anniversaire|birthday/.test(lowerMsg)) return knowledgeBase.occasions.birthday;
            if (/baby|shower|naissance/.test(lowerMsg)) return "👶 Baby shower:\n\n• Décoration thématique\n• Jeux personnalisés\n• Gâteau spécial\n• Animation\n• Cadeaux créatifs";
            return "Idées d'occasions:\n" + knowledgeBase.occasions.list + "\n\nPour quelle occasion souhaitez-vous organiser un événement?";
        }

        if (/contact|adresse|email|mail|téléphone|appeler|visiter|où|ou|localiser/.test(lowerMsg)) {
            return knowledgeBase.contact.details + "\n\n" + knowledgeBase.contact.hours;
        }

        if (/qui êtes-vous|à propos|drindsud|mission|valeurs|équipe/.test(lowerMsg)) {
            return knowledgeBase.about;
        }

        if (/réserver|reserver|disponibilité|disponibilite|booking|reservation/.test(lowerMsg)) {
            return "📅 Réservations:\n\n" + knowledgeBase.services.booking + "\n\n" + knowledgeBase.contact.details;
        }

        return knowledgeBase.default;
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        setTimeout(() => {
            const botResponse = { text: getAutoResponse(inputValue), sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);
        }, 800);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (!hasWelcomed && isOpen) {
            const welcomeMessage = {
                text: knowledgeBase.greetings[0],
                sender: 'bot'
            };
            setMessages([welcomeMessage]);
            setHasWelcomed(true);
        }
    }, [isOpen, hasWelcomed]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="eventbot-container">
            {/* Bouton flottant */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="eventbot-toggle-button"
                    aria-label="Ouvrir le chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="eventbot-toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            )}

            {/* Popup du chatbot */}
            {isOpen && (
                <div className="eventbot-popup">
                    {/* Header */}
                    <div className="eventbot-header">
                        <div className="eventbot-header-content">
                            <svg className="eventbot-header-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <h3 className="eventbot-title">EventBot Drindsud</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="eventbot-close-button"
                        >
                            ×
                        </button>
                    </div>

                    {/* Zone de messages */}
                    <div className="eventbot-messages-container">
                        {messages.length === 0 ? (
                            <div className="eventbot-empty-message">
                                Dites-moi ce que vous souhaitez organiser!
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`eventbot-message ${msg.sender === 'user' ? 'eventbot-user-message' : 'eventbot-bot-message'}`}
                                >
                                    {msg.text.split('\n').map((line, i) => (
                                        <p key={i} className="eventbot-message-text">{line}</p>
                                    ))}
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Zone de saisie */}
                    <div className="eventbot-input-area">
                        <div className="eventbot-input-container">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tapez votre message..."
                                className="eventbot-input-field"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="eventbot-send-button"
                                disabled={!inputValue.trim()}
                            >
                                Envoyer
                            </button>
                        </div>
                        <p className="eventbot-help-text">
                            Posez-moi des questions sur nos services et événements
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventBot;