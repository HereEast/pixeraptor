import { useState } from "react";
import Image from "next/image";

import { Button } from "./ui/Button";
import { SavedCanvasModal } from "./SavedCanvasModal";
import { ISavedCanvas } from "~/types";

interface SavedCanvasItemProps {
  item: ISavedCanvas;
  index: number;
  removeCanvas: (index: number) => void;
}

export function SavedCanvasItem({
  item,
  index,
  removeCanvas,
}: SavedCanvasItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      key={index}
      className="group relative cursor-pointer overflow-hidden"
      onClick={() => setIsOpen(true)}
    >
      <Button
        className="absolute top-0 right-0 z-10 size-7 px-0 font-light"
        onClick={(e) => {
          e.stopPropagation();
          removeCanvas(index);
        }}
      >
        x
      </Button>

      <Image
        src={item.dataUrl}
        alt="Saved Pixeraptor Image"
        width={400}
        height={400}
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {isOpen && (
        <SavedCanvasModal
          item={item}
          index={index}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </li>
  );
}
