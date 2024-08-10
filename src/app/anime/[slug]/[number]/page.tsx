import "@/css/watch.css";
import VideoAnime from "@/sections/VideoAnime";
import { Suspense } from "react";
export default function Page({
  params,
}: {
  params: { slug: string; number: string };
}) {
  const { slug: title, number: episodeNumber } = params;

  return (
    <main>
      <h1 className="text-center capitalize text-2xl">
        {title.replaceAll("-", " ")} {episodeNumber}
      </h1>
      <Suspense fallback={"Loading..."}>
        <VideoAnime title={title} episodeNumber={episodeNumber} />
      </Suspense>
    </main>
  );
}
{
  /*  */
}
