"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressDashboard() {
  const overallProgress = 78;

  const skills = [
    { name: "Communication", value: 85 },
    { name: "Problem Solving", value: 70 },
    { name: "Leadership", value: 60 },
    { name: "Creativity", value: 90 },
  ];

  return (
    <div className="progress-dashboard">
      <h2 className="progress-title">Your Progress Overview</h2>

      {/* Circular Progress */}
      <div className="circular-progress">
        <CircularProgressbar
          value={overallProgress}
          text={`${overallProgress}%`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: "#004aad",
            pathColor: "#004aad",
            trailColor: "#d6e4ff",
            textSize: "16px",
          })}
        />
      </div>

      {/* Skill Bars */}
      <div className="skills-section">
        <h3 className="skills-title">Skill Breakdown</h3>
        {skills.map((skill, idx) => (
          <div key={idx} className="skill-bar">
            <div className="skill-label">
              <span>{skill.name}</span>
              <span>{skill.value}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${skill.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="achievements-section">
        <h3>Recent Achievements</h3>
        <ul>
            <li>🏆 Completed 5 career quizzes</li>
            <li>💬 Improved communication skill by 10%</li>
            <li>🎯 Matched with 3 new job opportunities</li>
        </ul>
        </div>
    </div>
  );
}
