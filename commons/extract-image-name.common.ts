export const extractImageName = (url: string) =>
  url.slice(url.lastIndexOf("/") + 1);
