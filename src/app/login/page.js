"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User login data:", formData);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <h1>Welcome Back 👋</h1>
          <p>Sign in to continue your journey with <strong>CareerNav</strong>.</p>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="login-footer">
            Don't have an account? <span className="create-new-account">Create one below</span>
          </p>
        </div>

        {/* <div className="login-right">
          <Image
            src="/login-illustration.png"
            alt="Career growth"
            width={400}
            height={400}
            className="login-image"
            priority
          />
        </div> */}
      </div>
    </div>
  );
}
