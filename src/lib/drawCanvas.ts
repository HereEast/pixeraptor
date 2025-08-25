import { Context } from "svgcanvas";

interface DrawCanvasProps {
  ctx: CanvasRenderingContext2D | Context | null;
  imageData: ImageData;
  assignments: number[];
  colors: string[];
  tileSize: number;
}

export function drawCanvas(props: DrawCanvasProps) {
  const { ctx, imageData, assignments, colors, tileSize } = props;

  if (!ctx || !imageData) return;

  // ctx.clearRect(0, 0, imageData.width, imageData.height);

  const cols = Math.ceil(imageData.width / tileSize);
  const rows = Math.ceil(imageData.height / tileSize);

  if (!assignments || !cols || !rows) return;

  let idx = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pixelIndex = assignments[idx++];
      const hex = colors[pixelIndex] ?? "#ffffff";

      ctx.fillStyle = hex;
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}
