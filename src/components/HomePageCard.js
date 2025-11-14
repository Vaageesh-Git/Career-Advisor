"use client"
import Image from "next/image";

export default function HomePageCard({ title, description, imageSrc }) {
  return (
    <div className="homepage-card">
      <Image src={imageSrc} alt={title} width={300} height={200} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}