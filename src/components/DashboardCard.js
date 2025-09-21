import Link from "next/link";

export default function DashboardCard({ title, description, link, color }) {
  return (
    <Link href={link}>
      <div className="dashboard-card" style={{ background: color }}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}
