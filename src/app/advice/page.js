"use client";

import { useEffect, useState } from "react";

export default function Advice() {
  const [advices, setAdvices] = useState([]);

  useEffect(() => {
    // Placeholder advice data — can later fetch AI-driven tips
    const placeholderAdvice = [
      {
        title: "Improve Your Resume",
        description: "Highlight relevant projects and skills. Keep it concise and clear.",
        color: "#FF7F50"
      },
      {
        title: "Learn In-Demand Skills",
        description: "Focus on skills that are trending in your chosen career path.",
        color: "#6A5ACD"
      },
      {
        title: "Network Actively",
        description: "Attend meetups, webinars, and connect with professionals in your field.",
        color: "#FFB347"
      }
    ];

    setAdvices(placeholderAdvice);
  }, []);

  return (
    <div className="advice-container">
      <h1>Career Advice</h1>
      <div className="advice-grid">
        {advices.map((advice, index) => (
          <div key={index} className="advice-card" style={{ background: advice.color }}>
            <h2>{advice.title}</h2>
            <p>{advice.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
