import { getColorDistance, hexToRgb } from "~/utils";
import { RGBColor } from "~/types";

// Get closest color index
export function getClosestCentroidIndex(
  color: RGBColor,
  centroids: string[] | RGBColor[],
): number {
  let bestIndex = 0;
  let minDistance = Infinity;

  for (let i = 0; i < centroids.length; i++) {
    const centralColor = centroids[i];
    const centralRgb =
      typeof centralColor === "string" ? hexToRgb(centralColor) : centralColor;

    const distance = getColorDistance(color, centralRgb);

    if (distance < minDistance) {
      minDistance = distance;
      bestIndex = i;
    }
  }

  return bestIndex;
}
