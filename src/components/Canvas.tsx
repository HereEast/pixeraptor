import { Button } from "./ui/Button";

import { ISavedCanvas } from "~/types";
import { useCanvasContext, useSavedCanvas, useSettingsContext } from "~/hooks";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "~/constants";

export function Canvas() {
  const { canvasRef, imageData } = useCanvasContext();
  const { activeColors, tileSize, tileAssignments } = useSettingsContext();
  const { saveCanvas, savedCanvases, isLimit } = useSavedCanvas();

  const isLoading = activeColors.length === 0;

  // Save Canvas
  function handleSaveCanvas() {
    if (!canvasRef.current || !imageData || isLimit) return;

    const currentCanvas: ISavedCanvas = {
      dataUrl: canvasRef.current?.toDataURL("image/png"),
      settings: {
        colors: activeColors,
        tileSize,
        tileAssignments,
        imageData,
      },
    };

    if (
      savedCanvases.some((canvas) => canvas.dataUrl === currentCanvas.dataUrl)
    ) {
      return;
    }

    saveCanvas(currentCanvas);
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex aspect-square max-w-[800px] items-center justify-center bg-zinc-200">
          <span className="text-center text-sm">Loading...</span>
        </div>
      )}

      {!isLoading && (
        <Button
          size="icon"
          disabled={isLimit}
          onClick={handleSaveCanvas}
          className="absolute right-0 bottom-0 text-xl font-light"
        >
          +
        </Button>
      )}

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="h-auto max-w-full"
      />
    </div>
  );
}
