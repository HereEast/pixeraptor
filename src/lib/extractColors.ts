import { getImageColors } from "./";
import { getColorDistance, getRandomColor, rgbToHex } from "~/utils";
import { RGBColor } from "~/types";

const ITERATIONS = 8;

export function extractColors(imageData: ImageData, limit: number): string[] {
  const imageColors = getImageColors(imageData);
  const centroids = getInitialCentroids(imageColors, limit);

  let assignments = new Array<number>(imageColors.length).fill(0);

  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    assignments = assignColorsToCentroids(imageColors, centroids);

    const { sums, counts } = calculateCentroids(
      imageColors,
      assignments,
      centroids.length,
    );

    updateCentroids(centroids, sums, counts, imageColors);
  }

  const hexColors = centroids.map(([r, g, b]) => rgbToHex([r, g, b]));

  return hexColors;
}

// Assign colors to leaders
function assignColorsToCentroids(
  imageColors: RGBColor[],
  centroids: RGBColor[],
): number[] {
  const leadIndexes = new Array<number>(imageColors.length);

  for (let i = 0; i < imageColors.length; i++) {
    let bestLeaderIndex = 0;
    let smallestDistance = Infinity;

    for (let j = 0; j < centroids.length; j++) {
      const distance = getColorDistance(imageColors[i], centroids[j]);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        bestLeaderIndex = j;
      }
    }

    leadIndexes[i] = bestLeaderIndex;
  }

  return leadIndexes;
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

// Calculate the sum and count of colors assigned to each centroid
function calculateCentroids(
  colors: RGBColor[],
  assignments: number[],
  centroidCount: number,
) {
  const sums = Array(centroidCount)
    .fill(null)
    .map(() => [0, 0, 0]);

  const counts = Array(centroidCount).fill(0);

  for (let i = 0; i < colors.length; i++) {
    const assignedCentroid = assignments[i];
    const color = colors[i];

    sums[assignedCentroid][0] += color[0];
    sums[assignedCentroid][1] += color[1];
    sums[assignedCentroid][2] += color[2];

    counts[assignedCentroid]++;
  }

  return { sums, counts };
}

// Update centroid positions based on assigned colors
function updateCentroids(
  centroids: RGBColor[],
  sums: number[][],
  counts: number[],
  imageColors: RGBColor[],
): void {
  for (let i = 0; i < centroids.length; i++) {
    const count = counts[i];

    if (count > 0) {
      // Update centroid to average of assigned colors
      centroids[i][0] = sums[i][0] / count;
      centroids[i][1] = sums[i][1] / count;
      centroids[i][2] = sums[i][2] / count;
    } else {
      // Re-seed lonely centroid with random color
      const randomColor = getRandomColor(imageColors);
      centroids[i] = randomColor;
    }
  }
}
