import { Context } from "svgcanvas";

interface DrawCanvasProps {
  ctx: CanvasRenderingContext2D | Context;
  imageData: ImageData;
  tileAssignments: number[];
  colors: string[];
  tileSize: number;
}

export function drawCanvas(props: DrawCanvasProps) {
  const { ctx, imageData, tileAssignments, colors, tileSize } = props;

  const cols = Math.ceil(imageData.width / tileSize);
  const rows = Math.ceil(imageData.height / tileSize);

  let idx = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const centroidIndex = tileAssignments[idx];
      const hex = colors[centroidIndex] ?? "#ffffff";

      ctx.fillStyle = hex;
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

      idx++;
    }
  }
}
