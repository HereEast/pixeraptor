import { hexToRgb } from "~/utils";
import { RGBColor } from "~/types";

// Get closest color index
export function getClosestCentroidIndex(
  color: RGBColor,
  centroids: string[] | RGBColor[],
): number {
  let bestIndex = 0;
  let minDistance = Infinity;

  for (let i = 0; i < centroids.length; i++) {
    const c = centroids[i];
    const centralRgb = typeof c === "string" ? hexToRgb(c) : c;

    const distance = getColorDistance(color, centralRgb);

    if (distance < minDistance) {
      minDistance = distance;
      bestIndex = i;
    }
  }

  return bestIndex;
}

// Color distance
export function getColorDistance(color1: RGBColor, color2: RGBColor) {
  // Distance in 3D space (Euclidean distance)
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;

  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}
