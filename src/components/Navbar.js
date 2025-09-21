import Link from "next/link";
import AuthButton from "./AuthButton";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="navbar">
        <Link href="/" className="nav-logo">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div className="nav-name">CareerNav</div>
        </Link>
      <ul className="nav-links">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/scholarships">Scholarships</Link></li>
        <li><Link href="/careers">Careers</Link></li>
        <li><Link href="/advice">Advice</Link></li>
      </ul>
      <AuthButton />
    </nav>
  );
}
