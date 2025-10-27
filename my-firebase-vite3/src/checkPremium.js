import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Function to check if user has a premium subscription
async function isPremiumUser(userId) {
  const subRef = doc(db, "subscriptions", userId);
  const subSnap = await getDoc(subRef);
  return subSnap.exists() && subSnap.data().active;
}

// 🔥 Listen for user login status
onAuthStateChanged(auth, async (user) => {
  const statusEl = document.getElementById("userStatus"); // ✅ Status text
  const goPremiumBtn = document.getElementById("goPremiumBtn"); // ✅ The button

  if (user) {
    const premium = await isPremiumUser(user.uid);

    if (premium) {
      console.log("✅ Premium user! Full access granted.");
      document.body.classList.add("premium-user");

      if (statusEl) statusEl.textContent = "💎 Premium Member";

      // 🔹 Hide the Go Premium button
      if (goPremiumBtn) goPremiumBtn.style.display = "none";

    } else {
      console.log("🚫 Not premium. Show upgrade option.");
      document.body.classList.remove("premium-user");

      if (statusEl) statusEl.textContent = "🔒 Free User - Upgrade for R175/month";

      // 🔹 Show the Go Premium button
      if (goPremiumBtn) goPremiumBtn.style.display = "inline-block";
    }

  } else {
    console.log("No user logged in.");

    if (statusEl) statusEl.textContent = "🔑 Please sign in to access DoBetter";

    // 🔹 Show the Go Premium button even if not logged in (so they can click it)
    if (goPremiumBtn) goPremiumBtn.style.display = "inline-block";
  }
});
