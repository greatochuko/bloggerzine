export function convertToAbbrString(number: number) {
    let result = number;
    let suffix = "";
    if (number > 1000) {
      result = result / 1000;
      suffix = "K";
    }
    if (number > 1000000) {
      result = result / 1000000;
      suffix = "M";
    }
    if (number > 1000000000) {
      result = result / 1000000000;
      suffix = "B";
    }
    return result + suffix;
  }