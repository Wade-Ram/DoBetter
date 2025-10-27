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
  const statusEl = document.getElementById("userStatus"); // ✅ Get the element from HTML

  if (user) {
    const premium = await isPremiumUser(user.uid);

    if (premium) {
      console.log("✅ Premium user! Full access granted.");
      document.body.classList.add("premium-user");

      // ✅ Add this here (updates text for Premium)
      if (statusEl) {
        statusEl.textContent = "💎 Premium Member";
      }

    } else {
      console.log("🚫 Not premium. Hide premium content or show upgrade button.");
      document.body.classList.remove("premium-user");

      // ✅ Add this here (updates text for Free)
      if (statusEl) {
        statusEl.textContent = "🔒 Free User Upgrade for R175/month";
      }
    }

  } else {
    console.log("No user logged in.");

    // 👇 Add this to show message on the website
    const statusEl = document.getElementById("userStatus");
    if (statusEl) {
      statusEl.textContent = "🔑 Please sign in to access DoBetter";
    }

  }
});
