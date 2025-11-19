"use client";
import React from "react";
import { Search, Globe, GraduationCap, Star } from "lucide-react";
import { useMenu } from "../context/menuContext";
import MenuBar from "@/components/MenuBar";
import { useDataContext } from "../context/aiDataContext";

export default function ScholarshipsPage() {
  const {data} = useDataContext();
  const { menuOpen } = useMenu();
  if (!data) {
    return <h2>Loading scholarships...</h2>;
  }

  const scholarships = data.scholarshipMatches || [];
  const topPicks = data.topPicks || [];

  return (
    <div className="scholarships-page-main">
      <MenuBar/>
      <div className="scholarships-page">

        <section className="scholarship-hero">
          <h1>Find the Best Scholarships for You 🎓</h1>
          <p>Explore global opportunities tailored to your career goals.</p>
          <div className="search-section">
            <input type="text" placeholder="Search by field, country or name..." />
            <button><Search size={20}/> Search</button>
          </div>
        </section>


        <section className="featured-scholarships">
          <h2>🌟 Featured Scholarships</h2>
          <div className="scholarship-grid">
            {scholarships.map((sch, idx) => (
              <div className="scholarship-card" key={idx}>
                <div className="card-header">
                  <GraduationCap size={22} color="#004aad"/>
                  <h3>{sch.name}</h3>
                </div>
                <p>{sch.description}</p>
                <div className="card-footer">
                  <span><Globe size={16}/> {sch.country}</span>
                  <span>⏰ {sch.deadline}</span>
                </div>
                <button>Apply Now</button>
              </div>
            ))}
          </div>
        </section>


        <section className="top-scholarships-carousel">
          <h2>🏆 Top Picks for You</h2>
          <div className="scroll-container">
            {topPicks.map((pick, i) => (
              <div key={i} className="scholarship-page-card">
                <Star size={18} color="#FFD700" />
                <h4>{pick.title}</h4>
                <p>{pick.desc}</p>
                <button>View Details</button>
              </div>
            ))}
          </div>
        </section>


        <section className="scholarship-cta">
          <h2>✨ Want Personalized Scholarship Matches?</h2>
          <p>Answer a few questions and get scholarships that fit your profile.</p>
          <button>Get Started</button>
        </section>
      </div>
    </div>
  );
}
