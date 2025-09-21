"use client";

import { useEffect, useState } from "react";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    // Placeholder data — replace with Firestore fetch later
    const placeholderScholarships = [
      {
        name: "AI Excellence Scholarship",
        amount: "$2000",
        eligibility: "Students interested in AI",
        deadline: "2025-12-31",
        link: "#"
      },
      {
        name: "Global Innovators Grant",
        amount: "$1500",
        eligibility: "Open to international students",
        deadline: "2025-11-15",
        link: "#"
      },
      {
        name: "Women in Tech Scholarship",
        amount: "$1000",
        eligibility: "Female students in STEM",
        deadline: "2025-10-10",
        link: "#"
      },
    ];

    setScholarships(placeholderScholarships);
  }, []);

  return (
    <div className="scholarships-container">
      <h1>Scholarships</h1>
      <div className="scholarship-list">
        {scholarships.map((sch, index) => (
          <div key={index} className="scholarship-card">
            <h2>{sch.name}</h2>
            <p><strong>Amount:</strong> {sch.amount}</p>
            <p><strong>Eligibility:</strong> {sch.eligibility}</p>
            <p><strong>Deadline:</strong> {sch.deadline}</p>
            <a href={sch.link} target="_blank" rel="noopener noreferrer" className="btn">Apply</a>
          </div>
        ))}
      </div>
    </div>
  );
}
