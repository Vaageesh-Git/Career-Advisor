"use client";
import React from "react";
import Image from "next/image";
import { Edit, Mail, MapPin, Briefcase, Award } from "lucide-react";
import ProgressChart from "@/components/ProgressChart";
import { useMenu } from "../context/menuContext";
import MenuBar from "@/components/MenuBar";
import { useDataContext } from "../context/aiDataContext";

export default function ProfilePage() {
  const { menuOpen } = useMenu();
  const {data, setData} = useDataContext();

  return (
    <div className="profile-page-main">
      <MenuBar />
      <div className="profile-page">    

        <div className="profile-header">
          <div className="profile-avatar">
            <Image
              src="/profile-pic.jpg"
              alt="User Avatar"
              width={120}
              height={120}
            />
            <button className="edit-btn">
              <Edit size={18} /> Edit
            </button>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profession">{user.profession}</p>
            <div className="profile-meta">
              <p><Mail size={16}/> {user.email}</p>
              <p><MapPin size={16}/> {user.location}</p>
            </div>
            <p className="bio">{user.bio}</p>
          </div>
        </div>

        <div className="profile-section">
          <h2>Skill Progress</h2>
          {/* <ProgressChart /> */}
        </div>

        <div className="profile-section">
          <h2>Your Badges</h2>
          <div className="badges-container">
            {user.badges.map((badge, idx) => (
              <div className="badge" key={idx}>
                <Award size={18} />
                {badge}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h2>Core Skills</h2>
          <div className="skills-container">
            {user.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
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
