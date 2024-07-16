import { Anime } from "@/types/anime";
import "@/css/anime.css";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/libs/utils";
import { AnimeModel } from "@/models/anime";
export default async function Page({ params }: { params: { slug: string } }) {
  const title = params.slug;
  const anime = await getAnimeInfo(title);
  return (
    <main>
      <h1>{anime.title}</h1>
      <div className="info">
        <Image
          src={anime.img || ""}
          alt={anime.title || ""}
          width={500}
          height={500}
        ></Image>
        <p>{anime.sinopsis}</p>
      </div>

      <ul className="episode-list">
        {Array.from({ length: Number(anime.info?.Episodios) }, (_, idx) => (
          <li className="episode" key={crypto.randomUUID()}>
            <Link href={`${BASE_URL}/anime/${title}/${idx + 1}`}>
              Episodio {idx + 1}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

async function getAnimeInfo(title: string) {
  /* const res = await fetch(`${BASE_URL}/api/getAnimeInfo?title=${title}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  const animeInfo: Promise<Anime> = res.json(); */
  const animeInfo: Promise<Anime> = AnimeModel.getInfo(title);
  return animeInfo;
}
