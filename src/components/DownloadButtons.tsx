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

// Download SVG Button
interface DownloadSVGButtonProps extends DownloadButtonProps {
  imageData: ImageData | null;
  editedColors: string[];
  tileSize: number;
  tileAssignments: number[];
}

export function DownloadSVGButton(props: DownloadSVGButtonProps) {
  const {
    imageData,
    editedColors,
    tileSize,
    tileAssignments,
    filename,
    disabled,
    className,
    title,
  } = props;

  function handleDownloadSVG() {
    if (!imageData) return;

    downloadSVG({
      tileSize,
      filename,
      colors: editedColors,
      imageData,
      tileAssignments,
    });
  }

  return (
    <Button
      disabled={disabled || false}
      onClick={handleDownloadSVG}
      className={cn("h-20 w-full", className || "")}
    >
      {title || "Download .SVG"}
    </Button>
  );
}

// Download PNG Button
interface DownloadPNGButtonProps extends DownloadButtonProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function DownloadPNGButton(props: DownloadPNGButtonProps) {
  const { canvasRef, filename, disabled, className, title } = props;

  function handleDownloadPNG() {
    if (!canvasRef?.current) return;

    downloadPNG(canvasRef?.current, filename);
  }

  return (
    <Button
      disabled={disabled || false}
      onClick={handleDownloadPNG}
      className={cn("h-20 w-full", className || "")}
    >
      {title || "Download .PNG"}
    </Button>
  );
}
