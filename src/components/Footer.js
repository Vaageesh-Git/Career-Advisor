import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Career Navigator</h3>
          <p>
            Helping students explore career options,<br/> find scholarships, and get
            personalized <br/> guidance to shape their future.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/scholarships">Scholarships</Link></li>
            <li><Link href="/aiGuidance">Career Advice</Link></li>
          </ul>
        </div>
        <div className="footer-section support">
          <h3>Support</h3>
          <ul>
            <li><Link href="/contactUs">Contact Us</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Phone: +91-XXXXXXX</p>
          <p>Email: contact@career123</p>
        </div>
      </div>
    </footer>
  );
}

