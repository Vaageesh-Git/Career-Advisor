"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        console.log("User data:", userDoc.exists() ? userDoc.data() : null);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const cards = [
    { title: "Explore Careers", description: "Check recommended career paths.", link: "/careers", color: "#FFB347" },
    { title: "Scholarships", description: "View scholarships you are eligible for.", link: "/scholarships", color: "#6A82FB" },
    { title: "Career Advice", description: "Get personalized guidance for your next steps.", link: "/advice", color: "#FF7EB3" },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome {user ? user.displayName : "Guest"}!</h1>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
