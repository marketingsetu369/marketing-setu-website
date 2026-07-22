import React from "react";

interface ProfileCardProps {
  businessName: string;
  category: string;
  description: string;
  logo: React.ReactNode;
}

export default function ProfileCard({ businessName, category, description, logo }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="logo-badge">
        {logo}
      </div>
      <h1 className="business-title">{businessName}</h1>
      <div className="category-tag">{category}</div>
      <p className="business-description">{description}</p>
    </div>
  );
}
