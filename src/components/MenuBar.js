"use client"
import React from "react";
import { Search,LayoutDashboard, GraduationCap, Bot, User } from "lucide-react";
import { useMenu } from "@/app/context/menuContext";

export default function MenuBar(){
    const { menuOpen } = useMenu();
    return (
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
    )
}