import { RGBColor } from "~/types";

const STEP = 10;

export function getImageColors(imageData: ImageData): RGBColor[] {
  const { width, height, data } = imageData;

  const uniqueColors = new Set<string>();

  for (let y = 0; y < height; y += STEP) {
    for (let x = 0; x < width; x += STEP) {
      const pixelIndex = (y * width + x) * 4;

      const alpha = data[pixelIndex + 3];

      if (alpha < 10) continue;

      const r = data[pixelIndex];
      const g = data[pixelIndex + 1];
      const b = data[pixelIndex + 2];

      const value = `${r},${g},${b}`;
      uniqueColors.add(value);
    }
  }

  const imageColors = Array.from(uniqueColors).map(
    (value) => value.split(",").map(Number) as RGBColor,
  );

  return imageColors;
}
