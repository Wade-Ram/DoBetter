// auth.js (you can load this on all pages)
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export default firebaseConfig;

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
