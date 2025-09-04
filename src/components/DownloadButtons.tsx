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
  function handleDownloadSVG() {
    if (!props.imageData) return;

    downloadSVG({
      tileSize: props.tileSize,
      filename: props.filename,
      colors: props.editedColors,
      imageData: props.imageData,
      tileAssignments: props.tileAssignments,
    });
  }

  return (
    <Button
      disabled={props.disabled || false}
      onClick={handleDownloadSVG}
      className={cn("h-20 w-full", props.className || "")}
    >
      {props.title || "Download .SVG"}
    </Button>
  );
}

// Download PNG Button
interface DownloadPNGButtonProps extends DownloadButtonProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function DownloadPNGButton(props: DownloadPNGButtonProps) {
  function handleDownloadPNG() {
    if (!props.canvasRef?.current) return;

    downloadPNG(props.canvasRef?.current, props.filename);
  }

  return (
    <Button
      disabled={props.disabled || false}
      onClick={handleDownloadPNG}
      className={cn("h-20 w-full", props.className || "")}
    >
      {props.title || "Download .PNG"}
    </Button>
  );
}
