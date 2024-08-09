import { Image, Skeleton } from "@nextui-org/react";

function AnimeInfoSkeleton() {
  return (
    <main className="mt-6">
      <Skeleton className="w-64 h-8 rounded-sm mb-6 text-center mx-auto" />

      <div className="grid md:grid-cols-[1fr,2fr] grid-cols-1 gap-2">
        <Image isLoading width={500} height={500} alt="loading anime cover" />
        <Skeleton className="w-full h-[300px] rounded-md" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] mt-6 gap-3">
        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />

        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />
        <Skeleton className="w-full p-6" />
      </div>
    </main>
  );
}

export default AnimeInfoSkeleton;
