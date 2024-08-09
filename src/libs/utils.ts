import * as cheerio from "cheerio";

export async function getHTML({
  url,
  cloudfare = false,
  fetchOptions = { next: {}, cache: "default" },
}: {
  url: string;
  cloudfare?: boolean;
  fetchOptions?: {
    next?: { revalidate?: number | false; tags?: string[] };
    cache?:
      | "default"
      | "force-cache"
      | "no-cache"
      | "no-store"
      | "only-if-cached"
      | "reload";
  };
}) {
  var cloudscraper = require("cloudscraper");
  const { next, cache } = fetchOptions;
  let html: string;
  if (cloudfare) {
    html = await cloudscraper.get(url, { referrer: "https://jkanime.net" });
  } else {
    const res = await fetch(url, {
      referrer: "https://jkanime.net",
      next,
      cache,
    });
    html = await res.text();
  }
  return cheerio.load(html);
}

async function parseVideoURL({
  remote: url,
  server,
}: {
  remote: string;
  server: string;
}) {
  if (["Mega", "Mediafire", "Mixdrop"].includes(server))
    return { url, server, type: "iframe" };
  if (server == "VOE") url = url.replace("voe.sx", "erikcoldperson.com");
  const $ = await getHTML({ url });
  const scripts = $("script");
  let result = { url: "", server: server, type: "video" };
  if (["Streamwish", "Vidhide"].includes(server)) {
    const regex = new RegExp('file:"(.*)"');
    scripts.each((i, el) => {
      const content = $(el).html();
      if (content && content.includes("sources: ")) {
        const matches = content.match(regex);
        if (matches) {
          result.url = matches[1];
        }
      }
    });
  }

  if (server == "VOE") {
    scripts.each((i, el) => {
      const regex = /'hls': '([\S]*=)'/;
      const content = $(el).html();
      if (content && content.includes("sources = ")) {
        const matches = content.match(regex);
        if (matches) {
          result.url = atob(matches[1]);
        }
      }
    });
  }
  if (server == "Filemoon") {
    scripts.each((i, el) => {
      const regex = /return p}\(([\s\S]*)/; //new RegExp("return p}((.*)");
      const content = $(el).html();
      if (content && content.includes("p,a,c,k,e,d")) {
        const matches = content.match(regex);
        if (matches) {
          const [p, a, c, k] = eval(`[${matches[1].slice(0, -3)}]`);
          result.url = unfuck(p, a, c, k);
        }
      }
    });
  }
  if (server == "Streamtape") {
    const content = $("#ideoolink");
    result.url = content.text().replace("/", "https://") + "&stream=1";
  }
  if (server == "Server 1") {
    scripts.each((i, el) => {
      const content = $(el).html();
      const regex = /video:[\s\S]*'(.*8)'/;
      if (content && content.includes("video: {")) {
        const matches = content.match(regex);
        if (matches) {
          result.url = matches[1];
        }
      }
    });
  }
  if (server == "Server 2") {
    if ($("source").attr("src") !== undefined) {
      result.url = $("source").attr("src") || "";
    }
  }
  return result;
}
export function getVideos(servers: []) {
  const result = servers.map(async (server) => {
    return await parseVideoURL(server);
  });
  return result;
}

function unfuck(p: any, a: number, c: number, k: []) {
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp("\\b" + c.toString(a) + "\\b", "g"), k[c]);
    }
  }
  p = p.slice(p.indexOf(":[{file:"), p.indexOf("image"));
  return p.split('"')[1];
}
