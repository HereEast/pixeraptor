import { useCanvasContext } from "~/hooks";

export function Canvas() {
  const { canvasRef, image } = useCanvasContext();

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
