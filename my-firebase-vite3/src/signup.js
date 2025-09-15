// src/signup.js   (only load on the signup/login page)
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  // signup
  const signupForm = document.getElementById("signup");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName = document.getElementById("fullName").value.trim();
      const age = document.getElementById("age").value.trim();
      const grade = document.getElementById("grade").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;

      if (!email.includes("@")) return alert("Enter a valid email");
      if (password.length < 6) return alert("Password must be 6+ chars");

      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        // ✅ Save extra info to Firestore without overwriting future data
        console.log("Creating user doc for:", userCred.user.uid);
        await  setDoc(doc(db, "users", userCred.user.uid), {
          fullName,
          email,
          age,
          grade,
         //subjects
         //progress
        }, { merge: true });
        console.log("User doc created!");

        alert("Account created");
        window.location.href = "profile.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // login
  const loginForm = document.getElementById("login");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in");
        window.location.href = "profile.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }
});
