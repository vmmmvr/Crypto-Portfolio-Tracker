export function formatNumber(num?: number) {
  if (!num) return "";
  // Convert the number to an absolute value for formatting
  const absNumber = Math.abs(num);

  if (absNumber >= 1e12) {
    return (num / 1e12).toFixed(2) + "T"; // Trillions
  } else if (absNumber >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"; // Billions
  } else if (absNumber >= 1e6) {
    return (num / 1e6).toFixed(2) + "M"; // Millions
  } else if (absNumber >= 1e3) {
    return (num / 1e3).toFixed(2) + "K"; // Thousands
  } else {
    return num.toString(); // Return the number itself if smaller than 1000
  }
}

export const missingPorperties = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined,
};
