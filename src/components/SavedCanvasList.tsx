import { useState } from "react";
import Image from "next/image";

import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { useSavedCanvas } from "~/hooks/useSavedCanvas";
import { ISavedCanvas } from "~/types";

// Open in popup
// Download as PNG/SVG from the Popup
// Delete from the Popup
// List saved canvases in the popup
// Limit to 10

const SAVED_CANVAS_LIMIT = 10;

export function SavedCanvasList() {
  const { savedCanvas, removeCanvas } = useSavedCanvas();

  const [isOpen, setIsOpen] = useState(true);

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

      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div>SavedCanvasPopup</div>
        </Modal>
      )}
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <li
      key={canvas.dataUrl}
      className="relative transition-transform duration-200 hover:scale-105"
      onClick={() => setIsOpen(true)}
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

      {/* {isOpen && <SavedCanvasPopup canvas={canvas} />} */}
    </li>
  );
}
