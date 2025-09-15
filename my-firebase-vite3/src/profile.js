// src/profile.js
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "signup-login.html";
      return;
    }

    const userRef = doc(db, "users", user.uid);

    // Get the user doc
    let snap = await getDoc(userRef);
    console.log("Current UID:", user.uid);
    console.log("Looking for doc:", userRef.path);
    console.log("Doc exists:", snap.exists());

    // If no doc exists, create a minimal default (don’t wipe signup data)
    if (!snap.exists()) {
      console.log("No profile doc; creating default profile...");
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
      }, { merge: true });

      snap = await getDoc(userRef);
    }

    const data = snap.data() || {};

    // ===== Display elements =====
    const nameEl = document.getElementById("profileName");
    const emailEl = document.getElementById("profileEmail");
    const ageEl = document.getElementById("profileAge");
    const gradeEl = document.getElementById("profileGrade");
    const subjectsEl = document.getElementById("profileSubjects");

    // ===== Edit inputs =====
    const editName = document.getElementById("editName");
    const editAge = document.getElementById("editAge");
    const editGrade = document.getElementById("editGrade");
    const editSubjects = document.getElementById("editSubjects");

    // ===== Buttons =====
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");

    // Fill profile data
    nameEl.textContent = data.fullName || (user.email?.split("@")[0] || "Student");
    emailEl.textContent = data.email || user.email;
    ageEl.textContent = data.age || "N/A";
    gradeEl.textContent = data.grade || "N/A";
    subjectsEl.textContent = (data.subjects || []).join(", ") || "None";

    // Fill edit inputs
    editName.value = data.fullName || "";
    editAge.value = data.age || "";
    editGrade.value = data.grade || "";
    editSubjects.value = (data.subjects || []).join(", ");

    // ===== Edit button =====
    editBtn.addEventListener("click", () => {
      // hide spans
      nameEl.style.display = "none";
      ageEl.style.display = "none";
      gradeEl.style.display = "none";
      subjectsEl.style.display = "none";

      // show inputs
      editName.style.display = "inline-block";
      editAge.style.display = "inline-block";
      editGrade.style.display = "inline-block";
      editSubjects.style.display = "inline-block";

      editBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
    });

    // ===== Save button =====
    saveBtn.addEventListener("click", async () => {
      const newData = {
        fullName: editName.value.trim(),
        age: editAge.value.trim(),
        grade: editGrade.value.trim(),
        subjects: editSubjects.value.split(",").map(s => s.trim()).filter(s => s),
      };

      try {
        await updateDoc(userRef, newData);
        alert("Profile updated!");

        // update UI
        nameEl.textContent = newData.fullName;
        ageEl.textContent = newData.age;
        gradeEl.textContent = newData.grade;
        subjectsEl.textContent = newData.subjects.join(", ");

        // switch back to view mode
        nameEl.style.display = "inline";
        ageEl.style.display = "inline";
        gradeEl.style.display = "inline";
        subjectsEl.style.display = "inline";

        editName.style.display = "none";
        editAge.style.display = "none";
        editGrade.style.display = "none";
        editSubjects.style.display = "none";

        saveBtn.style.display = "none";
        editBtn.style.display = "inline-block";
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("Failed to update profile.");
      }
    });
  });
});
