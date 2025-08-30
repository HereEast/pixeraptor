import React from "react";

import { Button } from "~/components/ui/Button";
import { useCanvasContext, useSettingsContext } from "~/hooks";
import { downloadPNG, downloadSVG } from "~/lib";

export function DownloadButtons() {
  const { canvasRef, filename, imageData } = useCanvasContext();
  const { tileSize, editedColors, tileAssignments } = useSettingsContext();

  // DOWNLOAD PNG
  function handleDownloadPNG() {
    if (canvasRef.current) {
      downloadPNG(canvasRef.current, filename);
    }
  }

  // DOWNLOAD SVG
  function handleDownloadSVG() {
    if (canvasRef.current && imageData && tileAssignments.length > 0) {
      downloadSVG({
        tileSize,
        filename,
        colors: editedColors,
        imageData,
        assignments: tileAssignments,
      });
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button onClick={handleDownloadPNG} className="h-20 w-full">
        Download .PNG
      </Button>
      <Button onClick={handleDownloadSVG} className="h-20 w-full">
        Download .SVG
      </Button>
    </div>
  );
}
