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
import { useAuth } from "../context/authContext";
import Loader from "@/components/loader";


export default function Dashboard() {
  const router = useRouter();
  const { menuOpen } = useMenu();
  const { data } = useDataContext();
  const { loggedIn } = useAuth();
  
  useEffect(() => {
    if (loggedIn === false) router.push("/");
  }, [loggedIn]);


  if (loggedIn === null) {
    return <Loader/>;
  }

  if ( !data) {
    return <Loader/>
  }

  return (
    <div className="dashboard-main">
      <MenuBar/>
      <div className={`dashboard-content ${menuOpen ? "" : "expanded"}`}>

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
