export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const MAGIC_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_test_D0CFA06BE6CA9253";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  "pk_test_51IPc6BDn0eQTjzNF3k0NRBhaM3dfVyiQsNC3hC96VJEXFasti033f6ra0Gr78nGIQIrsqqUtfPovRKXiQvAaI0QL00QuZExt05";
/**
 *
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image
 */

export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg";
  }
  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }
  return image.url;
};
