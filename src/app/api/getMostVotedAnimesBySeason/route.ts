import { NextResponse } from "next/server";
import { AnimeModel } from "@/models/anime";

export async function GET(request: Request) {
  const mostVoted = await AnimeModel.getMostVotedAnimeBySeason({});

  return NextResponse.json(mostVoted, { status: 200 });
}
