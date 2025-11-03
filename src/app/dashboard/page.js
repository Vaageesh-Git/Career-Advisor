"use client";
import React, { useState } from "react";
import { Menu, LayoutDashboard, GraduationCap, Bot, User } from "lucide-react";
import { useMenu } from "../context/menuContext";

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
        <h2>Main Body</h2>
        <p>Stats or other dashboard details...</p>
      </div>
    </div>
  );
}
