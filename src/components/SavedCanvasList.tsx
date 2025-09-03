import { useState } from "react";
import Image from "next/image";

import { Button } from "./ui/Button";
import { SavedCanvasModal } from "./SavedCanvasModal";
import { useSavedCanvas } from "~/hooks/useSavedCanvas";
import { ISavedCanvas } from "~/types";

// Open in popup
// Download as PNG/SVG from the Popup
// Delete from the Popup
// List saved canvases in the popup
// Limit to 10

const SAVED_CANVAS_LIMIT = 10;

export function SavedCanvasList() {
  const { savedCanvases, removeCanvas } = useSavedCanvas();

  return (
    <section>
      <h2 className="mb-1 flex gap-2 text-sm font-semibold uppercase">
        <span>Saved</span>
        <span>[{savedCanvases.length}]</span>
      </h2>

      <ul className="flex gap-1">
        {savedCanvases.map((item, index) => (
          <SavedCanvasItem
            key={item.dataUrl}
            item={item}
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
  item: ISavedCanvas;
  index: number;
  removeCanvas: (index: number) => void;
}

function SavedCanvasItem({ item, index, removeCanvas }: SavedCanvasItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      key={index}
      className="relative cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={() => setIsOpen(true)}
    >
      <Button
        className="absolute top-0 right-0 size-7 px-0 font-light"
        onClick={(e) => {
          e.stopPropagation();
          removeCanvas(index);
        }}
      >
        x
      </Button>

      <Image
        src={item.dataUrl}
        alt="Saved Pixeraptor Canvas"
        width={100}
        height={100}
        className="object-cover"
      />

      {isOpen && (
        <SavedCanvasModal item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </li>
  );
}
