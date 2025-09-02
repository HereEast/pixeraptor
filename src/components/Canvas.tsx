import { useCanvasContext, useSettingsContext } from "~/hooks";

export function Canvas() {
  const { canvasRef, isImageRestored } = useCanvasContext();
  const { editedColors } = useSettingsContext();

  const isLoading = !isImageRestored && editedColors.length === 0;

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex size-[400px] items-center justify-center bg-zinc-200">
          <span className="text-center text-sm">Loading...</span>
        </div>
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
