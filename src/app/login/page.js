"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <Image
          src="/login-illustration.png"
          alt="Career growth illustration"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="signup-form">
        <h1>Login 🚀</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Log In
          </button>

          <p className="login-link">
            Don't have a Account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
}
