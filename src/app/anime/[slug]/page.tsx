export const revalidate = 86400;
import AnimeInfo from "./AnimeInfo";
import "@/css/anime.css";

export default async function Page({ params }: any) {
  const title = params.slug;

  return <AnimeInfo title={title} />;
}
