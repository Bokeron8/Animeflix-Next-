import { VideoServerModel } from "@/models/videoServer";
import AnimeVideo from "@/components/AnimeVideo";
async function VideoAnime({
  title,
  episodeNumber,
}: {
  title: string;
  episodeNumber: string;
}) {
  const episodeInfo = {
    title,
    episodeNumber,
    img: `https://cdn.jkdesu.com/assets/images/animes/image/${title}.jpg`,
    href: `/anime/${title}/${episodeNumber}`,
  };
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
        type: "",
      },
    ],
  };
  const filteredServers = videoServers.filter(
    (server) => server.url != "" && server.type == "video"
  );
  return (
    <>
      <AnimeVideo
        videoServers={filteredServers}
        videoJsOptions={videoJsOptions}
        episodeInfo={episodeInfo}
      />
    </>
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
