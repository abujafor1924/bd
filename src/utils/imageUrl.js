export const fixImageUrl = (url) => {
  if (!url) return url;

  return url.replace(
    "http://66.29.151.40:6060",
    ""
  );
};