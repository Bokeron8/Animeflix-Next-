export const dynamic = "force-dynamic";
import { Episode } from "@/types/episode";
import Carrousel from "@/components/Carrousel";
import "@/css/carrousel.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
export default async function Home() {
  const latestEpisodes: Episode[] = await getLatestEpisodes();
  const mostVotedAnimesBySeason: Episode[] = await getMostVotedAnimesBySeason();
  return (
    <>
      <section>
        <h3>Episodios recientes</h3>
        <Carrousel items={latestEpisodes} />
      </section>
      <section>
        <h3>Animes mas votados de la temporada</h3>
        <Carrousel items={mostVotedAnimesBySeason} />
      </section>
    </>
  );
}
async function getLatestEpisodes() {
  const env = process.env.NODE_ENV;
  const dev = env !== "production";
  const url = dev
    ? `http://${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}`
    : `https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}`;

  const res = await fetch(`${url}/api/getLatestEpisodes`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  const latestEpisodes: Promise<Episode[]> = res.json();
  return latestEpisodes;
}

async function getMostVotedAnimesBySeason() {
  const env = process.env.NODE_ENV;
  const dev = env !== "production";
  const url = dev
    ? `http://${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}`
    : `https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}`;

  const res = await fetch(`${url}/api/getMostVotedAnimesBySeason`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  const latestEpisodes: Promise<Episode[]> = res.json();
  return latestEpisodes;
}
