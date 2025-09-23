"use client"; 
import Image from "next/image";
import HomePageCard from "@/components/HomePageCard";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import AuthButton from "@/components/AuthButton";
import cards from "@/data/topFeaturesHomeCard";
import { useRef } from "react";

export default function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const careerRef = useRef(null);     
  const statsRef = useRef(null);      
  const counterStarted = useRef(false);

  useEffect(() => {
    fetch('/api/profiles')
      .then(response => response.json())
      .then(data => setProfiles(data))
      .catch(error => console.error('Error fetching profiles:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current || counterStarted.current) return;

      const rect = statsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight - 100) {
        counterStarted.current = true;

        let count = 0;
        const end = 250;
        setTimeout(() => {
          const interval = setInterval(() => {
          count++;
          if (careerRef.current) careerRef.current.textContent = count + "+";
          if (count >= end) clearInterval(interval);
        }, 10);
        }, 500);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        {cards.map((i)=>
          <HomePageCard
            key={i}
            title={i.title}
            description={i.description}
            imageSrc={i.imageSrc}
          />)
        }
      </div>

      <div className="top-profiles-container">
        <h2 className="section-title" style={{marginLeft: "2rem"}}>Our Top Successor</h2>
        <div className="profiles-list">
          <div className="profiles-scroller">
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

      <div className="stats" ref={statsRef}>
        <div>
          <h3 ref={careerRef}>0+</h3>
          <p>Careers Explored</p>
        </div>

        <div>
          <h3>95+</h3>
          <p>Success Rate</p>
        </div>

        <div>
          <h3>500+</h3>
          <p>Job Opportunities</p>
        </div>

        <div>
          <h3>100+</h3>
          <p>Scholarships</p>
        </div>

      </div>
    </div>
  );
}

