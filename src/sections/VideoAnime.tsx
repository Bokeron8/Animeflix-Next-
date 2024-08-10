import { VideoServerModel } from "@/models/videoServer";
import VideoJS from "@/components/VideoJS";
async function VideoAnime({
  title,
  episodeNumber,
}: {
  title: string;
  episodeNumber: string;
}) {
  const videoServers = await fetchVideoServers({ title, episodeNumber });
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
    <div>
      <VideoJS options={videoJsOptions} />
    </div>
  );
}

async function fetchVideoServers({
  title,
  episodeNumber,
}: {
  title: string;
  episodeNumber: string;
}) {
  const servers = await VideoServerModel.getServers({
    title,
    chapter: episodeNumber,
  });
  return servers;
}

export default VideoAnime;
