import { useEffect, useRef } from "react";

import { Modal } from "./ui/Modal";
import { DownloadPNGButton, DownloadSVGButton } from "./DownloadButtons";

import { useCanvasContext } from "~/hooks";
import { ISavedCanvas } from "~/types";
import { drawCanvas } from "~/lib";

interface SavedCanvasModalProps {
  item: ISavedCanvas;
  index: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SavedCanvasModal({
  item,
  index,
  isOpen,
  setIsOpen,
}: SavedCanvasModalProps) {
  const { filename } = useCanvasContext();

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
    <Modal
      title={`Saved /${index + 1}`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="pb-10"
    >
      <div className="mt-10 flex flex-col gap-10 md:mt-6">
        <div className="max-h-[500px] max-w-[500px]">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className="h-auto max-w-full"
          />
        </div>

        <div className="flex gap-2">
          <DownloadPNGButton canvasRef={canvasRef} filename={filename} />

          <DownloadSVGButton
            tileSize={item.settings.tileSize}
            editedColors={item.settings.colors}
            imageData={item.settings.imageData}
            tileAssignments={item.settings.tileAssignments}
            filename={filename}
          />
        </div>
      </div>
    </Modal>
  );
}
