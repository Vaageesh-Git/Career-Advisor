"use client";

import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AuthButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      // Save user in Firestore
      await setDoc(doc(db, "users", loggedInUser.uid), {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photoURL: loggedInUser.photoURL,
        lastLogin: new Date(),
      });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <button className="btn" onClick={handleLogout}>
          Logout ({user.displayName})
        </button>
      ) : (
        <button className="btn" onClick={handleLogin}>Sign in with Google <Image src = "/google_logo.png" alt="G-Logo" width={20} height={20}></Image></button>
      )}
    </div>
  );
}
