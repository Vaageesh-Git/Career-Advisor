"use client";
import Link from "next/link";
import AuthButton from "./AuthButton";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <nav className="navbar">
        <Link href="/" className="nav-logo">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div className="nav-name">CareerNav</div>
        </Link>
    {loggedIn &&
      <ul className="nav-links">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/scholarships">Scholarships</Link></li>
        <li><Link href="/careers">Careers</Link></li>
        <li><Link href="/advice">Advice</Link></li>
      </ul>
    }

      <AuthButton />
    </nav>
  );
}
