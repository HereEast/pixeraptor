import { useLayoutEffect } from "react";

import { useCanvasContext, useSettingsContext } from "~/hooks";
import { drawCanvas } from "~/lib";

export function Canvas() {
  const { canvasRef, imageData, ctxRef, image } = useCanvasContext();
  const { tileAssignments, editedColors, tileSize } = useSettingsContext();

  const ctx = ctxRef.current;

  useLayoutEffect(() => {
    if (!imageData || !tileAssignments.length || !ctx) return;

    drawCanvas({
      ctx,
      imageData,
      tileAssignments,
      colors: editedColors,
      tileSize,
    });
  }, [editedColors, tileAssignments, tileSize, imageData, ctx]);

  return (
    <div className="relative">
      {!image && <div className="absolute inset-0 size-[400px] bg-zinc-200" />}

      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="h-auto max-w-full"
      />
    </div>
  );
}
