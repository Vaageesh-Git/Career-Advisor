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
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/scholarships">Scholarships</a></li>
            <li><a href="/advice">Career Advice</a></li>
          </ul>
        </div>
        <div className="footer-section support">
          <h3>Support</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
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

