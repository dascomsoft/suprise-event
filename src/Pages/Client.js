// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebase-config";
// import { doc, getDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import "../styles/Client.css"

// const ClientDashboard = () => {
//   const [clientData, setClientData] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isBooking, setIsBooking] = useState(false);
//   const [clientResponse, setClientResponse] = useState("");
//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const [ratings, setRatings] = useState({});
//   const [comments, setComments] = useState({});

//   const packages = ["Package Inoubliable", "Package Premium", "Package Bonheur", "Package Classique", "Package Prestige"];
//   const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
//   const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

//   const formatTime = (time) => {
//     const [hour, minute] = time.split(":");
//     const hourNum = parseInt(hour, 10);
//     const period = hourNum >= 12 ? "PM" : "AM";
//     const formattedHour = hourNum % 12 || 12;
//     return `${formattedHour}:${minute} ${period}`;
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const clientDocRef = doc(db, "clients", user.uid);
//         const clientDocSnap = await getDoc(clientDocRef);

//         if (clientDocSnap.exists()) {
//           setClientData({ id: user.uid, ...clientDocSnap.data() });

//           const bookingsQuery = query(collection(db, "bookings"), where("userId", "==", user.uid));
//           const bookingsSnapshot = await getDocs(bookingsQuery);

//           if (!bookingsSnapshot.empty) {
//             const clientBookings = bookingsSnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setBookings(clientBookings);
//           }
//         }
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const deleteBooking = async (id) => {
//     try {
//       await deleteDoc(doc(db, "bookings", id));
//       setBookings(bookings.filter((booking) => booking.id !== id));
//     } catch (error) {
//       console.error("Erreur de suppression de réservation:", error);
//     }
//   };

//   const createBooking = async (selectedPackage, selectedDay, selectedTime) => {
//     if (!clientData) return;

//     setIsBooking(true);
//     try {
//       await addDoc(collection(db, "bookings"), {
//         userId: clientData.id,
//         name: clientData.nom,
//         email: clientData.email,
//         phone: clientData.telephone,
//         package: selectedPackage,
//         selectedDay,
//         selectedTime,
//         createdAt: new Date(),
//         adminResponse: "",
//         adminName: "",
//         adminPhone: "",
//         respondedAt: null,
//         clientResponse: "",
//         clientRespondedAt: null,
//         rating: null,
//         comment: "",
//         ratedAt: null,
//       });

//       const bookingsQuery = query(collection(db, "bookings"), where("userId", "==", clientData.id));
//       const bookingsSnapshot = await getDocs(bookingsQuery);
//       const clientBookings = bookingsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setBookings(clientBookings);
//     } catch (error) {
//       console.error("Erreur de création de réservation:", error);
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   const respondToAdmin = async (bookingId) => {
//     if (!clientResponse) return;

//     try {
//       const bookingRef = doc(db, "bookings", bookingId);
//       await updateDoc(bookingRef, {
//         clientResponse,
//         clientRespondedAt: new Date(),
//       });

//       const updatedBookings = bookings.map((booking) =>
//         booking.id === bookingId ? { ...booking, clientResponse, clientRespondedAt: new Date() } : booking
//       );
//       setBookings(updatedBookings);
//       setClientResponse("");
//       setSelectedBookingId(null);
//     } catch (error) {
//       console.error("Erreur de réponse à l'admin:", error);
//     }
//   };

//   const submitRating = async (bookingId) => {
//     if (!ratings[bookingId] || ratings[bookingId] < 1 || ratings[bookingId] > 5) {
//       alert("Veuillez sélectionner une note entre 1 et 5 étoiles");
//       return;
//     }
  
//     try {
//       const booking = bookings.find(b => b.id === bookingId);
//       if (!booking) return;
  
//       const bookingRef = doc(db, "bookings", bookingId);
//       await updateDoc(bookingRef, {
//         rating: ratings[bookingId],
//         comment: comments[bookingId] || "",
//         ratedAt: new Date(),
//       });
  
//       await addDoc(collection(db, "ratings"), {
//         bookingId: bookingId,
//         userId: clientData.id,
//         userName: clientData.nom,
//         adminId: booking.adminId || "",
//         adminName: booking.adminName || "",
//         package: booking.package,
//         rating: ratings[bookingId],
//         comment: comments[bookingId] || "",
//         createdAt: new Date(),
//         isVisible: true
//       });
  
//       const updatedBookings = bookings.map((booking) =>
//         booking.id === bookingId 
//           ? { 
//               ...booking, 
//               rating: ratings[bookingId], 
//               comment: comments[bookingId] || "",
//               ratedAt: new Date() 
//             } 
//           : booking
//       );
//       setBookings(updatedBookings);
//       setComments({...comments, [bookingId]: ""});
//     } catch (error) {
//       console.error("Erreur d'envoi de l'évaluation:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (!clientData) return <p>Vous devez être connecté en tant que client.</p>;

//   return (
//     <div className="client-dashboard">
//       <div className="dashboard-container">
//         <div className="header">
//           <h1>Bonjour, {clientData?.nom}!</h1>
//           <p className="welcome-message">Bienvenue dans votre espace client.</p>
//         </div>

//         <div className="dashboard-content">
//           <div className="booking-form">
//             <h2>Réserver un package</h2>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               const formData = new FormData(e.target);
//               const selectedPackage = formData.get("package");
//               const selectedDay = formData.get("selectedDay");
//               const selectedTime = formData.get("selectedTime");
//               if (selectedPackage && selectedDay && selectedTime) {
//                 createBooking(selectedPackage, selectedDay, selectedTime);
//               }
//             }}>
//               <div className="form-group">
//                 <label>Package:</label>
//                 <select name="package" required>
//                   <option value="">Sélectionnez un package</option>
//                   {packages.map((pkg) => (
//                     <option key={pkg} value={pkg}>{pkg}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Jour:</label>
//                 <select name="selectedDay" required>
//                   <option value="">Sélectionnez un jour</option>
//                   {daysOfWeek.map((day) => (
//                     <option key={day} value={day}>{day}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Heure:</label>
//                 <select name="selectedTime" required>
//                   <option value="">Sélectionnez une heure</option>
//                   {timeSlots.map((time) => (
//                     <option key={time} value={time}>{formatTime(time)}</option>
//                   ))}
//                 </select>
//               </div>

//               <button type="submit" disabled={isBooking}>
//                 {isBooking ? "En cours..." : "Réserver"}
//               </button>
//             </form>
//           </div>

//           <div className="bookings-list">
//             <h2>Mes Réservations</h2>
//             {bookings.length === 0 ? (
//               <p>Aucune réservation trouvée.</p>
//             ) : (
//               <div className="bookings">
//                 {bookings.map((booking) => (
//                   <div key={booking.id} className="booking-card">
//                     <div className="booking-info">
//                       <h3>{booking.package}</h3>
//                       <p>{booking.selectedDay} à {formatTime(booking.selectedTime)}</p>
                      
//                       {booking.adminResponse && (
//                         <div className="admin-response">
//                           <p><strong>Réponse de l'admin:</strong> {booking.adminResponse}</p>
//                           {booking.adminName && (
//                             <p><strong>Admin:</strong> {booking.adminName} ({booking.adminPhone})</p>
//                           )}
//                         </div>
//                       )}
                      
//                       {booking.clientResponse && (
//                         <div className="client-response">
//                           <p><strong>Votre réponse:</strong> {booking.clientResponse}</p>
//                         </div>
//                       )}
                      
//                       {booking.adminResponse && !booking.clientResponse && (
//                         <div className="response-form">
//                           <textarea
//                             value={clientResponse}
//                             onChange={(e) => setClientResponse(e.target.value)}
//                             placeholder="Votre réponse..."
//                             rows={3}
//                           />
//                           <button onClick={() => respondToAdmin(booking.id)}>
//                             Envoyer
//                           </button>
//                         </div>
//                       )}
                      
//                       {(!booking.rating || !booking.ratedAt) ? (
//                         <div className="rating-form">
//                           <h4>Évaluer cette réservation</h4>
//                           <div className="stars">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span 
//                                 key={star}
//                                 onClick={() => setRatings({...ratings, [booking.id]: star})}
//                               >
//                                 {(ratings[booking.id] || 0) >= star ? '★' : '☆'}
//                               </span>
//                             ))}
//                           </div>
//                           <textarea
//                             value={comments[booking.id] || ""}
//                             onChange={(e) => setComments({...comments, [booking.id]: e.target.value})}
//                             placeholder="Votre commentaire (optionnel)..."
//                             rows={2}
//                           />
//                           <button onClick={() => submitRating(booking.id)}>
//                             Soumettre l'évaluation
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="rating-display">
//                           <h4>Votre évaluation</h4>
//                           <div className="stars">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span key={star} className={booking.rating >= star ? 'filled' : ''}>
//                                 ★
//                               </span>
//                             ))}
//                           </div>
//                           {booking.comment && (
//                             <p className="comment">"{booking.comment}"</p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     <button 
//                       onClick={() => deleteBooking(booking.id)}
//                       className="delete-btn"
//                     >
//                       Supprimer
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;












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
import "../styles/Client.css"

const ClientDashboard = () => {
  const [clientData, setClientData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [clientResponse, setClientResponse] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

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

          const bookingsQuery = query(collection(db, "bookings"), where("userId", "==", user.uid));
          const bookingsSnapshot = await getDocs(bookingsQuery);

          if (!bookingsSnapshot.empty) {
            const clientBookings = bookingsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setBookings(clientBookings);
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
      setComments({...comments, [bookingId]: ""});
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
          <div className="booking-form">
            <h2>Réserver un package</h2>
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
                              <span
                                key={star}
                                onClick={() =>
                                  setRatings({ ...ratings, [booking.id]: star })
                                }
                              >
                                {(ratings[booking.id] || 0) >= star ? "★" : "☆"}
                              </span>
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
                              <span key={star}>
                                {(booking.rating || 0) >= star ? "★" : "☆"}
                              </span>
                            ))}
                          </div>
                          {booking.comment && <p>{booking.comment}</p>}
                        </div>
                      )}

                      <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>
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
