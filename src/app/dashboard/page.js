"use client";
import React, { useEffect,useState } from "react";
import { Search,LayoutDashboard, GraduationCap, Bot, User } from "lucide-react";
import JobCard from "@/components/JobCard";
import ProgressChart from "@/components/ProgressChart";
import ProgressDashboard from "@/components/ProgressDashboard";
import TopScholarships from "@/components/TopScholarships";
import MenuBar from "@/components/MenuBar";
import { useMenu } from "../context/menuContext";
import { useDataContext } from "../context/aiDataContext";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const router = useRouter();
  const { menuOpen } = useMenu();
  const { data } = useDataContext();

  if ( !data) {
    return <h2>Loading your personalized dashboard...</h2>;
  }
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
          {data.recommendedJobs.map((job, idx) => (
            <JobCard key={idx} job={job} />
          ))}

        </div>

        <ProgressChart progress={data.progressInsights}/>
        <TopScholarships scholarships={data.scholarshipMatches}/>
      </div>
      
      <ProgressDashboard insights={data.progressInsights} learningPaths={data.recommendedLearning}/>
    </div>
  );
}
