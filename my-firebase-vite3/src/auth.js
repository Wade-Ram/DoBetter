// auth.js (you can load this on all pages)
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Handle user status in navbar
const userStatus = document.getElementById("user-status");

if (userStatus) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Only show part before @ to keep it short
      let displayName = user.email.split("@")[0];
      userStatus.textContent = displayName;
      userStatus.href = "profile.html"; // link to profile
    } else {
      userStatus.textContent = "Not logged in";
      userStatus.href = "signup-login.html"; // link to login/signup
    }
  });
}

// ✅ Optional logout button (only on pages that have it)
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Logged out");
      window.location.href = "index.html"; // redirect after logout
    });
  });
}
