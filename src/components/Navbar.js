"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useMenu } from "../app/context/menuContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const { menuOpen, setMenuOpen } = useMenu();
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
      <div className="nav-ctas">
        {
          pathname == '/' ? 
          (
            <>
              <Link href="/login"><button>Login</button></Link>
              <Link href="/signup"><button>Register</button></Link>
            </>
          ) : pathname == '/login' ?
          (
            <Link href="/signup"><button>Register</button></Link>
          ) : pathname == '/signup' ? 
          (
            <Link href="/login"><button>Login</button></Link>
          ) : null

        }
      </div>
    </nav>
  );
}
