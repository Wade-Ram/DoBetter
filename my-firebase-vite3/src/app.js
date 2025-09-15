// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSXAqjRkRo-WuP2YeOpx_lwoZVBfpMNoY",
  authDomain: "dobetter-98fbb.firebaseapp.com",
  projectId: "dobetter-98fbb",
  storageBucket: "dobetter-98fbb.firebasestorage.app",
  messagingSenderId: "607043045434",
  appId: "1:607043045434:web:d835af4c5a2a2e9d654d03",
  measurementId: "G-1BHFJL3CG2"
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth"; // ✅ single import for all auth functions
import { getFirestore } from "firebase/firestore";  //Firestore feature

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // ✅ Make sure this exists
const db = getFirestore(app);

export { app, auth, db };

console.log("Firebase connected successfully");

// ✅ Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

  // ------------------- SIGN UP -------------------
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");
  const signupForm = document.getElementById("signup");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          signupEmail.value, 
          signupPassword.value
        );
        console.log("✅ Signed up:", userCredential.user);
        alert("Sign up successful!");
      } catch (error) {
        console.error("Error signing up:", error.message);
        alert(error.message);
      }
    });
  }

  // ------------------- LOGIN -------------------
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginForm = document.getElementById("login");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          loginEmail.value, 
          loginPassword.value
        );
        console.log("✅ Logged in:", userCredential.user);
        alert("Login successful!");
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert(error.message);
      }
    });
  }

  // ------------------- LOGOUT -------------------
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          console.log("✅ Logged out");
          alert("You are logged out!");
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    });
  }

  // ------------------- USER STATUS -------------------
  const userStatus = document.getElementById("user-status");
  if (userStatus) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userStatus.textContent = `Logged in as: ${user.email}`;
      } else {
        userStatus.textContent = "Not logged in";
      }
    });
  }

});