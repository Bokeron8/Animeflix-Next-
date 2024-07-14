export const baseURL = "https://jkanime.net/";
export const imagesURL = "https://cdn.jkdesu.com/assets/images/animes/image/";

var cloudscraper = require("cloudscraper");
import * as cheerio from "cheerio";
export async function getHTML(url: string) {
  try {
    const res = await cloudscraper.get(url);
    console.log(res.body);
    return cheerio.load(res.body);
  } catch (e: any) {
    console.log("e");
    return { error: true };
  }
}
