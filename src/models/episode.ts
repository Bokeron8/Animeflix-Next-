import { baseURL, getHTML } from "@/models/utils";
import { Episode } from "@/types/episode";

export class EpisodeModel {
  static async getLatest() {
    const $ = await getHTML(baseURL);
    const result: Episode[] = [];
    $("div.anime_programing")
      .find("a")
      .each((i, ep) => {
        let href = $(ep).attr("href");
        if (href == undefined) return;
        href = href.replace(baseURL, "");
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
