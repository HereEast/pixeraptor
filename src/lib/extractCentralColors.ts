import { getImageColors, getClosestCentroidIndex } from ".";
import { getRandomColor, rgbToHex } from "~/utils";
import { RGBColor } from "~/types";
import { FALLBACK_COLOR } from "~/constants";

const ITERATIONS = 5;

//
// GOAL: Get centroid HEX colors using K-Means clustering
//
export function extractCentralColors(
  imageData: ImageData,
  limit: number,
): string[] {
  const imageColors = getImageColors(imageData);

  // Safety check: if no colors available, return default colors
  if (imageColors.length === 0) {
    return new Array(limit).fill(rgbToHex(FALLBACK_COLOR));
  }

  // [[r, g, b]], [0, 1, 0, ...] > Update on every iteration
  let centroids: RGBColor[] = getInitialCentroids(imageColors, limit);
  let assignedIndices: number[] = [];

  // Clustering (K-Means)
  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    assignedIndices = assignCentroidIndicesToColors(imageColors, centroids);
    centroids = updateCentroids(imageColors, centroids, assignedIndices);
  }

  const hexColors = centroids.map(([r, g, b]) => rgbToHex([r, g, b]));

  return hexColors;
}

// Which centroid is the closest to each color
function assignCentroidIndicesToColors(
  imageColors: RGBColor[],
  centroids: RGBColor[],
) {
  const assignedIndices: number[] = [];

  for (let i = 0; i < imageColors.length; i++) {
    const bestCentroidIndex = getClosestCentroidIndex(
      imageColors[i],
      centroids,
    );

    assignedIndices.push(bestCentroidIndex);
  }

  return assignedIndices;
}

// Update centroids
function updateCentroids(
  imageColors: RGBColor[],
  centroids: RGBColor[],
  assignedIndices: number[],
) {
  const data = centroids.map(() => ({
    rgbValue: [0, 0, 0] as RGBColor,
    count: 0,
  }));

  // Accumulate sums and counts for each centroid
  for (let i = 0; i < imageColors.length; i++) {
    const centroidIndex = assignedIndices[i];
    const color = imageColors[i];

    data[centroidIndex].rgbValue[0] += color[0];
    data[centroidIndex].rgbValue[1] += color[1];
    data[centroidIndex].rgbValue[2] += color[2];

    data[centroidIndex].count++;
  }

  // Update centroid with average of assigned colors
  const updatedCentroids: RGBColor[] = [];

  for (let i = 0; i < centroids.length; i++) {
    const count = data[i].count;

    if (count > 0) {
      const r = data[i].rgbValue[0] / count;
      const g = data[i].rgbValue[1] / count;
      const b = data[i].rgbValue[2] / count;

      updatedCentroids.push([r, g, b]);
    } else {
      const randomColor = getRandomColor(imageColors);

      updatedCentroids.push(randomColor);
    }
  }

  return updatedCentroids;
}

// Get initial centroids
export function getInitialCentroids(colors: RGBColor[], limit: number) {
  const centroids: RGBColor[] = [];
  const usedIndexes = new Set<number>();

  // Safety check: if no colors available, return default centroids
  if (colors.length === 0) {
    return new Array(limit).fill(FALLBACK_COLOR);
  }

  for (let i = 0; i < limit; i++) {
    let randomIndex = Math.floor(Math.random() * colors.length);

    while (usedIndexes.has(randomIndex)) {
      randomIndex = Math.floor(Math.random() * colors.length);
    }

    usedIndexes.add(randomIndex);
    centroids.push([...colors[randomIndex]]);
  }

  return centroids;
}
