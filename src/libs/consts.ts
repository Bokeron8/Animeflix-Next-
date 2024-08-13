const env = process.env.NODE_ENV;
const dev = env !== "production";
export const BASE_URL = dev
  ? `http://${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}`
  : `https://${process.env.NEXT_PUBLIC_PRODUCTION_URL}`;

export const baseURL = "https://jkanime.net/";
export const imagesURL = "https://cdn.jkdesu.com/assets/images/animes/image/";
