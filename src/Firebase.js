// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW-Br1Or1JLM-Su4qV6Nt82G4UtBP6VTs",
  authDomain: "agro-solution-e624e.firebaseapp.com",
  projectId: "agro-solution-e624e",
  storageBucket: "agro-solution-e624e.appspot.com",
  messagingSenderId: "963294270042",
  appId: "1:963294270042:web:5f02a64f70e9475765fe63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, analytics, db, auth, storage };
