


import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import "../styles/Client.css";

const ClientDashboard = () => {
  const [clientData, setClientData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [customPackages, setCustomPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [clientResponse, setClientResponse] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  // État pour la personnalisation de package
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customPackageName, setCustomPackageName] = useState("");
  const [customPackageDescription, setCustomPackageDescription] = useState("");
  const [customPackageElements, setCustomPackageElements] = useState("");
  const [customPackageBudget, setCustomPackageBudget] = useState("");
  const [customPackageDate, setCustomPackageDate] = useState("");
  const [customPackageTime, setCustomPackageTime] = useState("");
  const [customPackageLocation, setCustomPackageLocation] = useState("");
  const [isSubmittingCustom, setIsSubmittingCustom] = useState(false);

  const packages = ["Package Inoubliable", "Package Premium", "Package Bonheur", "Package Classique", "Package Prestige"];
  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const clientDocRef = doc(db, "clients", user.uid);
        const clientDocSnap = await getDoc(clientDocRef);

        if (clientDocSnap.exists()) {
          setClientData({ id: user.uid, ...clientDocSnap.data() });

          // Charger les réservations
          const bookingsQuery = query(collection(db, "bookings"), where("userId", "==", user.uid));
          const bookingsSnapshot = await getDocs(bookingsQuery);

          if (!bookingsSnapshot.empty) {
            const clientBookings = bookingsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setBookings(clientBookings);
          }

          // Charger les packages personnalisés
          const customPackagesQuery = query(collection(db, "customPackages"), where("userId", "==", user.uid));
          const customPackagesSnapshot = await getDocs(customPackagesQuery);

          if (!customPackagesSnapshot.empty) {
            const clientCustomPackages = customPackagesSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setCustomPackages(clientCustomPackages);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error("Erreur de suppression de réservation:", error);
    }
  };

  const createBooking = async (selectedPackage, selectedDay, selectedTime) => {
    if (!clientData) return;

    setIsBooking(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: clientData.id,
        name: clientData.nom,
        email: clientData.email,
        phone: clientData.telephone,
        package: selectedPackage,
        selectedDay,
        selectedTime,
        createdAt: new Date(),
        adminResponse: "",
        adminName: "",
        adminPhone: "",
        respondedAt: null,
        clientResponse: "",
        clientRespondedAt: null,
        rating: null,
        comment: "",
        ratedAt: null,
      });

      const bookingsQuery = query(collection(db, "bookings"), where("userId", "==", clientData.id));
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const clientBookings = bookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(clientBookings);
    } catch (error) {
      console.error("Erreur de création de réservation:", error);
    } finally {
      setIsBooking(false);
    }
  };

  const submitCustomPackage = async () => {
    if (!clientData) {
      alert("Vous devez être connecté pour soumettre un package personnalisé");
      return;
    }

    if (!customPackageName || !customPackageDescription || !customPackageElements) {
      alert("Veuillez remplir tous les champs obligatoires (Nom, Description, Éléments)");
      return;
    }

    setIsSubmittingCustom(true);
    try {
      const customPackageData = {
        userId: clientData.id,
        clientName: clientData.nom,
        clientEmail: clientData.email,
        clientPhone: clientData.telephone,
        packageName: customPackageName,
        packageDescription: customPackageDescription,
        packageElements: customPackageElements,
        budget: customPackageBudget || "Non spécifié",
        preferredDate: customPackageDate || "Non spécifié",
        preferredTime: customPackageTime || "Non spécifié",
        location: customPackageLocation || "Non spécifié",
        status: "pending", // pending, approved, rejected, priced
        adminPrice: "",
        adminResponse: "",
        adminName: "",
        adminPhone: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, "customPackages"), customPackageData);

      // Recharger les packages personnalisés
      const customPackagesQuery = query(collection(db, "customPackages"), where("userId", "==", clientData.id));
      const customPackagesSnapshot = await getDocs(customPackagesQuery);
      const clientCustomPackages = customPackagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomPackages(clientCustomPackages);

      // Réinitialiser le formulaire
      setCustomPackageName("");
      setCustomPackageDescription("");
      setCustomPackageElements("");
      setCustomPackageBudget("");
      setCustomPackageDate("");
      setCustomPackageTime("");
      setCustomPackageLocation("");
      setIsCustomizing(false);

      alert("Votre package personnalisé a été soumis avec succès ! L'administrateur vous répondra bientôt.");
    } catch (error) {
      console.error("Erreur de soumission du package personnalisé:", error);
      alert("Une erreur est survenue lors de la soumission. Veuillez réessayer.");
    } finally {
      setIsSubmittingCustom(false);
    }
  };

  const respondToAdmin = async (bookingId) => {
    if (!clientResponse) return;

    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        clientResponse,
        clientRespondedAt: new Date(),
      });

      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, clientResponse, clientRespondedAt: new Date() } : booking
      );
      setBookings(updatedBookings);
      setClientResponse("");
      setSelectedBookingId(null);
    } catch (error) {
      console.error("Erreur de réponse à l'admin:", error);
    }
  };

  const submitRating = async (bookingId) => {
    if (!ratings[bookingId] || ratings[bookingId] < 1 || ratings[bookingId] > 5) {
      alert("Veuillez sélectionner une note entre 1 et 5 étoiles");
      return;
    }

    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        rating: ratings[bookingId],
        comment: comments[bookingId] || "",
        ratedAt: new Date(),
      });

      await addDoc(collection(db, "ratings"), {
        bookingId: bookingId,
        userId: clientData.id,
        userName: clientData.nom,
        adminId: booking.adminId || "",
        adminName: booking.adminName || "",
        package: booking.package,
        rating: ratings[bookingId],
        comment: comments[bookingId] || "",
        createdAt: new Date(),
        isVisible: true
      });

      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId
          ? {
            ...booking,
            rating: ratings[bookingId],
            comment: comments[bookingId] || "",
            ratedAt: new Date()
          }
          : booking
      );
      setBookings(updatedBookings);
      setComments({ ...comments, [bookingId]: "" });
    } catch (error) {
      console.error("Erreur d'envoi de l'évaluation:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!clientData) return <p>Vous devez être connecté en tant que client.</p>;

  return (
    <div className="client-dashboard">
      <div className="dashboard-container">
        <div className="header">
          <h1>Bonjour, {clientData?.nom}!</h1>
          <p className="welcome-message">Bienvenue dans votre espace client.</p>
        </div>

        <div className="dashboard-content">
          {/* Section Package Personnalisé */}
          <div className="custom-package-section">
            <div className="section-header">
              <h2>✨ Créer votre Package Personnalisé</h2>
              <p>Vous avez une idée unique ? Créez votre propre package sur mesure !</p>
              {!isCustomizing ? (
                <button 
                  className="btn-customize" 
                  onClick={() => setIsCustomizing(true)}
                >
                  + Créer un Package Personnalisé
                </button>
              ) : (
                <button 
                  className="btn-cancel" 
                  onClick={() => setIsCustomizing(false)}
                >
                  Annuler
                </button>
              )}
            </div>

            {isCustomizing && (
              <div className="custom-package-form">
                <h3>Formulaire de Personnalisation</h3>
                <div className="form-group">
                  <label>Nom de votre package *</label>
                  <input
                    type="text"
                    value={customPackageName}
                    onChange={(e) => setCustomPackageName(e.target.value)}
                    placeholder="Ex: Package Anniversaire Surprise Romantique"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description détaillée *</label>
                  <textarea
                    value={customPackageDescription}
                    onChange={(e) => setCustomPackageDescription(e.target.value)}
                    placeholder="Décrivez votre idée, l'occasion, l'ambiance souhaitée..."
                    rows={3}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Éléments souhaités *</label>
                  <textarea
                    value={customPackageElements}
                    onChange={(e) => setCustomPackageElements(e.target.value)}
                    placeholder="Listez les éléments que vous souhaitez inclure (ex: saxophoniste, gâteau, décoration, bouquet, etc.)"
                    rows={3}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Budget approximatif</label>
                    <input
                      type="text"
                      value={customPackageBudget}
                      onChange={(e) => setCustomPackageBudget(e.target.value)}
                      placeholder="Ex: 200-300€"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date souhaitée</label>
                    <input
                      type="date"
                      value={customPackageDate}
                      onChange={(e) => setCustomPackageDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Heure souhaitée</label>
                    <input
                      type="time"
                      value={customPackageTime}
                      onChange={(e) => setCustomPackageTime(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Lieu</label>
                    <input
                      type="text"
                      value={customPackageLocation}
                      onChange={(e) => setCustomPackageLocation(e.target.value)}
                      placeholder="Adresse ou ville"
                    />
                  </div>
                </div>

                <button 
                  className="btn-submit-custom" 
                  onClick={submitCustomPackage}
                  disabled={isSubmittingCustom}
                >
                  {isSubmittingCustom ? "Envoi en cours..." : "Soumettre mon Package"}
                </button>

                <p className="form-note">
                  * Champs obligatoires. Notre équipe vous contactera avec un devis personnalisé.
                </p>
              </div>
            )}

            {/* Liste des packages personnalisés soumis */}
            {customPackages.length > 0 && (
              <div className="custom-packages-list">
                <h3>Mes Packages Personnalisés Soumis</h3>
                <div className="packages-grid">
                  {customPackages.map((pkg) => (
                    <div key={pkg.id} className={`custom-package-card status-${pkg.status}`}>
                      <div className="package-header">
                        <h4>{pkg.packageName}</h4>
                        <span className={`status-badge ${pkg.status}`}>
                          {pkg.status === "pending" && "⏳ En attente"}
                          {pkg.status === "approved" && "✅ Approuvé"}
                          {pkg.status === "rejected" && "❌ Refusé"}
                          {pkg.status === "priced" && "💰 Prix proposé"}
                        </span>
                      </div>
                      
                      <div className="package-details">
                        <p><strong>Description:</strong> {pkg.packageDescription}</p>
                        <p><strong>Éléments:</strong> {pkg.packageElements}</p>
                        <p><strong>Budget:</strong> {pkg.budget}</p>
                        <p><strong>Date:</strong> {pkg.preferredDate}</p>
                        <p><strong>Heure:</strong> {pkg.preferredTime}</p>
                        <p><strong>Lieu:</strong> {pkg.location}</p>
                        <p><strong>Soumis le:</strong> {new Date(pkg.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                      </div>

                      {pkg.adminResponse && (
                        <div className="admin-response">
                          <h5>📩 Réponse de l'administrateur:</h5>
                          <p>{pkg.adminResponse}</p>
                          {pkg.adminPrice && (
                            <p className="price-offer">
                              <strong>💰 Prix proposé:</strong> {pkg.adminPrice}
                            </p>
                          )}
                          {pkg.adminName && (
                            <p><strong>Contact admin:</strong> {pkg.adminName} ({pkg.adminPhone})</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section Réservation standard */}
          <div className="booking-form">
            <h2>Réserver un package standard</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const selectedPackage = formData.get("package");
              const selectedDay = formData.get("selectedDay");
              const selectedTime = formData.get("selectedTime");
              if (selectedPackage && selectedDay && selectedTime) {
                createBooking(selectedPackage, selectedDay, selectedTime);
              }
            }}>
              <div className="form-group">
                <label>Package:</label>
                <select name="package" required>
                  <option value="">Sélectionnez un package</option>
                  {packages.map((pkg) => (
                    <option key={pkg} value={pkg}>{pkg}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Jour:</label>
                <select name="selectedDay" required>
                  <option value="">Sélectionnez un jour</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Heure:</label>
                <select name="selectedTime" required>
                  <option value="">Sélectionnez une heure</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{formatTime(time)}</option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={isBooking}>
                {isBooking ? "En cours..." : "Réserver"}
              </button>
            </form>
          </div>

          {/* Section Mes Réservations */}
          <div className="bookings-list">
            <h2>Mes Réservations</h2>
            {bookings.length === 0 ? (
              <p>Aucune réservation trouvée.</p>
            ) : (
              <div className="bookings">
                {bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-info">
                      <h3>{booking.package}</h3>
                      <p>{booking.selectedDay} à {formatTime(booking.selectedTime)}</p>

                      {booking.adminResponse && (
                        <div className="admin-response">
                          <p><strong>Réponse de l'admin:</strong> {booking.adminResponse}</p>
                          {booking.adminName && (
                            <p><strong>Admin:</strong> {booking.adminName} ({booking.adminPhone})</p>
                          )}
                        </div>
                      )}

                      {booking.clientResponse && (
                        <div className="client-response">
                          <p><strong>Votre réponse:</strong> {booking.clientResponse}</p>
                        </div>
                      )}

                      {booking.adminResponse && !booking.clientResponse && (
                        <div className="response-form">
                          <textarea
                            value={clientResponse}
                            onChange={(e) => setClientResponse(e.target.value)}
                            placeholder="Votre réponse..."
                            rows={3}
                          />
                          <button onClick={() => respondToAdmin(booking.id)}>
                            Envoyer
                          </button>
                        </div>
                      )}

                      {(!booking.rating || !booking.ratedAt) ? (
                        <div className="rating-form">
                          <h4>Évaluer cette réservation</h4>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                onClick={() =>
                                  setRatings({ ...ratings, [booking.id]: star })
                                }
                                className={`star ${(ratings[booking.id] || 0) >= star ? "selected" : ""}`}
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M12 .587l3.668 7.57L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.591z"
                                  fill="currentColor"
                                />
                              </svg>
                            ))}
                          </div>
                          <textarea
                            value={comments[booking.id] || ""}
                            onChange={(e) =>
                              setComments({ ...comments, [booking.id]: e.target.value })
                            }
                            placeholder="Votre commentaire (optionnel)..."
                            rows={2}
                          />
                          <button onClick={() => submitRating(booking.id)}>
                            Soumettre l'évaluation
                          </button>
                        </div>
                      ) : (
                        <div className="rating-display">
                          <h4>Votre évaluation</h4>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`star ${(booking.rating || 0) >= star ? "selected" : ""}`}
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M12 .587l3.668 7.57L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.591z"
                                  fill="currentColor"
                                />
                              </svg>
                            ))}
                          </div>
                          {booking.comment && <p>{booking.comment}</p>}
                        </div>
                      )}

                      <button className="delete-btn mt-3" onClick={() => deleteBooking(booking.id)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
