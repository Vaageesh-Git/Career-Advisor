"use client"; 
import Image from "next/image";
import HomePageCard from "@/components/HomePageCard";
import { useEffect, useState, useRef } from "react";
import ProfileCard from "@/components/ProfileCard";
import AuthButton from "@/components/AuthButton";
import cards from "@/data/topFeaturesHomeCard";

export default function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const [careerCount, setCareerCount] = useState(0);
  const [successRateCount, setSuccessRateCount] = useState(0);
  const [jobOpportunitiesCount, setJobOpportunitieCount] = useState(0);
  const [scholarshipsCount, setScholarshipsCount] = useState(0);
  const footerText = "Ready to Transform Your Career?";
  const [footerCtaText, setFooterCtaText] = useState("");
  const statsRef = useRef(null);       
  const counterStarted = useRef(false);
  const footerRef = useRef(null);

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

        const duration = 2000;
        const steps = 100;
        const intervalTime = duration / steps;

        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep++;

          setCareerCount(Math.ceil((250 / steps) * currentStep));
          setSuccessRateCount(Math.ceil((95 / steps) * currentStep));
          setJobOpportunitieCount(Math.ceil((500 / steps) * currentStep));
          setScholarshipsCount(Math.ceil((100 / steps) * currentStep));

          if (currentStep >= steps){
            clearInterval(interval);
          }
        }, intervalTime);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let interval;
    let index = 0;

    const handleScroll = () => {
      if (!footerRef.current) return;

      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight - 50) {
        window.removeEventListener("scroll", handleScroll);

        interval = setInterval(() => {
          setFooterCtaText(footerText.slice(0, index + 1));
          index += 1;
          if (index === footerText.length) {
            clearInterval(interval);
          }
        }, 90);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
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

      <div className="stats" ref={statsRef}>
        <div className="stats-item">
          <h3>{careerCount} +</h3>
          <p>Careers Explored</p>
        </div>

        <div className="stats-item">
          <h3>{successRateCount} +</h3>
          <p>Success Rate</p>
        </div>

        <div className="stats-item">
          <h3>{jobOpportunitiesCount} +</h3>
          <p>Job Opportunities</p>
        </div>

        <div className="stats-item">
          <h3>{scholarshipsCount} +</h3>
          <p>Scholarships</p>
        </div>

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

      <div className="footer-cta" ref={footerRef}>
        <h1>
          {footerCtaText}
        </h1>
        <p>Join thousands of professionals who have found their perfect career path with CareerNavigator.</p>
        <AuthButton buttonText="Get Started Free"/>
      </div>
    </div>
  );
}

