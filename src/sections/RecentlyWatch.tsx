"use client";
import Carrousel from "@/components/Carrousel";
import { useEffect, useState } from "react";
export function RecentlyWatch() {
  const [watchingList, setWatchingList] = useState();
  useEffect(() => {
    const episodes = JSON.parse(localStorage.getItem("watching-list")!);
    setWatchingList(episodes);
  }, []);

  return (
    watchingList && (
      <section>
        <h2 className="text-1xl font-semibold">Recientemente visto</h2>
        <Carrousel items={watchingList} />
      </section>
    )
  );
}
