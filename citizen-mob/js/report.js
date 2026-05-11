import { db } from "../../shared/firebase.js";
import { collection, addDoc, serverTimestamp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function submitIssue(data) {
  await addDoc(collection(db, "issues"), {
    ...data,
    status: "Pending",
    createdAt: serverTimestamp(),
    aiPriority: "Medium",
    upvotes: 0
  });
}