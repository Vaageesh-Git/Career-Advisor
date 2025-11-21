"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import axios, { Axios } from "axios";
import { useRouter } from "next/navigation";
import { useMenu } from "@/app/context/menuContext";
import { useAuth } from "@/app/context/authContext";
import { useDataContext } from "@/app/context/aiDataContext";
import { useQuestionAnswers } from "@/app/context/questionAnswersContext";

export default function Navbar() {
  const router = useRouter();
  const {setData} = useDataContext();
  const { setAnswers } = useQuestionAnswers();

  const { loggedIn, setLoggedIn } = useAuth();
  const { menuOpen, setMenuOpen } = useMenu();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setLoggedIn(false)
      setData(null)
      setAnswers({})

      setTimeout(() => {
        router.push('/');
      }, 50);

    } catch(err){
      console.error(err)
    }
  };

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
          ) :
          (
           <button onClick={handleLogout}>Logout</button>
          )
        }
      </div>
    </nav>
  );
}
