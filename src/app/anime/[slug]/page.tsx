export const revalidate = 86400;
import { Suspense } from "react";
import AnimeInfo from "./AnimeInfo";
import AnimeInfoSkeleton from "@/skeletons/AnimeInfoSkeleton";

export default async function Page({ params }: any) {
  const title = params.slug;

  return (
    <Suspense fallback={<AnimeInfoSkeleton />}>
      <AnimeInfo title={title} />
    </Suspense>
  );
}
