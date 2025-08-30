import { getImageColors, getClosestCentroidIndex } from ".";
import { getRandomColor, rgbToHex } from "~/utils";
import { RGBColor } from "~/types";

const ITERATIONS = 8;

export function extractCentralColors(
  imageData: ImageData,
  limit: number,
): string[] {
  const imageColors = getImageColors(imageData); // [[r, g, b]]

  // Updated on every iteration > [[r, g, b]]
  const centroids = getInitialCentroids(imageColors, limit);

  // Updated on every iteration > [0, 1, 0, ...]
  let assignments = new Array<number>(imageColors.length).fill(0);

  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    assignments = assignColorsToNearestCentroid(imageColors, centroids);

    updateCentroids(imageColors, centroids, assignments);
  }

  const hexColors = centroids.map(([r, g, b]) => rgbToHex([r, g, b]));

  return hexColors;
}

// Which centroid is the closest to each color (Clustering)
function assignColorsToNearestCentroid(
  imageColors: RGBColor[],
  centroids: RGBColor[],
): number[] {
  const centroidIndexes = new Array<number>(imageColors.length);

  for (let i = 0; i < imageColors.length; i++) {
    const bestCentroidIndex = getClosestCentroidIndex(
      imageColors[i],
      centroids,
    );

    centroidIndexes[i] = bestCentroidIndex;
  }

  return centroidIndexes;
}

// Update centroids
function updateCentroids(
  imageColors: RGBColor[],
  centroids: RGBColor[],
  assignments: number[],
) {
  const centroidData = centroids.map(() => ({
    sum: [0, 0, 0] as RGBColor,
    count: 0,
  }));

  // Accumulate sums and counts for each centroid
  for (let i = 0; i < imageColors.length; i++) {
    const centroidIndex = assignments[i];
    const color = imageColors[i];

    centroidData[centroidIndex].sum[0] += color[0];
    centroidData[centroidIndex].sum[1] += color[1];
    centroidData[centroidIndex].sum[2] += color[2];

    centroidData[centroidIndex].count++;
  }

  // Update centroid with average of assigned colors
  for (let i = 0; i < centroids.length; i++) {
    const count = centroidData[i].count;

    if (count > 0) {
      // Update centroid to average of assigned colors
      centroids[i][0] = centroidData[i].sum[0] / count;
      centroids[i][1] = centroidData[i].sum[1] / count;
      centroids[i][2] = centroidData[i].sum[2] / count;
    } else {
      // Re-seed lonely centroid with random color
      const randomColor = getRandomColor(imageColors);
      centroids[i] = randomColor;
    }
  }
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
