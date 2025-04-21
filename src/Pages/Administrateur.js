



import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import {
  doc, getDoc, collection, query, getDocs, deleteDoc, updateDoc, orderBy
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/Administrateur.css";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [response, setResponse] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [message, setMessage] = useState(""); // ✅ message de succès/erreur

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
        const adminDocRef = doc(db, "administrateurs", user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          setAdminData({ id: user.uid, ...adminDocSnap.data() });

          const bookingsSnapshot = await getDocs(collection(db, "bookings"));
          const allBookings = bookingsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBookings(allBookings);

          const reviewsQuery = query(
            collection(db, "ratings"),
            orderBy("createdAt", "desc")
          );
          const reviewsSnapshot = await getDocs(reviewsQuery);
          const reviewsData = reviewsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
          }));
          setReviews(reviewsData);
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
      console.error("Error deleting booking:", error);
    }
  };

  const respondToBooking = async (bookingId, responseText) => {
    if (!adminData) {
      setMessage("⚠️ Admin data not found.");
      return;
    }

    if (!responseText.trim()) {
      setMessage("⚠️ Please enter a response before sending.");
      return;
    }

    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        adminResponse: responseText,
        // adminName: adminData.name || "Admin",
        adminPhone: adminData.phone || "",
        respondedAt: new Date(),
      });

      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              adminResponse: responseText,
              // adminName: adminData.name,
              adminPhone: adminData.phone,
            }
          : booking
      );
      setBookings(updatedBookings);
      setResponse("");
      setSelectedBooking(null);
      setMessage("✅ Response sent successfully.");
    } catch (error) {
      console.error("Error responding to booking:", error);
      setMessage("❌ Failed to send response. Please check your Firestore rules.");
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!adminData) return <p>You must be logged in as an administrator.</p>;

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="admin-dashboard">
        <div className="dashboard-container">
          <div className="admin-header">
            <h1>Hello, {adminData?.name}!</h1>
            <div className="admin-rating">
              <span>Average Rating: {averageRating.toFixed(1)}/5</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= Math.round(averageRating) ? 'filled' : ''}>★</span>
                ))}
              </div>
            </div>
            <p className="admin-contact">
              Contact: {adminData.phone} | {adminData.email}
            </p>
          </div>

          <div className="admin-nav">
            <button onClick={() => setShowReviews(false)} className={!showReviews ? 'active' : ''}>
              Reservations
            </button>
            <button onClick={() => setShowReviews(true)} className={showReviews ? 'active' : ''}>
              Revues ({reviews.length})
            </button>
          </div>

          {!showReviews && (
            <div className="bookings-section">
              <h2>Reservations Des Clients</h2>
              {bookings.length === 0 ? (
                <p>No bookings found.</p>
              ) : (
                <div className="bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-info">
                        <h3>{booking.gymClass || booking.package}</h3>
                        <p>{booking.selectedDay} at {formatTime(booking.selectedTime)}</p>
                        <p>User: {booking.name} | {booking.phone} | {booking.email}</p>
                        {booking.adminResponse && (
                          <p className="admin-response"><strong>Your response:</strong> {booking.adminResponse}</p>
                        )}
                      </div>
                      <div className="booking-actions">
                        <button onClick={() => setSelectedBooking(booking)}>Respond</button>
                        <button onClick={() => deleteBooking(booking.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {showReviews && (
            <div className="reviews-section">
              <h2>⭐ Appreciations Des Clients</h2>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <div className="reviews-list">
                  {reviews.map((review) => {
                    const relatedBooking = bookings.find(b => b.id === review.bookingId);
                    return (
                      <div key={review.id} className="review-card">
                        <div className="review-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= review.rating ? 'filled' : ''}>★</span>
                          ))}
                        </div>
                        <p className="review-comment">{review.comment}</p>
                        <p className="review-meta">
                          - {review.userName} • {review.createdAt?.toLocaleDateString()}
                          {relatedBooking && ` • ${relatedBooking.gymClass || relatedBooking.package}`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {selectedBooking && !showReviews && (
            <div className="response-form">
              <h3>Respond to {selectedBooking.name}</h3>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
                rows={4}
              />
              <div className="form-actions">
                <button onClick={() => respondToBooking(selectedBooking.id, response)}>Send Response</button>
                <button onClick={() => setSelectedBooking(null)}>Cancel</button>
              </div>
              {message && <p className="form-message">{message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;









