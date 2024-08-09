import { Suspense } from "react";
import { SearchResults } from "@/sections/SearchResults";
export default async function Search({
  searchParams,
}: {
  searchParams: { q: string; pageNumber: number; filters: {} };
}) {
  return (
    <Suspense fallback={"loading..."}>
      <SearchResults {...searchParams} />
    </Suspense>
  );
}
