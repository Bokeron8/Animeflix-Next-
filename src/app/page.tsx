import { Episode } from "@/types/episode";
import Carrousel from "@/components/Carrousel";
import "@/css/carrousel.css";
import { BASE_URL } from "@/libs/utils";
import { AnimeModel } from "@/models/anime";
import { EpisodeModel } from "@/models/episode";

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
