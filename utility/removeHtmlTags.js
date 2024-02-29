export function removeHtmlTags(input) {
  return input.replace(/<[^>]*>/g, "");
}
