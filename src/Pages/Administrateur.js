




import React, { useEffect, useState } from "react";
import { auth, db, secondaryAuth } from "../firebase-config";
import {
  doc, getDoc, collection, query, getDocs, deleteDoc, updateDoc, orderBy, where,
  setDoc
} from "firebase/firestore";
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Administrateur.css";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [customPackages, setCustomPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedCustomPackage, setSelectedCustomPackage] = useState(null);
  const [response, setResponse] = useState("");
  const [adminPrice, setAdminPrice] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminName, setAdminName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showCustomPackages, setShowCustomPackages] = useState(false);
  const [showAdminManagement, setShowAdminManagement] = useState(false);
  const [message, setMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // États pour la gestion des administrateurs
  const [adminsList, setAdminsList] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: ""
  });
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  const formatTime = (time) => {
    if (!time) return "Non spécifié";
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
          const data = adminDocSnap.data();
          setAdminData({ id: user.uid, ...data });
          setAdminName(data.name || "");
          setAdminPhone(data.phone || "");

          // Vérifier si c'est un superAdmin
          const isSuperAdmin = data.email === "superadmin@event.com" || data.role === "superadmin";
          setIsSuperAdmin(isSuperAdmin);

          // Charger les réservations
          const bookingsSnapshot = await getDocs(collection(db, "bookings"));
          const allBookings = bookingsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBookings(allBookings);

          // Charger les packages personnalisés
          const customPackagesQuery = query(collection(db, "customPackages"), orderBy("createdAt", "desc"));
          const customPackagesSnapshot = await getDocs(customPackagesQuery);
          const allCustomPackages = customPackagesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt?.seconds * 1000),
          }));
          setCustomPackages(allCustomPackages);

          // Charger les avis
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

          // Charger la liste des administrateurs si c'est un superAdmin
          if (isSuperAdmin) {
            const adminsQuery = query(collection(db, "administrateurs"));
            const adminsSnapshot = await getDocs(adminsQuery);
            const adminsData = adminsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAdminsList(adminsData);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fonction pour créer un nouvel administrateur
  const createNewAdmin = async () => {
    if (!isSuperAdmin) {
      setMessage("❌ Seul le superAdmin peut créer des administrateurs.");
      return;
    }

    const { nom, prenom, email, telephone, password } = newAdminData;

    // Validation des champs
    if (!nom.trim() || !prenom.trim() || !email.trim() || !telephone.trim() || !password.trim()) {
      setMessage("❌ Tous les champs sont obligatoires.");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("❌ Format d'email invalide.");
      return;
    }

    setIsCreatingAdmin(true);
    try {
      // Utiliser secondaryAuth pour créer l'utilisateur sans affecter la session actuelle
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const newUserId = userCredential.user.uid;

      // Créer le document dans Firestore
      await setDoc(doc(db, "administrateurs", newUserId), {
        nom,
        prenom,
        email,
        telephone,
        role: "admin",
        createdAt: new Date(),
        createdBy: adminData.email,
      });

      // Mettre à jour la liste des administrateurs
      const adminsQuery = query(collection(db, "administrateurs"));
      const adminsSnapshot = await getDocs(adminsQuery);
      const adminsData = adminsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdminsList(adminsData);

      // Réinitialiser le formulaire
      setNewAdminData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        password: ""
      });

      setMessage("✅ Administrateur créé avec succès !");
      
      // Afficher un message temporaire de succès
      setTimeout(() => {
        if (message.includes("✅")) setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la création de l'administrateur:", error);
      if (error.code === 'auth/email-already-in-use') {
        setMessage("❌ Cet email est déjà utilisé.");
      } else if (error.code === 'auth/invalid-email') {
        setMessage("❌ Format d'email invalide.");
      } else if (error.code === 'auth/weak-password') {
        setMessage("❌ Mot de passe trop faible. Utilisez au moins 6 caractères.");
      } else if (error.code === 'auth/operation-not-allowed') {
        setMessage("❌ La création de comptes par email/mot de passe n'est pas activée.");
      } else {
        setMessage(`❌ Erreur: ${error.message}`);
      }
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  // Fonction pour supprimer un administrateur
  const deleteAdmin = async (adminId, adminEmail) => {
    if (!isSuperAdmin) {
      setMessage("❌ Seul le superAdmin peut supprimer des administrateurs.");
      return;
    }

    // Empêcher la suppression du superAdmin
    if (adminEmail === "superadmin@event.com") {
      setMessage("❌ Vous ne pouvez pas supprimer le superAdmin.");
      return;
    }

    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ? Cette action est irréversible.")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "administrateurs", adminId));
      
      // Mettre à jour la liste locale
      setAdminsList(adminsList.filter(admin => admin.id !== adminId));
      setMessage("✅ Administrateur supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'administrateur:", error);
      setMessage("❌ Erreur lors de la suppression.");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings(bookings.filter((booking) => booking.id !== id));
      setMessage("✅ Réservation supprimée avec succès.");
    } catch (error) {
      console.error("Error deleting booking:", error);
      setMessage("❌ Erreur lors de la suppression.");
    }
  };

  const deleteCustomPackage = async (id) => {
    try {
      await deleteDoc(doc(db, "customPackages", id));
      setCustomPackages(customPackages.filter((pkg) => pkg.id !== id));
      setMessage("✅ Package personnalisé supprimé avec succès.");
    } catch (error) {
      console.error("Error deleting custom package:", error);
      setMessage("❌ Erreur lors de la suppression.");
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
        adminPhone: adminPhone,
        respondedAt: new Date(),
      });

      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId
          ? {
            ...booking,
            adminResponse: responseText,
            adminPhone: adminPhone,
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

  const respondToCustomPackage = async (packageId) => {
    if (!adminData) {
      setMessage("⚠️ Admin data not found.");
      return;
    }

    if (!response.trim()) {
      setMessage("⚠️ Veuillez entrer une réponse avant d'envoyer.");
      return;
    }

    try {
      const packageRef = doc(db, "customPackages", packageId);
      const updates = {
        adminResponse: response,
        adminName: adminName,
        adminPhone: adminPhone,
        updatedAt: new Date(),
      };

      if (adminPrice.trim()) {
        updates.adminPrice = adminPrice;
        updates.status = "priced";
      } else {
        updates.status = "approved";
      }

      await updateDoc(packageRef, updates);

      const updatedPackages = customPackages.map((pkg) =>
        pkg.id === packageId
          ? {
            ...pkg,
            adminResponse: response,
            adminName: adminName,
            adminPhone: adminPhone,
            adminPrice: adminPrice,
            status: adminPrice.trim() ? "priced" : "approved",
          }
          : pkg
      );
      setCustomPackages(updatedPackages);

      setResponse("");
      setAdminPrice("");
      setSelectedCustomPackage(null);
      setMessage("✅ Réponse envoyée avec succès au client !");
    } catch (error) {
      console.error("Error responding to custom package:", error);
      setMessage("❌ Erreur lors de l'envoi de la réponse.");
    }
  };

  const updatePackageStatus = async (packageId, newStatus) => {
    try {
      const packageRef = doc(db, "customPackages", packageId);
      await updateDoc(packageRef, {
        status: newStatus,
        updatedAt: new Date(),
      });

      const updatedPackages = customPackages.map((pkg) =>
        pkg.id === packageId
          ? { ...pkg, status: newStatus }
          : pkg
      );
      setCustomPackages(updatedPackages);
      setMessage(`✅ Statut changé à "${newStatus}"`);
    } catch (error) {
      console.error("Error updating package status:", error);
      setMessage("❌ Erreur lors du changement de statut.");
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length
    : 0;

  const filteredCustomPackages = filterStatus === "all"
    ? customPackages
    : customPackages.filter(pkg => pkg.status === filterStatus);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!adminData) return <p>Vous devez être connecté en tant qu'administrateur.</p>;

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="admin-dashboard">
        <div className="dashboard-container">
          <div className="admin-header">
            <h1>Bonjour, {adminData?.name || adminData?.nom}!</h1>
            <div className="admin-rating">
              <span>Note moyenne: {averageRating.toFixed(1)}/5</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= Math.round(averageRating) ? 'filled' : ''}>★</span>
                ))}
              </div>
            </div>
            <p className="admin-contact">
              Contact: {adminData.phone || adminData.telephone} | {adminData.email}
              {isSuperAdmin && <span className="super-admin-badge-header">👑 Super Admin</span>}
            </p>
          </div>

          <div className="admin-nav">
            <button
              onClick={() => { setShowReviews(false); setShowCustomPackages(false); setShowAdminManagement(false); }}
              className={!showReviews && !showCustomPackages && !showAdminManagement ? 'active' : ''}
            >
              Réservations ({bookings.length})
            </button>
            <button
              onClick={() => { setShowCustomPackages(true); setShowReviews(false); setShowAdminManagement(false); }}
              className={showCustomPackages ? 'active' : ''}
            >
              Packages Perso ({customPackages.length})
            </button>
            <button
              onClick={() => { setShowReviews(true); setShowCustomPackages(false); setShowAdminManagement(false); }}
              className={showReviews ? 'active' : ''}
            >
              Avis ({reviews.length})
            </button>
            {isSuperAdmin && (
              <button
                onClick={() => { setShowAdminManagement(true); setShowReviews(false); setShowCustomPackages(false); }}
                className={showAdminManagement ? 'active' : ''}
              >
                👑 Gestion Admins ({adminsList.length})
              </button>
            )}
          </div>

          {/* Section Gestion des Administrateurs (Super Admin seulement) */}
          {showAdminManagement && isSuperAdmin && (
            <div className="admin-management-section">
              <h2>👑 Gestion des Administrateurs</h2>
              
              {/* Avertissement pendant la création */}
              {isCreatingAdmin && (
                <div className="creating-warning">
                  ⏳ Création en cours, veuillez patienter...
                </div>
              )}
              
              {/* Formulaire de création d'admin */}
              <div className="create-admin-form">
                <h3>Créer un nouvel administrateur</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nom *</label>
                    <input
                      type="text"
                      value={newAdminData.nom}
                      onChange={(e) => setNewAdminData({...newAdminData, nom: e.target.value})}
                      placeholder="Nom"
                      required
                      disabled={isCreatingAdmin}
                    />
                    {newAdminData.nom && <span className="validation-icon valid-icon">✓</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Prénom *</label>
                    <input
                      type="text"
                      value={newAdminData.prenom}
                      onChange={(e) => setNewAdminData({...newAdminData, prenom: e.target.value})}
                      placeholder="Prénom"
                      required
                      disabled={isCreatingAdmin}
                    />
                    {newAdminData.prenom && <span className="validation-icon valid-icon">✓</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={newAdminData.email}
                      onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                      placeholder="email@exemple.com"
                      required
                      disabled={isCreatingAdmin}
                    />
                    {newAdminData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAdminData.email) && (
                      <span className="validation-icon valid-icon">✓</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>Téléphone *</label>
                    <input
                      type="tel"
                      value={newAdminData.telephone}
                      onChange={(e) => setNewAdminData({...newAdminData, telephone: e.target.value})}
                      placeholder="06 12 34 56 78"
                      required
                      disabled={isCreatingAdmin}
                    />
                    {newAdminData.telephone && <span className="validation-icon valid-icon">✓</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Mot de passe *</label>
                    <input
                      type="password"
                      value={newAdminData.password}
                      onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                      placeholder="Minimum 6 caractères"
                      required
                      disabled={isCreatingAdmin}
                      minLength="6"
                    />
                    {newAdminData.password.length >= 6 && (
                      <span className="validation-icon valid-icon">✓</span>
                    )}
                  </div>
                </div>
                
                <button 
                  className="btn-create-admin" 
                  onClick={createNewAdmin}
                  disabled={isCreatingAdmin || 
                    !newAdminData.nom.trim() || 
                    !newAdminData.prenom.trim() || 
                    !newAdminData.email.trim() || 
                    !newAdminData.telephone.trim() || 
                    newAdminData.password.length < 6 ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAdminData.email)}
                >
                  {isCreatingAdmin ? "Création..." : "Créer l'administrateur"}
                </button>
                
                <p className="form-note">
                  * L'administrateur créé aura le rôle "admin" et pourra gérer les réservations, packages et avis.
                  Le mot de passe doit être communiqué au nouvel administrateur.
                </p>
              </div>

              {/* Liste des administrateurs */}
              <div className="admins-list">
                <h3>Liste des Administrateurs</h3>
                {adminsList.length === 0 ? (
                  <p>Aucun administrateur trouvé.</p>
                ) : (
                  <div className="admins-grid">
                    {adminsList.map((admin) => (
                      <div key={admin.id} className={`admin-card ${admin.email === "superadmin@event.com" ? "super-admin" : ""}`}>
                        <div className="admin-card-header">
                          <h4>{admin.nom || admin.name} {admin.prenom}</h4>
                          {admin.email === "superadmin@event.com" && (
                            <span className="super-admin-badge">👑 Super Admin</span>
                          )}
                        </div>
                        <div className="admin-card-info">
                          <p><strong>Email:</strong> {admin.email}</p>
                          <p><strong>Téléphone:</strong> {admin.telephone || admin.phone}</p>
                          <p><strong>Rôle:</strong> {admin.role || "admin"}</p>
                          {admin.createdAt && (
                            <p><strong>Créé le:</strong> {
                              admin.createdAt.toDate ? 
                              admin.createdAt.toDate().toLocaleDateString() : 
                              new Date(admin.createdAt).toLocaleDateString()
                            }</p>
                          )}
                          {admin.createdBy && (
                            <p><strong>Créé par:</strong> {admin.createdBy}</p>
                          )}
                        </div>
                        <div className="admin-card-actions">
                          {admin.email !== "superadmin@event.com" && (
                            <button 
                              className="btn-delete-admin"
                              onClick={() => deleteAdmin(admin.id, admin.email)}
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section Packages Personnalisés */}
          {showCustomPackages && (
            <div className="custom-packages-section">
              <div className="section-header">
                <h2>📦 Packages Personnalisés des Clients</h2>
                <div className="status-filters">
                  <button
                    className={filterStatus === "all" ? "active" : ""}
                    onClick={() => setFilterStatus("all")}
                  >
                    Tous ({customPackages.length})
                  </button>
                  <button
                    className={filterStatus === "pending" ? "active" : ""}
                    onClick={() => setFilterStatus("pending")}
                  >
                    ⏳ En attente ({customPackages.filter(p => p.status === "pending").length})
                  </button>
                  <button
                    className={filterStatus === "priced" ? "active" : ""}
                    onClick={() => setFilterStatus("priced")}
                  >
                    💰 Prix proposé ({customPackages.filter(p => p.status === "priced").length})
                  </button>
                  <button
                    className={filterStatus === "approved" ? "active" : ""}
                    onClick={() => setFilterStatus("approved")}
                  >
                    ✅ Approuvé ({customPackages.filter(p => p.status === "approved").length})
                  </button>
                  <button
                    className={filterStatus === "rejected" ? "active" : ""}
                    onClick={() => setFilterStatus("rejected")}
                  >
                    ❌ Refusé ({customPackages.filter(p => p.status === "rejected").length})
                  </button>
                </div>
              </div>

              {filteredCustomPackages.length === 0 ? (
                <p>Aucun package personnalisé trouvé.</p>
              ) : (
                <div className="custom-packages-list">
                  {filteredCustomPackages.map((pkg) => (
                    <div key={pkg.id} className={`custom-package-card status-${pkg.status}`}>
                      <div className="package-header">
                        <div className="package-title">
                          <h3>{pkg.packageName}</h3>
                          <span className={`status-badge ${pkg.status}`}>
                            {pkg.status === "pending" && "⏳ En attente"}
                            {pkg.status === "approved" && "✅ Approuvé"}
                            {pkg.status === "rejected" && "❌ Refusé"}
                            {pkg.status === "priced" && "💰 Prix proposé"}
                          </span>
                        </div>
                        <div className="client-info">
                          <p><strong>Client:</strong> {pkg.clientName}</p>
                          <p><strong>Email:</strong> {pkg.clientEmail}</p>
                          <p><strong>Téléphone:</strong> {pkg.clientPhone}</p>
                        </div>
                      </div>

                      <div className="package-details">
                        <div className="detail-group">
                          <h4>📝 Description:</h4>
                          <p>{pkg.packageDescription}</p>
                        </div>
                        <div className="detail-group">
                          <h4>🎯 Éléments souhaités:</h4>
                          <p>{pkg.packageElements}</p>
                        </div>
                        <div className="details-grid">
                          <div className="detail-item">
                            <strong>💰 Budget:</strong> {pkg.budget}
                          </div>
                          <div className="detail-item">
                            <strong>📅 Date souhaitée:</strong> {pkg.preferredDate}
                          </div>
                          <div className="detail-item">
                            <strong>⏰ Heure:</strong> {pkg.preferredTime}
                          </div>
                          <div className="detail-item">
                            <strong>📍 Lieu:</strong> {pkg.location}
                          </div>
                        </div>
                        <div className="detail-item">
                          <strong>📅 Soumis le:</strong> {pkg.createdAt?.toLocaleDateString()} {pkg.createdAt?.toLocaleTimeString()}
                        </div>
                      </div>

                      {pkg.adminResponse && (
                        <div className="admin-response-display">
                          <h4>📩 Votre réponse:</h4>
                          <p>{pkg.adminResponse}</p>
                          {pkg.adminPrice && (
                            <p className="price-display">
                              <strong>💰 Prix proposé:</strong> {pkg.adminPrice}
                            </p>
                          )}
                          {pkg.adminName && (
                            <p><strong>De:</strong> {pkg.adminName} ({pkg.adminPhone})</p>
                          )}
                        </div>
                      )}

                      <div className="package-actions">
                        <div className="action-buttons">
                          {!pkg.adminResponse ? (
                            <>
                              <button
                                className="btn-respond"
                                onClick={() => setSelectedCustomPackage(pkg)}
                              >
                                ✉️ Répondre
                              </button>
                              <button
                                className="btn-reject"
                                onClick={() => updatePackageStatus(pkg.id, "rejected")}
                              >
                                ❌ Refuser
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn-edit"
                                onClick={() => setSelectedCustomPackage(pkg)}
                              >
                                ✏️ Modifier réponse
                              </button>
                              {pkg.status === "priced" && (
                                <button
                                  className="btn-approve"
                                  onClick={() => updatePackageStatus(pkg.id, "approved")}
                                >
                                  ✅ Finaliser
                                </button>
                              )}
                            </>
                          )}
                          <button
                            className="btn-delete"
                            onClick={() => deleteCustomPackage(pkg.id)}
                          >
                            🗑️ Supprimer
                          </button>
                        </div>

                        <div className="status-buttons">
                          <button
                            className={`status-btn ${pkg.status === "pending" ? "active" : ""}`}
                            onClick={() => updatePackageStatus(pkg.id, "pending")}
                          >
                            ⏳
                          </button>
                          <button
                            className={`status-btn ${pkg.status === "approved" ? "active" : ""}`}
                            onClick={() => updatePackageStatus(pkg.id, "approved")}
                          >
                            ✅
                          </button>
                          <button
                            className={`status-btn ${pkg.status === "rejected" ? "active" : ""}`}
                            onClick={() => updatePackageStatus(pkg.id, "rejected")}
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedCustomPackage && (
                <div className="response-form">
                  <h3>Réponse à {selectedCustomPackage.clientName}</h3>
                  <div className="form-group">
                    <label>Votre réponse au client:</label>
                    <textarea
                      value={response || selectedCustomPackage.adminResponse || ""}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Tapez votre réponse ici..."
                      rows={4}
                    />
                  </div>
                  <div className="form-group">
                    <label>Prix proposé (optionnel):</label>
                    <input
                      type="text"
                      value={adminPrice || selectedCustomPackage.adminPrice || ""}
                      onChange={(e) => setAdminPrice(e.target.value)}
                      placeholder="Ex: 250€ ou 200-300€"
                    />
                    <small>Si vous proposez un prix, le statut passera automatiquement à "Prix proposé"</small>
                  </div>
                  <div className="form-group">
                    <label>Votre nom:</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="form-group">
                    <label>Votre téléphone:</label>
                    <input
                      type="text"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>
                  <div className="form-actions">
                    <button className="btn-send" onClick={() => respondToCustomPackage(selectedCustomPackage.id)}>
                      Envoyer la réponse
                    </button>
                    <button className="btn-cancel" onClick={() => {
                      setSelectedCustomPackage(null);
                      setResponse("");
                      setAdminPrice("");
                    }}>
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section Réservations standards */}
          {!showReviews && !showCustomPackages && !showAdminManagement && (
            <div className="bookings-section">
              <h2>Réservations Des Clients</h2>
              {bookings.length === 0 ? (
                <p>Aucune réservation trouvée.</p>
              ) : (
                <div className="bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-info">
                        <h3>{booking.gymClass || booking.package}</h3>
                        <p>{booking.selectedDay} à {formatTime(booking.selectedTime)}</p>
                        <p>Client: {booking.name} | {booking.phone} | {booking.email}</p>
                        {booking.adminResponse && (
                          <p className="admin-response"><strong>Votre réponse:</strong> {booking.adminResponse}</p>
                        )}
                      </div>
                      <div className="booking-actions">
                        <button onClick={() => setSelectedBooking(booking)}>Répondre</button>
                        <button onClick={() => deleteBooking(booking.id)}>Supprimer</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section Avis */}
          {showReviews && (
            <div className="reviews-section">
              <h2>⭐ Appréciations Des Clients</h2>
              {reviews.length === 0 ? (
                <p>Aucun avis pour le moment.</p>
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

          {/* Formulaire de réponse pour réservation standard */}
          {selectedBooking && !showCustomPackages && !showReviews && !showAdminManagement && (
            <div className="response-form">
              <h3>Répondre à {selectedBooking.name}</h3>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Tapez votre réponse ici..."
                rows={4}
              />
              <div className="form-actions">
                <button onClick={() => respondToBooking(selectedBooking.id, response)}>Envoyer la réponse</button>
                <button onClick={() => setSelectedBooking(null)}>Annuler</button>
              </div>
              {message && <p className="form-message">{message}</p>}
            </div>
          )}

          {/* Message général */}
          {message && (
            <div className={`message-alert ${message.includes("✅") ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;