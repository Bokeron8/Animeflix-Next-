import { AnimeModel } from "@/models/anime";
import Link from "next/link";
import Image from "next/image";

export async function SearchResults({
  q,
  pageNumber,
  filters,
}: {
  q: string;
  pageNumber: number;
  filters?: any;
}) {
  const results = await fetchSearchResults({ q, pageNumber, filters });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {results.map((anime, idx) => (
        <Link href={anime.href} key={idx} className="w-[250px] md:w-[300px]">
          {anime.title}
          <Image src={anime.coverSrc} alt="hola" width={500} height={500} />
        </Link>
      ))}
    </div>
  );
}

async function fetchSearchResults({
  q,
  pageNumber,
  filters,
}: {
  q: string;
  pageNumber: number;
  filters?: any;
}) {
  const results = AnimeModel.searchAnime({ query: q, pageNumber, filters });
  return results;
}
