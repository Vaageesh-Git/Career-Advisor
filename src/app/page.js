"use client"; 
import Link from "next/link"; 
import Image from "next/image";
import HomePageCard from "@/components/HomePageCard";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import AuthButton from "@/components/AuthButton";

export default function HomePage() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/api/profiles')
      .then(response => response.json())
      .then(data => setProfiles(data))
      .catch(error => console.error('Error fetching profiles:', error));
  }, []);

  return (
    <div className="home-container">
      <div className="homepage-hero">
        <Image src="/hero_img.png" alt="cover_image" width={1330} height={500}
            style={{ width: "100%"}}
        />
        <AuthButton buttonText="Get Started"/>
      </div>
      <div className="homepage-cards-container">
        {[0,1,2].map((i)=>
          <HomePageCard
            key={i}
            title={i===0 ? "Explore Careers" : i===1 ? "Find Scholarships" : "Get Career Advice"}
            description={i===0 ? "Discover a wide range of career options tailored to your interests and skills." : i===1 ? "Access a curated list of scholarships to support your educational journey." : "Receive personalized advice to help you navigate your career path."}
            imageSrc={i===0 ? "/careers.png" : i===1 ? "/scholarships.png" : "/advice.png"}
          />)
        }
      </div>

      <div className="top-profiles-container">
        <h2 className="section-title" style={{marginLeft: "2rem"}}>Our Top Successor</h2>
        <div className="profiles-list">
          {profiles.map((user) => (
            <ProfileCard key={user.id} user={{
              avatar: user.image || "/default_avatar.png",
              name: user.name || "Loading...",
              email: user.email || "Loading...",
              bio: user.bio || "Loading...",
              role : user.role || "Loading..."
            }} />
          ))
          }
        </div>
      </div>
    </div>
  );
}

