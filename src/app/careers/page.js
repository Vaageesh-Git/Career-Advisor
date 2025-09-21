"use client";

import { useEffect, useState } from "react";

export default function Careers() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    // Placeholder data — can later fetch from Firestore
    const placeholderCareers = [
      {
        title: "Software Developer",
        skills: ["JavaScript", "React", "Next.js", "Firebase"],
        description: "Build modern web applications using popular frameworks.",
        link: "#",
        color: "#FF7F50"
      },
      {
        title: "Data Scientist",
        skills: ["Python", "Machine Learning", "Statistics", "SQL"],
        description: "Analyze data and build predictive models.",
        link: "#",
        color: "#6A5ACD"
      },
      {
        title: "UI/UX Designer",
        skills: ["Figma", "Adobe XD", "User Research", "Wireframing"],
        description: "Design intuitive and beautiful user interfaces.",
        link: "#",
        color: "#FFB347"
      }
    ];

    setCareers(placeholderCareers);
  }, []);

  return (
    <div className="careers-container">
      <h1>Explore Career Paths</h1>
      <div className="careers-grid">
        {careers.map((career, index) => (
          <div key={index} className="career-card" style={{ background: career.color }}>
            <h2>{career.title}</h2>
            <p>{career.description}</p>
            <p><strong>Skills:</strong> {career.skills.join(", ")}</p>
            <a href={career.link} target="_blank" rel="noopener noreferrer" className="btn">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
}
