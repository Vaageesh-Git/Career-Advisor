import Image from "next/image";

export default function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <Image src={user.avatar} alt="User Avatar" className="profile-avatar" width={40} height={40}/>
      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-email">{user.email}</p>
      <p className="profile-role">{user.role}</p>
      <p className="profile-bio">{user.bio}</p>
    </div>
  );
}