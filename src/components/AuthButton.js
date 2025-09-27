"use client";

import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthButton({buttonText = "Sign in with Google"}) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser){
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

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
      document.cookie = "session=; path=/; max-age=0";
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
        <button className={buttonText === "Sign in with Google" ? "btn" : buttonText === "Get Started Free" ? "footer-cta-btn" : "get-started-button"} onClick={handleLogin}>{buttonText}{buttonText === "Sign in with Google" ? <Image src = "/google_logo.png" alt="G-Logo" width={20} height={20}></Image> : null}</button>
      )}
    </div>
  );
}
