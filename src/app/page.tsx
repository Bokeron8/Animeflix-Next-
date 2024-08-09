export const revalidate = 60;
import { Episode } from "@/types/episode";
import Carrousel from "@/components/Carrousel";
import "@/css/carrousel.css";
import { BASE_URL } from "@/libs/consts";
import { AnimeModel } from "@/models/anime";
import { EpisodeModel } from "@/models/episode";
export default async function Home() {
  const latestEpisodes: Episode[] = await getLatestEpisodes();
  const mostVotedAnimesBySeason: Episode[] = await getMostVotedAnimesBySeason();
  return (
    <>
      <section>
        <h2 className="text-1xl font-semibold">Episodios recientes</h2>
        <Carrousel items={latestEpisodes} />
      </section>
      <section>
        <h2 className="text-1xl font-semibold">
          Animes mas votados de la temporada
        </h2>
        <Carrousel items={mostVotedAnimesBySeason} />
      </section>
    </>
  );
}
async function getLatestEpisodes() {
  /* const res = await fetch(`${BASE_URL}/api/getLatestEpisodes`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  const latestEpisodes: Promise<Episode[]> = res.json(); */
  const latestEpisodes = EpisodeModel.getLatest();
  return latestEpisodes;
}

async function getMostVotedAnimesBySeason() {
  /* const res = await fetch(`${BASE_URL}/api/getMostVotedAnimesBySeason`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  } */

  const latestEpisodes = AnimeModel.getMostVotedAnimeBySeason({});
  return latestEpisodes;
}
