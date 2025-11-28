"use client";
import React,{useState,useEffect, use} from "react";
import Image from "next/image";
import { Edit, Mail, MapPin, Briefcase, Award } from "lucide-react";
import ProgressChart from "@/components/ProgressChart";
import MenuBar from "@/components/MenuBar";
import { useDataContext } from "../context/aiDataContext";
import axios from "axios";

export default function ProfilePage() {
  const {data, setData} = useDataContext();
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value)
  }

  const handleEdit = () => {
    setEditOpen(!editOpen)
  }

const handleEmailChnage = async () => {
  if (emailInput === "") {
    setEditOpen(false);
    return;
  }

  if (emailInput === user.email) {
    alert("New email cannot be the same as the old email.");
    return;
  }

  const data = {
    existingEmail: user.email,
    updatedEmail: emailInput
  };

  try {
    const response = await axios.patch("/api/profile-update", data);

      if (response.status === 200) {
        alert("Email updated successfully!");
        setUser(response.data.data)
        setEditOpen(false);
      } 
      else if (response.status === 409) {
        alert(response.data);
      }

  } catch (err) {
      alert(err.response?.data?.message || "Server Error");
    }
  };

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/profile");
      const data = await res.json();

      if (data.user){
        setUser(data.user);
      } 
    }

    loadUser();
  }, []);

  if (!user || !data) return <p>Loading...</p>;

  return (
    <div className="profile-page-main">
      <MenuBar />
      <div className="profile-page">    

        <div className="profile-header">
          <div className="profile-avatar">
            <Image
              src="/profilePic.webp"
              alt="User Avatar"
              width={220}
              height={220}
            />
            <button className="edit-btn" onClick={handleEdit}>
              <Edit size={18} /> Edit
            </button>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <div className="profile-meta">
              <p><Mail size={16}/> 
              {
                editOpen ? 
                <>
                  <input placeholder="Enter New Email..." onChange={handleEmailInput}/>
                  <button onClick={handleEmailChnage}>DONE</button>
                </>
                : 
                user.email
              }
              </p>
              <p><MapPin size={16}/> {user.location}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Skill Progress</h2>
          <ProgressChart progress={data.progressInsights}/>
          
        </div>

        <div className="profile-section">
          <h2>Core Skills</h2>
          <div className="skills-container">
            {data.progressInsights.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill.name}</span>
            ))}
          </div>
        </div>

        <div className="profile-section achievements">
          <h2>Recent Achievements</h2>
          <ul>
            <li>🏆 Completed Advanced React Course</li>
            <li>💼 Secured Internship at TechNova</li>
            <li>📈 Improved problem-solving skills by 40%</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
