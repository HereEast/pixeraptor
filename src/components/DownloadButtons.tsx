import React, { RefObject } from "react";

import { Button } from "~/components/ui/Button";
import { downloadPNG, downloadSVG } from "~/lib";
import { cn } from "~/utils";

interface DownloadButtonProps {
  filename: string;
  title?: string;
  disabled?: boolean;
  className?: string;
}

interface DownloadPNGButtonProps extends DownloadButtonProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

interface DownloadSVGButtonProps extends DownloadButtonProps {
  imageData: ImageData | null;
  activeColors: string[];
  tileSize: number;
  tileAssignments: number[];
}

export function DownloadSVGButton({
  imageData,
  activeColors,
  tileSize,
  tileAssignments,
  filename,
  disabled = false,
  className = "",
  title = "Download .SVG",
}: DownloadSVGButtonProps) {
  function handleDownload() {
    if (!imageData) return;

    downloadSVG({
      tileSize,
      filename,
      colors: activeColors,
      imageData,
      tileAssignments,
    });
  }

  return (
    <Button
      disabled={disabled}
      onClick={handleDownload}
      className={cn("h-20 w-full", className)}
    >
      {title}
    </Button>
  );
}

// Download PNG Button
export function DownloadPNGButton({
  canvasRef,
  filename,
  disabled = false,
  className = "",
  title = "Download .PNG",
}: DownloadPNGButtonProps) {
  function handleDownload() {
    if (!canvasRef?.current) return;

    downloadPNG(canvasRef?.current, filename);
  }

  return (
    <Button
      disabled={disabled}
      onClick={handleDownload}
      className={cn("h-20 w-full", className)}
    >
      {title}
    </Button>
  );
}
