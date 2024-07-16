import { VideoJS } from "@/components/VideoJS";
import "@/css/watch.css";
import { BASE_URL } from "@/libs/utils";
import { VideoServerModel } from "@/models/videoServer";

export default async function Page({
  params,
}: {
  params: { slug: string; number: string };
}) {
  const title = params.slug;
  const episodeNumber = params.number;
  const videoServers = await getVideoServers({ title, episodeNumber });

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoServers[videoServers.length - 1].url,
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

async function getVideoServers({
  title,
  episodeNumber,
}: {
  title: string;
  episodeNumber: string;
}) {
  /* const res = await fetch(
    `${BASE_URL}/api/getVideoServers?title=${title}&episode_number=${episodeNumber}`,
    { cache: "reload" }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    const json = await res.json();
    console.log(json);
    throw new Error("Failed to fetch data");
  }
  const latestEpisodes = res.json(); */
  const servers = VideoServerModel.getServers({
    title,
    chapter: episodeNumber,
  });
  return servers;
}
