import { getColorDistance, hexToRgb } from "~/utils";
import { RGBColor } from "~/types";

// Recompute tile assignments when palette or tile size changes
export function calculateTileAssignments(
  imageData: ImageData,
  colors: string[],
  tileSize: number,
) {
  const cols = Math.ceil(imageData.width / tileSize);
  const rows = Math.ceil(imageData.height / tileSize);

  const newAssignments: number[] = new Array(cols * rows).fill(0);

  let idx = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const avg = getAverageTileColor({
        imageData,
        x: x * tileSize,
        y: y * tileSize,
        size: tileSize,
      });

      const closestIndex = getClosestColorIndex(avg, colors);
      newAssignments[idx++] = closestIndex;
    }
  }

  return newAssignments;
}

// Get average tile color
interface Props {
  imageData: ImageData;
  x: number;
  y: number;
  size: number;
}

export function getAverageTileColor({
  imageData,
  x,
  y,
  size,
}: Props): RGBColor {
  const { width, height, data } = imageData;

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  const xEnd = Math.min(x + size, width);
  const yEnd = Math.min(y + size, height);

  for (let yStart = y; yStart < yEnd; yStart++) {
    for (let xStart = x; xStart < xEnd; xStart++) {
      const pixelIndex = (yStart * width + xStart) * 4;

      const a = data[pixelIndex + 3];

      if (a < 10) continue;

      r += data[pixelIndex];
      g += data[pixelIndex + 1];
      b += data[pixelIndex + 2];

      count++;
    }
  }
  if (count === 0) return [255, 255, 255];

  const avgR = r / count;
  const avgG = g / count;
  const avgB = b / count;

  return [avgR, avgG, avgB];
}

// Get closest color index
export function getClosestColorIndex(
  color: RGBColor,
  leadColors: string[],
): number {
  let bestIndex = 0;
  let minDistance = Infinity;

  for (let i = 0; i < leadColors.length; i++) {
    const leadRgb = hexToRgb(leadColors[i]);
    const distance = getColorDistance(color, leadRgb);

    if (distance < minDistance) {
      minDistance = distance;
      bestIndex = i;
    }
  }

  return bestIndex;
}
