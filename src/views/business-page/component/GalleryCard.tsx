import React from "react";
import Image from "next/image";

interface GalleryCardProps {
  colorClass: string;
  icon: React.ReactNode;
  imageUrl?: string;
}

export default function GalleryCard({ colorClass, icon, imageUrl }: GalleryCardProps) {
  return (
    <div className={`gallery-photo-card gallery-photo-card-wrap ${colorClass}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Gallery Image"
          fill
          sizes="(max-width: 768px) 33vw, 20vw"
          className="gallery-img-fill"
        />
      ) : (
        icon
      )}
    </div>
  );
}
