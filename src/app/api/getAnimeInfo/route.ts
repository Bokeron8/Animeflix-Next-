import { NextResponse } from "next/server";
import { AnimeModel } from "@/models/anime";

export async function GET(request: Request) {
  const animeInfo = await AnimeModel.getInfo("spy-x-family");

  return NextResponse.json(animeInfo, { status: 200 });
}
