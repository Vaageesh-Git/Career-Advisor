"use client"; // Only needed if using hooks, safe to include
import Link from "next/link"; 
import Image from "next/image";
import HomePageCard from "@/components/HomePageCard";

export default function HomePage() {
  return (
    <div className="home-container">
      <Image src="/cover_img.png" alt="cover_image" width={1330} height={500}
          style={{ width: "100%"}}
      />
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
    </div>
  );
}

