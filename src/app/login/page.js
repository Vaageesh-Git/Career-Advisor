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
  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    try{
      const response = await axios.post('/api/login',formData)
      if (response?.status === 200){
        setData(null);
        if (response.data.hasCompletedOnboarding === true){
          setLoggedIn(true)
          window.location.href = "/dashboard";
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
      } else if (err.response?.status === 401) {
        alert("All Fields Are Required.")
      } else {
        alert("Internal DB Error")
      }
    } finally{
      setLoading(false)
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

          <button type="submit"
              className={loading ? `loader-btn loading` : "signup-btn"}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span className="btn-spinner"></span> : "Log In"}
          </button>

          <p className="login-link">
            Don&apos;t have a Account? <Link href="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
