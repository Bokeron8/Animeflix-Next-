export const baseURL = "https://jkanime.net/";
export const imagesURL = "https://cdn.jkdesu.com/assets/images/animes/image/";

var cloudscraper = require("cloudscraper");
import * as cheerio from "cheerio";
export async function getHTML({
  url,
  cloudfare = false,
}: {
  url: string;
  cloudfare?: boolean;
}) {
  let html: string;
  if (cloudfare) {
    html = await cloudscraper.get(url, { referrer: "https://jkanime.net" });
  } else {
    const res = await fetch(url, { referrer: "https://jkanime.net" });
    html = await res.text();
  }
  return cheerio.load(html);
}
