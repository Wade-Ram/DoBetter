import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

// ✅ Use environment variables — Vite replaces these automatically at build time
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form
const form = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.querySelector("#name").value.trim();
    const rating = parseInt(form.querySelector("#rating").value);
    const comment = form.querySelector("#comment").value.trim();

    if (!name || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        name,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });
      alert("✅ Review submitted successfully!");
      form.reset();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("❌ Something went wrong. Check console.");
    }
  });
}

// Display reviews in real time
if (reviewsContainer) {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    reviewsContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const review = doc.data();
      const stars = "⭐".repeat(review.rating);
      const div = document.createElement("div");
      div.classList.add("review");
      div.innerHTML = `
        <h3>${review.name}</h3>
        <p>${stars}</p>
        <p>${review.comment}</p>
      `;
      reviewsContainer.appendChild(div);
    });
  });
}
