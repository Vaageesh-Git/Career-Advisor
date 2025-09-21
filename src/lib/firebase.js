// Import the functions you need from Firebase
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBQh6iO-pXinpGRc7wK499BbRSs7PDnEN4",
  authDomain: "career-app-2025.firebaseapp.com",
  projectId: "career-app-2025",
  storageBucket: "career-app-2025.firebasestorage.app",
  messagingSenderId: "423308508832",
  appId: "1:423308508832:web:86f5c4bf6f9931d12153c5"
};

// Initialize Firebase (check if already initialized)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Export them properly
export { app, auth, googleProvider, db };
