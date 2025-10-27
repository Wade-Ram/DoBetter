import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const userStatus = document.getElementById("userStatus");
const lockedMsg = document.getElementById("lockedMsg");
const premiumSection = document.getElementById("premiumSection");
const subjectsContainer = document.getElementById("subjectsContainer");

async function loadPremiumSubjects() {
  const snapshot = await getDocs(collection(db, "premiumSubjects"));
  subjectsContainer.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.classList.add("subject-card");

    card.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.description}</p>

      <div class="scroll-section">
        <h3>📘 PDFs</h3>
        <div class="scroll-container">
          ${(data.pdfs || [])
            .map(
              (pdf) => `
            <div class="resource-item">
              <a href="${pdf.url}" target="_blank">
                <i class="fa-solid fa-file-pdf"></i> ${pdf.name}
              </a>
            </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="scroll-section">
        <h3>🎥 Videos</h3>
        <div class="scroll-container">
          ${(data.videos || [])
            .map(
              (video) => `
            <div class="resource-item">
              <a href="${video.url}" target="_blank">
                <i class="fa-solid fa-video"></i> ${video.name}
              </a>
            </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="scroll-section">
        <h3>🧠 Quizzes</h3>
        <div class="scroll-container">
          ${(data.quizzes || [])
            .map(
              (quiz) => `
            <div class="resource-item">
              <a href="${quiz.url}" target="_blank">
                <i class="fa-solid fa-question-circle"></i> ${quiz.name}
              </a>
            </div>`
            )
            .join("")}
        </div>
      </div>
    `;

    subjectsContainer.appendChild(card);
  });
}

async function isPremiumUser(userId) {
  const docRef = doc(db, "subscriptions", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() && docSnap.data().active;
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const premium = await isPremiumUser(user.uid);

    if (premium) {
      userStatus.textContent = "💎 Premium Member";
      lockedMsg.style.display = "none";
      premiumSection.style.display = "block";
      loadPremiumSubjects();
    } else {
      userStatus.textContent = "🔒 Free User - Upgrade for R175/month";
      lockedMsg.style.display = "block";
      premiumSection.style.display = "none";
    }
  } else {
    userStatus.textContent = "🚪 Please Sign In";
    lockedMsg.style.display = "block";
    premiumSection.style.display = "none";
  }
});
