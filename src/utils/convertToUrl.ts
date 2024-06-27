export default function convertToUrl(string: string) {
  return string.split(" ").join("-").toLowerCase();
}
