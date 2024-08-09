import { NextRequest, NextResponse } from "next/server";
import { AnimeModel } from "@/models/anime";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const pageNumber = Number(request.nextUrl.searchParams.get("page_number"));
  const filters = request.nextUrl.searchParams.get("filters");
  if (!query) {
    return NextResponse.json({ message: "missing query" }, { status: 404 });
  }
  const results = await AnimeModel.searchAnime({
    query,
    pageNumber,
    filters,
  });
  return NextResponse.json(results, { status: 200 });
}
