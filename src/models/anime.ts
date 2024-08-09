//@ts-nocheck
import { Anime } from "@/types/anime";
import { baseURL, BASE_URL } from "@/libs/consts";
import { getHTML } from "@/libs/utils";
import { isCheerio } from "cheerio/lib/utils";

export class AnimeModel {
  static async getInfo(title: string) {
    const url = `${baseURL}${title}/`;
    const $ = await getHTML({ url });

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
    const $ = await getHTML({ url });
    const animes = $("div.list > div#conb");
    const results: any[] = [];
    animes.each((idx, el) => {
      const anime = { number: "", title: "", img: "", href: "" };
      anime.title = $(el).find(".portada-title > a").text();
      const img = $(el).find("img").attr("src");
      if (img) anime.img = img;
      const href = $(el).children("a").attr("href");
      if (href !== undefined) anime.href = href.replace(baseURL, `/anime/`);

      results.push(anime);
    });
    return results;
  }
  static async searchAnime({
    query = "",
    pageNumber = 1,
    filters = {},
  }: {
    query: string;
    pageNumber: number;
    filters?: any;
  }) {
    const url = `${baseURL}buscar/${query.replaceAll(" ", "_")}/${pageNumber}/`;
    const $ = await getHTML({ url });
    const results = $(".anime__item");

    const animes: [{ title: string; coverSrc: string; href: string }] = [];

    results.each((idx, result) => {
      const anime = {};
      anime.title = $(result).find(".anime__item__text h5 a").text().trim();

      anime.coverSrc = $(result).find(".anime__item__pic").attr("data-setbg");
      anime.href = $(result)
        .children("a")
        .attr("href")
        .replace(baseURL, "/anime/")
        .slice(0, -1);

      animes.push(anime);
    });
    return animes;
  }
}
