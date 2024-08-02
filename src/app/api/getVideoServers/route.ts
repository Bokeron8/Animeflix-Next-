import { NextRequest, NextResponse } from "next/server";
import { VideoServerModel } from "@/models/videoServer";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const chapter = request.nextUrl.searchParams.get("episode_number");
  if (!title || !chapter) {
    return NextResponse.json(
      { message: "missing parameters" },
      { status: 404 }
    );
  }
  const videoServers = await VideoServerModel.getServers({
    title: title,
    chapter: chapter,
  });
  return NextResponse.json(videoServers, { status: 200 });
}
