"use client";
import { Button } from "@nextui-org/react";
import VideoJS from "@/components/VideoJS";
import Link from "next/link";
import { ServerType } from "@/models/videoServer";
import { useState } from "react";

function AnimeVideo({
  videoServers,
  videoJsOptions,
  episodeInfo,
}: {
  videoServers: ServerType[];
  videoJsOptions: {};
  episodeInfo: { title: string; episodeNumber: string };
}) {
  const [serverURL, setServerURL] = useState(
    videoServers.length ? videoServers[videoServers.length - 1].url : ""
  );
  const { title, episodeNumber } = episodeInfo;
  return (
    <>
      <div>
        {videoServers.map((server, idx) => (
          <Button key={idx} onClick={() => setServerURL(server.url)}>
            {server.server}
          </Button>
        ))}
      </div>
      <div>
        <VideoJS
          options={videoJsOptions}
          episodeInfo={episodeInfo}
          serverURL={serverURL}
        />
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

export default AnimeVideo;
