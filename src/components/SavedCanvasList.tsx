import Image from "next/image";

import { Button } from "./ui/Button";
import { useSavedCanvas } from "~/hooks/useSavedCanvas";
import { ISavedCanvas } from "~/types";

const SAVED_CANVAS_LIMIT = 6;

export function SavedCanvasList() {
  const { savedCanvas, removeCanvas } = useSavedCanvas();

  return (
    <section>
      <h2 className="mb-1 flex gap-2 text-sm font-semibold uppercase">
        <span>Saved</span>
        <span>[{savedCanvas.length}]</span>
      </h2>

      <ul className="flex gap-1">
        {savedCanvas.map((canvas, index) => (
          <SavedCanvasItem
            key={canvas.dataUrl}
            canvas={canvas}
            index={index}
            removeCanvas={removeCanvas}
          />
        ))}
      </ul>
    </section>
  );
}

// Saved Canvas Item
interface SavedCanvasItemProps {
  canvas: ISavedCanvas;
  index: number;
  removeCanvas: (index: number) => void;
}

function SavedCanvasItem({
  canvas,
  index,
  removeCanvas,
}: SavedCanvasItemProps) {
  return (
    <li
      key={canvas.dataUrl}
      className="relative transition-transform duration-200 hover:scale-105"
    >
      <Button
        className="absolute top-0 right-0 size-7 px-0 font-light"
        onClick={() => removeCanvas(index)}
      >
        x
      </Button>

      <Image
        src={canvas.dataUrl}
        alt="Saved Pixeraptor Canvas"
        width={100}
        height={100}
        className="object-cover"
      />
    </li>
  );
}
