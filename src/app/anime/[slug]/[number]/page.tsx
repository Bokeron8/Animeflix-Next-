"use client";
import { VideoJS } from "@/components/VideoJS";
import "@/css/watch.css";
import { useEffect, useState } from "react";
import { VideoServer } from "@/types/videoServer";
export default function Page({
  params,
}: {
  params: { slug: string; number: string };
}) {
  const { slug: title, number: episodeNumber } = params;
  const [videoServers, setVideoServers] = useState<VideoServer[]>([]);
  useEffect(() => {
    const fetchServers = async () => {
      const res = await fetch(
        `/api/getVideoServers?title=${title}&episode_number=${episodeNumber}`
      );
      const servers = await res.json();
      setVideoServers(servers);
    };
    fetchServers();
  }, [title, episodeNumber]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoServers.length
          ? videoServers[videoServers.length - 1].url
          : "",
      },
    ],
  };

  return (
    <main>
      <h1 id="anime-title">
        {title.replaceAll("-", " ")} {episodeNumber}
      </h1>
      <div className="video-container">
        <VideoJS options={videoJsOptions} />
      </div>
    </main>
  );
}
