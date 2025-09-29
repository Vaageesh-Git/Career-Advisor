import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "career-app-2025.firebaseapp.com",
  projectId: "career-app-2025",
  storageBucket: "career-app-2025.appspot.com",
  messagingSenderId: "423308508832",
  appId: "1:423308508832:web:86f5c4bf6f9931d12153c5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
