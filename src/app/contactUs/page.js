"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="subtitle">
        We&apos;re here to help! Reach out to us anytime.
      </p>

      <div className="contact-container">
        <div className="contact-card">
          <Mail size={30} color="#007bff" />
          <h3>Email</h3>
          <p>contact@career123</p>
        </div>

        <div className="contact-card">
          <Phone size={30} color="#007bff" />
          <h3>Phone</h3>
          <p>+91 874567XXXX</p>
        </div>

        <div className="contact-card">
          <MapPin size={30} color="#007bff" />
          <h3>Address</h3>
          <p>NST - India</p>
        </div>
      </div>

      <p className="footer-note">
        Our team will respond within 24-48 hours.
        Thank you for reaching out!
      </p>
    </div>
  );
}
