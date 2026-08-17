export const truncateText = (text, length = 50) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};