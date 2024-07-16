import { BASE_URL, baseURL, getHTML } from "@/libs/utils";
import { Episode } from "@/types/episode";

export class EpisodeModel {
  static async getLatest() {
    const $ = await getHTML({ url: baseURL, revalidate: 120 });
    const result: Episode[] = [];
    $("div.anime_programing")
      .find("a")
      .each((i, ep) => {
        let href = $(ep).attr("href");
        if (href == undefined) return;
        href = href.replace(baseURL, `${BASE_URL}/anime/`);
        const [searchTitle, episodeNumber] = href.split("/");

        const image = $(ep).find(".listadohome img");
        const title = image.attr("title");
        const imgSrc = image.attr("src");

        if (title == undefined) return;
        if (imgSrc == undefined) return;
        result.push({
          href: href,
          title: title,
          episodeNumber: episodeNumber,
          img: imgSrc,
        });
      });
    return result;
  }
}
