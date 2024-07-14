import { Episode } from "@/types/episode";
import Link from "next/link";
import Image from "next/image";
export const dynamic = "force-dynamic";
async function getLatestEpisodes() {
  const env = process.env.NODE_ENV;
  const dev = env !== "production";
  const url = dev
    ? `http://${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}`
    : `https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}`;

  const res = await fetch(`${url}/api/getLatestEpisodes`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  const latestEpisodes: Promise<Episode[]> = res.json();
  return latestEpisodes;
}
export default async function Home() {
  const latestEpisodes: Episode[] = await getLatestEpisodes();
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
