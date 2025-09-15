// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <-- add this

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCSXAqjRkRo-WuP2YeOpx_lwoZVBfpMNoY",
  authDomain: "dobetter-98fbb.firebaseapp.com",
  projectId: "dobetter-98fbb",
  storageBucket: "dobetter-98fbb.firebasestorage.app",
  messagingSenderId: "607043045434",
  appId: "1:607043045434:web:d835af4c5a2a2e9d654d03",
  measurementId: "G-1BHFJL3CG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db for other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // <-- export storage
