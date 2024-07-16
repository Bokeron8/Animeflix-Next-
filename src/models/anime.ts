//@ts-nocheck
import { Anime } from "@/types/anime";
import { BASE_URL, baseURL, getHTML } from "@/libs/utils";
import { isCheerio } from "cheerio/lib/utils";

export class AnimeModel {
  static async getInfo(title: string) {
    const url = `${baseURL}${title}/`;
    const $ = await getHTML({ url, revalidate: 5 * 24 * 3600 });

    const anime: Anime = {};
    anime.title = $(".anime__details__title").find("h3").text().trim();

    const img = $(".anime__details__content")
      .find(".anime__details__pic.set-bg")
      .attr("data-setbg");
    //if (!img) return anime;
    anime.img = img;
    anime.sinopsis = $(".tab.sinopsis").text().trim();
    anime.info = {
      Tipo: "",
      Genero: "",
      Studios: "",
      Demografia: "",
      Idiomas: "",
      Episodios: "",
      Duracion: "",
      Emitido: "",
      Estado: "",
      Calidad: "",
    };
    $(".aninfo")
      .children("ul")
      .find("li")
      .each((idx, item) => {
        const [key, value] = $(item).text().split(":");
        if (key && value && anime.info) {
          anime.info[key] = value.trim();
        }
      });
    if (anime.info["Episodios"] == "Desconocido") {
      anime.info["Episodios"] = $(".anime__pagination")
        .children()
        .last()
        .text()
        .match("([0-9]+)")[1];
    }
    return anime;
  }

  static async getMostVotedAnimeBySeason({
    season = "Primavera",
    year = "2024",
  }: {
    season?: "Primavera" | "Verano" | "Otoño" | "Invierno";
    year?: string;
  }) {
    const url = `${baseURL}top/?temporada=${season}&fecha=${year}`;
    const $ = await getHTML({ url, revalidate: 3600 * 24 });
    const animes = $("div.list > div#conb");
    const results: any[] = [];
    animes.each((idx, el) => {
      const anime = { number: "", title: "", img: "", href: "" };
      anime.title = $(el).find(".portada-title > a").text();
      const img = $(el).find("img").attr("src");
      if (img) anime.img = img;
      const href = $(el).children("a").attr("href");
      if (href !== undefined)
        anime.href = href.replace(baseURL, `${BASE_URL}/anime/`);

      results.push(anime);
    });
    return results;
  }
}
