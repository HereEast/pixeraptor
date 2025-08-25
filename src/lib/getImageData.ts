import { CANVAS_WIDTH, CANVAS_HEIGHT } from "~/constants";

export function getImageData(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const { sourceW, sourceH, sourceX, sourceY } = calculateCroppedParams(img);

  ctx.drawImage(
    img,
    sourceX,
    sourceY,
    sourceW,
    sourceH,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  );

  const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  return { ctx, imageData };
}

// Calculate cropped image params
export function calculateCroppedParams(img: HTMLImageElement) {
  const imageW = img.naturalWidth || img.width;
  const imageH = img.naturalHeight || img.height;

  if (!imageW || !imageH) {
    return { sourceW: 0, sourceH: 0, sourceX: 0, sourceY: 0 };
  }

  const aspectRatio = imageW / imageH;

  let sourceW: number;
  let sourceH: number;
  let sourceX = 0;
  let sourceY = 0;

  if (aspectRatio > 1) {
    // landscape
    sourceH = imageH;
    sourceW = imageH;
    sourceX = Math.round((imageW - sourceW) / 2);
  } else if (aspectRatio < 1) {
    // portrait
    sourceW = imageW;
    sourceH = imageW;
    sourceY = Math.round((imageH - sourceH) / 2);
  } else {
    // square
    sourceW = imageW;
    sourceH = imageH;
  }

  sourceW = Math.max(1, Math.floor(sourceW));
  sourceH = Math.max(1, Math.floor(sourceH));
  sourceX = Math.max(0, Math.floor(sourceX));
  sourceY = Math.max(0, Math.floor(sourceY));

  return { sourceW, sourceH, sourceX, sourceY };
}
