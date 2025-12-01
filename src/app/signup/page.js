"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      const response = await axios.post('/api/signup',formData)
      if (response?.status === 201){
        alert("Account Created Successfully")
      }
      router.push('/login')
    } catch (err) {
      if (err.response?.status === 409){
        alert('User Already Exists')
      }
      router.push('/login')
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <Image
          src="/lg-sp-illustration.png"
          alt="Career growth illustration"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="signup-form">
        <h1>Create Your Account</h1>
        <p>Join CareerNav and take your career to the next level.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit"
              className={loading ? `loader-btn loading` : "signup-btn"}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span className="btn-spinner"></span> : "Sign Up"}
          </button>

          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
