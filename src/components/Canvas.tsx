import { useLayoutEffect } from "react";

import { useCanvasContext, useSettingsContext } from "~/hooks";
import { drawCanvas } from "~/lib";

export function Canvas() {
  const { canvasRef, imageData, ctxRef } = useCanvasContext();
  const { tileAssignments, editedColors, tileSize } = useSettingsContext();

  useLayoutEffect(() => {
    if (!imageData || !tileAssignments.length || !ctxRef.current) return;

    drawCanvas({
      ctx: ctxRef.current,
      imageData,
      assignments: tileAssignments,
      colors: editedColors,
      tileSize,
    });
  }, [editedColors, tileAssignments, tileSize, imageData, ctxRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="h-auto max-w-full"
        style={{ maxHeight: "400px", maxWidth: "400px" }}
      />
    </div>
  );
}
