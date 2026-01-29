import { Context } from "svgcanvas";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "~/constants";
import { drawCanvas } from "~/lib";

interface Props {
  tileSize: number;
  filename?: string;
  colors: string[];
  imageData: ImageData;
  tileAssignments: number[];
}

// Download SVG
export function downloadSVG({
  tileSize,
  colors,
  imageData,
  tileAssignments,
  filename,
}: Props) {
  const svg = generateSVG({ tileSize, colors, imageData, tileAssignments });

  if (!svg) return;

  const blob = new Blob([svg], { type: "image/svg+xml" });

  downloadBlob(blob, `${filename}.svg`);
}

// Generate SVG
export function generateSVG(props: Props) {
  const { tileSize, colors, imageData, tileAssignments } = props;

  // Use Context from svgcanvas lib
  const ctx = new Context(CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw canvas with svgcanvas lib Context
  drawCanvas({
    ctx,
    imageData,
    tileSize,
    colors,
    tileAssignments,
  });

  return ctx.getSerializedSvg();
}

// Download PNG
export function downloadPNG(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;

    downloadBlob(blob, `pixeraptor-${filename}.png`);
  }, "image/png");
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
