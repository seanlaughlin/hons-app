export function removeHtmlTags(input) {
  return input
    .replace(/<div[^>]*>/gi, "\n")
    .replace(/<\/div>/gi, "")
    .replace(/<[^>]*>/g, "");
}
