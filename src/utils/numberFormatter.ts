export function convertToAbbrString(number: number) {
  let result = number;
  let decimalLimit = 0;
  let suffix = "";
  if (number > 1000) {
    result = result / 1000;
    decimalLimit = 1;
    suffix = "K";
  }
  if (number > 1000000) {
    result = result / 1000;
    suffix = "M";
  }
  if (number > 1000000000) {
    result = result / 1000;
    suffix = "B";
  }
  return result.toFixed(decimalLimit) + suffix;
}
