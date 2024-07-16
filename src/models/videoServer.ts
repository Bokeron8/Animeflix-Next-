//@ts-nocheck
import { BASE_URL, baseURL, getHTML, getVideos } from "@/libs/utils";

export class VideoServerModel {
  static async getServers({
    title,
    chapter,
  }: {
    title: string;
    chapter: string;
  }) {
    const url = `${baseURL}${title}/${chapter}/`;
    const $ = await getHTML({ url, revalidate: false });
    const animeCover = $("div.video-info > div.video-portada").children(
      "img"
    ).attr;
    const scripts = $("script");
    const script = scripts.filter((idx, s) => {
      if (!s.children[0]) return false;
      return s.children[0].data.includes("video = []");
    })[0].children[0].data;
    const videoReg = /video\[[0-9]*\] = .* src="\/([^\s]*)"/g;
    const [url1, url2] = [...script.matchAll(videoReg)].map(
      (el) => `${baseURL}${el[1]}`
    );
    const regex = new RegExp("servers = (.*])");
    const match = eval(script.match(regex)[1]);
    const parsedData = match.map((e) => ({ ...e, remote: atob(e.remote) }));
    const servers = parsedData;

    servers.push({ remote: url1, server: "Server 1" });
    servers.push({ remote: url2, server: "Server 2" });

    const videoPromises = getVideos(servers);

    return Promise.all(videoPromises).then((values) => {
      return values;
    });
  }
}
