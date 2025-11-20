"use client"
import React from "react";
import { Search,LayoutDashboard, GraduationCap, Bot, User } from "lucide-react";
import { useMenu } from "@/app/context/menuContext";
import { useRouter } from "next/navigation";

export default function MenuBar(){
    const { menuOpen } = useMenu();
    const router = useRouter();
    const toDashboard = () => {
      router.push('/dashboard')
    }

    const toScholarships = () => {
      router.push('/scholarships')
    }

    const toAiGuidance = () => {
      router.push('/aiGuidance')
    }

    const toProfile = () => {
      router.push('/profile')
    }
    return (
      <div className={`dashboard-menu ${menuOpen ? "open" : "closed"}`}>
        {menuOpen && (
        <>
            <div className="dashboard-menu-item" onClick={toDashboard}>
              <LayoutDashboard size={20} color="#fff" />
              <p>Dashboard</p>
            </div>
            <div className="dashboard-menu-item" onClick={toScholarships}>
              <GraduationCap size={20} color="#fff" />
              <p>Scholarships</p>
            </div>
            <div className="dashboard-menu-item" onClick={toAiGuidance}>
              <Bot size={20} color="#fff" />
              <p>AI Career Guidance</p>
            </div>
            <div className="dashboard-menu-item" onClick={toProfile}>
              <User size={20} color="#fff" />
              <p>Profile</p>
            </div>
        </>
        )}
        </div>
    )
}