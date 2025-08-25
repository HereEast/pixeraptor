import { Context } from "svgcanvas";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "~/constants";
import { drawCanvas } from "~/lib";

interface DownloadSVGProps {
  tileSize: number;
  filename: string;
  colors: string[];
  imageData: ImageData;
  assignments: number[];
}

// Download SVG
export function downloadSVG({
  tileSize,
  filename,
  colors,
  imageData,
  assignments,
}: DownloadSVGProps) {
  const svg = generateSVG({
    tileSize,
    colors,
    imageData,
    assignments,
  });

  if (!svg) return;

  const blob = new Blob([svg], { type: "image/svg+xml" });

  downloadBlob(blob, `${filename}.svg`);
}

// Download PNG
export function downloadPNG(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;

    downloadBlob(blob, `pixeraptor-${filename}.png`);
  }, "image/png");
}

// Generate SVG
interface GenerateSVGProps {
  tileSize: number;
  colors: string[];
  imageData: ImageData;
  assignments: number[];
}

export function generateSVG({
  tileSize,
  colors,
  imageData,
  assignments,
}: GenerateSVGProps) {
  const ctx = new Context(CANVAS_WIDTH, CANVAS_HEIGHT);

  drawCanvas({ ctx, imageData, tileSize, colors, assignments });

  return ctx.getSerializedSvg();
}

// Download Blob
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.download = filename;
  link.href = url;
  link.click();

  URL.revokeObjectURL(url);
}
