import { useEffect, useRef } from "react";
import { Modal } from "./ui/Modal";
import { ISavedCanvas } from "~/types";
import { drawCanvas } from "~/lib";

interface SavedCanvasModalProps {
  item: ISavedCanvas;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SavedCanvasModal({
  item,
  isOpen,
  setIsOpen,
}: SavedCanvasModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;

    drawCanvas({
      ctx,
      imageData: item.settings.imageData,
      tileSize: item.settings.tileSize,
      colors: item.settings.colors,
      tileAssignments: item.settings.tileAssignments,
    });
  }, [item]);

  return (
    <Modal title="Saved Canvas" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="max-h-[500px] max-w-[500px]">
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          className="h-auto max-w-full"
        />
      </div>
    </Modal>
  );
}
