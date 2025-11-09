"use client";
import React from "react";
import { Search,LayoutDashboard, GraduationCap, Bot, User } from "lucide-react";
import { useMenu } from "../context/menuContext";
import JobCard from "@/components/JobCard";
import ProgressChart from "@/components/ProgressChart";
import ProgressDashboard from "@/components/ProgressDashboard";
import TopScholarships from "@/components/TopScholarships";

export default function Dashboard() {
    const { menuOpen } = useMenu();

  return (
    <div className="dashboard-main">
      <div className={`dashboard-menu ${menuOpen ? "open" : "closed"}`}>

        {menuOpen && (
          <>
            <div className="dashboard-menu-item">
              <LayoutDashboard size={20} color="#fff" />
              <p>Dashboard</p>
            </div>
            <div className="dashboard-menu-item">
              <GraduationCap size={20} color="#fff" />
              <p>Scholarships</p>
            </div>
            <div className="dashboard-menu-item">
              <Bot size={20} color="#fff" />
              <p>AI Career Guidance</p>
            </div>
            <div className="dashboard-menu-item">
              <User size={20} color="#fff" />
              <p>Profile</p>
            </div>
          </>
        )}
      </div>

      <div className={`dashboard-content ${menuOpen ? "" : "expanded"}`}>
        <div className="search-container">
          <input placeholder="Search Job Here...." className="search-bar"/>
          <button className="search-btn"><Search size={20}/></button>
        </div>

        <h1>Recommended Jobs...</h1>

        <div className="jobcard-container">
          <JobCard/>
          <JobCard/>
          <JobCard/>
          <JobCard/>
          <JobCard/>

        </div>

        <ProgressChart />
        <TopScholarships />
      </div>

      <ProgressDashboard/>
    </div>
  );
}
