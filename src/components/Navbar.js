"use client";
import Link from "next/link";
import AuthButton from "./AuthButton";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Menu } from "lucide-react";
import { useMenu } from "../app/context/menuContext";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { menuOpen, setMenuOpen } = useMenu();
  
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <nav className="navbar">
      <div className="nav-div">
          {loggedIn &&
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={28} color="#fff" />
            </button>
          }
          <Link href="/" className="nav-div">

            <Image src="/logo.png" alt="Logo" width={40} height={40}/>
            <div className="nav-name">CareerNav</div>
          </Link>
        </div>

      <AuthButton />
    </nav>
  );
}
