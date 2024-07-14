export const baseURL = "https://jkanime.net/";
export const imagesURL = "https://cdn.jkdesu.com/assets/images/animes/image/";

var cloudscraper = require("cloudscraper");
import * as cheerio from "cheerio";
export async function getHTML(url: string) {
  const res = await cloudscraper.get(url);

  return cheerio.load(res);
}
