import { NextRequest, NextResponse } from "next/server";
import { AnimeModel } from "@/models/anime";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  if (!title) {
    return NextResponse.json(
      { message: "Missing title parameter" },
      { status: 404 }
    );
  }
  const animeInfo = await AnimeModel.getInfo(title);
  if (!Object.keys(animeInfo).length) {
    return NextResponse.json({ message: "Anime not found" }, { status: 404 });
  }

  return NextResponse.json(animeInfo, { status: 200 });
}
