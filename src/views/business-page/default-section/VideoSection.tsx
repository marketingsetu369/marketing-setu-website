"use client";

import { getYouTubeId } from "../common/utils";

interface VideoSectionProps {
  youtubeUrl?: string;
  sectionClass: string;
}

export default function VideoSection({ youtubeUrl, sectionClass }: VideoSectionProps) {
  const videoId = getYouTubeId(youtubeUrl);
  if (!youtubeUrl || !videoId) return null;

  return (
    <section className={`animate-fade-in-up ${sectionClass}`}>
      <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gray-100 relative group shadow-md">
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
