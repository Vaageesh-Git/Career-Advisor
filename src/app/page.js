"use client"; 
import HomePageCard from "@/components/HomePageCard";
import { useEffect, useState, useRef } from "react";
import ProfileCard from "@/components/ProfileCard";
import cards from "@/data/topFeaturesHomeCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";


export default function HomePage() {
  const router = useRouter();
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
    async function auth() {
      const auth = await axios.get('/api/check-auth')
      console.log(auth.status)
      if (auth.status === 200){
        router.push('/dashboard')
      }
    }
    auth()
  },[])

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
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

          <div className="hero-content">
            <a href="/signup" className="get-started-btn">Get Started</a>
          </div>
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
        <div className="full-stats">
          <div className="stats-item">
            <span className="left-quotes">"</span>
            <p>Helping you uncover the career path that truly fits who you are not just what you do.</p>
            <span className="right-quotes">"</span>
          </div>
          <div className="count-styles">
            <h3>{careerCount} +</h3>
          </div>
        </div>

        <div className="full-stats">
          <div className="stats-item">
            <span className="left-quotes">"</span>
            <p>Real stories, real results empowering thousands to turn ambition into measurable success.</p>
            <span className="right-quotes">"</span>
          </div>
          <div className="count-styles">
              <h3>{successRateCount} +</h3>
          </div>
        </div>

        <div className="full-stats">
          <div className="stats-item">
            <span className="left-quotes">"</span>
            <p>Connecting you with roles that match your skills, passions, and the future you want to build.</p>
            <span className="right-quotes">"</span>
          </div>
          <div className="count-styles">
            <h3>{jobOpportunitiesCount} +</h3>
          </div>
        </div>

        <div className="full-stats">
          <div className="stats-item">
            <span className="left-quotes">"</span>
            <p>Bringing global scholarship opportunities to your fingertips, so nothing stands between you and your dreams.</p>
            <span className="right-quotes">"</span>
          </div>
          <div className="count-styles">
            <h3>{scholarshipsCount} +</h3>
          </div>
        </div>

      </div>

      <div className="top-profiles-container">
        <h2 className="section-title" style={{marginLeft: "2rem", background: "black", width : "13rem", padding : "1em" , borderRadius : "20px" , color : "white"}}>Our Top Stories</h2>
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
        <p style={{marginBottom : "3em"}}>Join thousands of professionals who have found their perfect career path with CareerNavigator.</p>
        <a href="/signup" className="get-started-btn">Get Started</a>
      </div>
    </div>
  );
}

