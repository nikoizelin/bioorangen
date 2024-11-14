// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "bioorangen-27916.firebaseapp.com",
  projectId: "bioorangen-27916",
  storageBucket: "bioorangen-27916.firebasestorage.app",
  messagingSenderId: "952121326701",
  appId: "1:952121326701:web:2fac90fb8921b3d0859364",
  measurementId: "G-TS49WLS95P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, app, auth }; // Export Firestore and Firebase Auth