import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { RGBColor } from "~/types";

// Get random color
export function getRandomColor(colors: RGBColor[]): RGBColor {
  const randomIndex = Math.floor(Math.random() * colors.length);

  return [...colors[randomIndex]];
}

// Get average color
export function getAverageColor(colors: RGBColor[]) {
  const [sumR, sumG, sumB] = colors.reduce(
    ([rAcc, gAcc, bAcc], [r, g, b]) => [rAcc + r, gAcc + g, bAcc + b],
    [0, 0, 0],
  );

  const length = colors.length;

  const avgR = Math.round(sumR / length);
  const avgG = Math.round(sumG / length);
  const avgB = Math.round(sumB / length);

  return [avgR, avgG, avgB] as RGBColor;
}

// Get Hex
const MIN = 0;
const MAX = 255;

function clampRgb(v: number) {
  const value = Math.round(v);
  return Math.max(MIN, Math.min(MAX, value));
}

export function rgbToHex([r, g, b]: RGBColor) {
  const hexR = clampRgb(r).toString(16).padStart(2, "0");
  const hexG = clampRgb(g).toString(16).padStart(2, "0");
  const hexB = clampRgb(b).toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
}

// Get RGB from Hex
export function hexToRgb(hex: string): RGBColor {
  if (!isValidHex(hex)) {
    throw new Error("Invalid hex color.");
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

// Is valid hex
export function isValidHex(hex: string) {
  return hex && hex.length === 7 && hex.startsWith("#");
}

// Color distance
export function getColorDistance(color1: RGBColor, color2: RGBColor) {
  // Distance in 3D space (Euclidean distance)
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;

  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

// Remove extension
export function getFilename(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, "");
}

// Tailwind merge
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
