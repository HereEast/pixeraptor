import { RGBColor } from "~/types";
import { getClosestCentroidIndex } from "./";

// Recompute tile assignments when palette or tile size changes
export function calculateTileAssignments(
  imageData: ImageData,
  centralColors: string[],
  tileSize: number,
) {
  const cols = Math.ceil(imageData.width / tileSize);
  const rows = Math.ceil(imageData.height / tileSize);

  // [0, 1, 0, ...] > Number of tiles
  const newAssignments: number[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const averageTileColor = getAverageTileColor({
        imageData,
        x: x * tileSize,
        y: y * tileSize,
        tileSize,
      });

      const closestIndex = getClosestCentroidIndex(
        averageTileColor,
        centralColors,
      );

      newAssignments.push(closestIndex);
    }
  }

  return newAssignments;
}

// Get average tile color
interface Props {
  imageData: ImageData;
  x: number;
  y: number;
  tileSize: number;
}

export function getAverageTileColor({
  imageData,
  x,
  y,
  tileSize,
}: Props): RGBColor {
  const { width, height, data } = imageData;

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  const xEnd = Math.min(x + tileSize, width);
  const yEnd = Math.min(y + tileSize, height);

  // Goes through each pixel in the tile
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
