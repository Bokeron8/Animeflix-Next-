//@ts-nocheck
import { Anime } from "@/types/anime";
import { baseURL, getHTML } from "./utils";
import { isCheerio } from "cheerio/lib/utils";

export class AnimeModel {
  static async getInfo(title: string) {
    const url = `${baseURL}${title}/`;
    const $ = await getHTML(url);
    if (!isCheerio($)) return {};
    const anime: Anime = {};
    anime.title = $(".anime__details__title").find("h3").text().trim();

    const img = $(".anime__details__content")
      .find(".anime__details__pic.set-bg")
      .attr("data-setbg");
    if (!img) return anime;
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
}
