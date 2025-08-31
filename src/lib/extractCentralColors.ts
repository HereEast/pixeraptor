import { getImageColors, getClosestCentroidIndex } from ".";
import { getRandomColor, rgbToHex } from "~/utils";
import { RGBColor } from "~/types";

const ITERATIONS = 8;

export function extractCentralColors(
  imageData: ImageData,
  limit: number,
): string[] {
  const imageColors = getImageColors(imageData); // [[r, g, b]]

  let centroids: RGBColor[] = getInitialCentroids(imageColors, limit);
  let assignments: number[] = [];

  // Clustering (K-Means)
  // Updated on every iteration > [[r, g, b]], [0, 1, 0, ...]
  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    assignments = getCentroidAssignments(imageColors, centroids);
    centroids = getUpdatedCentroids(imageColors, centroids, assignments);
  }

  const hexColors = centroids.map(([r, g, b]) => rgbToHex([r, g, b]));

  return hexColors;
}

// Which centroid is the closest to each color
function getCentroidAssignments(
  imageColors: RGBColor[],
  centroids: RGBColor[],
) {
  const centroidAssignments: number[] = [];

  for (let i = 0; i < imageColors.length; i++) {
    const bestCentroidIndex = getClosestCentroidIndex(
      imageColors[i],
      centroids,
    );

    centroidAssignments.push(bestCentroidIndex);
  }

  return centroidAssignments;
}

// Update centroids
function getUpdatedCentroids(
  imageColors: RGBColor[],
  centroids: RGBColor[],
  assignments: number[],
) {
  const data = centroids.map(() => ({
    avgColor: [0, 0, 0] as RGBColor,
    count: 0,
  }));

  // Accumulate sums and counts for each centroid
  for (let i = 0; i < imageColors.length; i++) {
    const centroidIndex = assignments[i];
    const color = imageColors[i];

    data[centroidIndex].avgColor[0] += color[0];
    data[centroidIndex].avgColor[1] += color[1];
    data[centroidIndex].avgColor[2] += color[2];

    data[centroidIndex].count++;
  }

  // Update centroid with average of assigned colors
  const updatedCentroids: RGBColor[] = [];

  for (let i = 0; i < centroids.length; i++) {
    const count = data[i].count;

    if (count > 0) {
      const r = data[i].avgColor[0] / count;
      const g = data[i].avgColor[1] / count;
      const b = data[i].avgColor[2] / count;

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
