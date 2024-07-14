import React from "react";
import { Episode } from "@/types/episode";
import Link from "next/link";
import Image from "next/image";
async function getLatestEpisodes() {
  const res = await fetch("http://localhost:3000/api/test", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const latestEpisodes: Promise<Episode[]> = res.json();
  return latestEpisodes;
}

async function Test() {
  const latestEpisodes: Episode[] = await getLatestEpisodes();
  console.log(latestEpisodes);
  return latestEpisodes.map((anime: Episode) => (
    <>
      <Link href={anime.href}>
        <h1>
          {anime.title}-{anime.episodeNumber}
        </h1>
        <div>
          <Image src={anime.img} alt={anime.title} width={500} height={500} />
        </div>
      </Link>
    </>
  ));
}

export default Test;
