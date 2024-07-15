import { Anime } from "@/types/anime";
import Image from "next/image";
export default async function Page({ params }: { params: { slug: string } }) {
  const title = params.slug;
  const info = await getAnimeInfo(title);
  return (
    <>
      <h1>{info.title}</h1>
      <div style={{ width: "25dvw" }}>
        <Image
          src={info.img || ""}
          alt={info.title || ""}
          width={500}
          height={500}
        ></Image>
      </div>
      <p>{info.sinopsis}</p>
    </>
  );
}

async function getAnimeInfo(title: string) {
  const env = process.env.NODE_ENV;
  const dev = env !== "production";
  const url = dev
    ? `http://${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}`
    : `https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}`;

  const res = await fetch(`${url}/api/getAnimeInfo?title=${title}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  const animeInfo: Promise<Anime> = res.json();
  return animeInfo;
}
