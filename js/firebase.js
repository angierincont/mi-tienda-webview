// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD159PzqzNXQpMutpECpWzJcQ_62_DSnYU",
  authDomain: "tiendaplatzi-a6241.firebaseapp.com",
  projectId: "tiendaplatzi-a6241",
  storageBucket: "tiendaplatzi-a6241.firebasestorage.app",
  messagingSenderId: "286259925506",
  appId: "1:286259925506:web:71ed6f6a489aa197b9cd1b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
