import { VideoServerModel } from "@/models/videoServer";
import { Button } from "@nextui-org/react";
import VideoJS from "@/components/VideoJS";
import Link from "next/link";
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
  return (
    <>
      <div>
        <VideoJS options={videoJsOptions} episodeInfo={episodeInfo} />
      </div>
      <div className="flex justify-between mt-2">
        <Button
          as={Link}
          color="primary"
          href={`/anime/${title}/${Number(episodeNumber) - 1}`}
        >
          Back
        </Button>
        <Button
          as={Link}
          color="primary"
          href={`/anime/${title}/${Number(episodeNumber) + 1}`}
        >
          Next
        </Button>
      </div>
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
