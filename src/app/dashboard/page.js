"use client";
import React from "react";
import { Search,LayoutDashboard, GraduationCap, Bot, User } from "lucide-react";
import JobCard from "@/components/JobCard";
import ProgressChart from "@/components/ProgressChart";
import ProgressDashboard from "@/components/ProgressDashboard";
import TopScholarships from "@/components/TopScholarships";
import MenuBar from "@/components/MenuBar";
import { useMenu } from "../context/menuContext";

export default function Dashboard() {
  const { menuOpen,setMenuOpen } = useMenu();
  return (
    <div className="dashboard-main">
      <MenuBar/>
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
