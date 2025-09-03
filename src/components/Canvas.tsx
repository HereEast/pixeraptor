import { Button } from "./ui/Button";
import { ISavedCanvas } from "~/types";
import { useCanvasContext, useSavedCanvas, useSettingsContext } from "~/hooks";

export function Canvas() {
  const { canvasRef, isImageRestored, imageData } = useCanvasContext();
  const { editedColors, tileSize, tileAssignments } = useSettingsContext();
  const { addCanvas } = useSavedCanvas();

  const isLoading = !isImageRestored && editedColors.length === 0;

  // Save Canvas
  function handleSaveImage() {
    if (!canvasRef.current || !imageData) return;

    const currentCanvas: ISavedCanvas = {
      dataUrl: canvasRef.current?.toDataURL("image/png"),
      settings: {
        colors: editedColors,
        tileSize,
        tileAssignments,
        imageData,
      },
    };

    addCanvas(currentCanvas);
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex size-[400px] items-center justify-center bg-zinc-200">
          <span className="text-center text-sm">Loading...</span>
        </div>
      )}

      {!isLoading && (
        <Button
          size="icon"
          onClick={handleSaveImage}
          className="absolute top-0 right-0 text-xl font-light"
        >
          +
        </Button>
      )}

      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="h-auto max-w-full"
      />
    </div>
  );
}
