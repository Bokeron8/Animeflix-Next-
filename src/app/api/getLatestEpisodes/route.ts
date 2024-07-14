import { NextResponse } from "next/server";
import { EpisodeModel } from "@/models/episode";

export async function GET(request: Request) {
  const latestEpisodes = await EpisodeModel.getLatest();

  return NextResponse.json(latestEpisodes, { status: 200 });
}
