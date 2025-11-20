"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { useDataContext } from "../context/aiDataContext";

export default function SignupPage() {
  const { setLoggedIn } = useAuth();
  const { setData } = useDataContext();
  const router = useRouter();
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
    try{
      const response = await axios.post('/api/login',formData)
      if (response?.status === 200){
        setData(null);
        if (response.data.hasCompletedOnboarding === true){
          setLoggedIn(true)
          router.push('/dashboard')
        } else {
          router.push('/questionare')
        }
      }
    } catch(err){
      console.log(err.response?.data)
      if (err.response?.status === 404){
        alert('User Does Not Exists.')
      } else if (err.response?.status === 409){
        alert('Invalid Crdentials')
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <Image
          src='/lg-sp-illustration.png'
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
            Don&apos;t have a Account? <Link href="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
