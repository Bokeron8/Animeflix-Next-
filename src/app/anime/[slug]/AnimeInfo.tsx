import NextImage from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/libs/consts";
import { Anime } from "@/types/anime";
import { AnimeModel } from "@/models/anime";
import { Image } from "@nextui-org/react";
async function AnimeInfo({ title }: { title: string }) {
  const anime = await getAnimeInfo(title);
  return (
    <main className="mt-6">
      <h1 className="text-3xl text-center mb-6 font-bold">{anime.title}</h1>
      <div className="grid md:grid-cols-[1fr,2fr] grid-cols-1 gap-2">
        <div>
          <Image
            as={NextImage}
            src={anime.img || ""}
            alt={anime.title || ""}
            width={500}
            height={500}
          />
        </div>

        <p>{anime.sinopsis}</p>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] mt-6 gap-3">
        {Array.from({ length: Number(anime.info?.Episodios) }, (_, idx) => (
          <li className="w-full bg-red-600" key={crypto.randomUUID()}>
            <Link
              href={`/anime/${title}/${idx + 1}`}
              className="block p-6 w-full"
            >
              Episodio {idx + 1}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AnimeInfo;
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
