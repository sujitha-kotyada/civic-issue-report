import { db } from "../../shared/firebase.js";
import { collection, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadIssues() {
  const snapshot = await getDocs(collection(db, "issues"));
  snapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });
}