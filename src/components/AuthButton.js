"use client";

import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthButton({ buttonText = "Sign in with Google" }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
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

    // Get ID token and call API
    const idToken = await loggedInUser.getIdToken();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (res.ok) {
      // ✅ Only redirect AFTER cookie is set
      router.push("/");
    } else {
      console.error("Failed to create session cookie");
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};


  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = "session=; path=/; max-age=0";
      setUser(null);
      router.push("/");
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
        <button
          className={
            buttonText === "Sign in with Google"
              ? "btn"
              : buttonText === "Get Started Free"
              ? "footer-cta-btn"
              : "get-started-button"
          }
          onClick={handleLogin}
        >
          {buttonText}
          {buttonText === "Sign in with Google" && (
            <Image src="/google_logo.png" alt="G-Logo" width={20} height={20} />
          )}
        </button>
      )}
    </div>
  );
}
