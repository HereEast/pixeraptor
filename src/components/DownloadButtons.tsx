import React from "react";

import { Button } from "~/components/Button";

interface DownloadButtonsProps {
  onDownloadPNG: () => void;
  onDownloadSVG: () => void;
}

export const DownloadButtons = React.memo(function DownloadButtons({
  onDownloadPNG,
  onDownloadSVG,
}: DownloadButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button onClick={onDownloadPNG} className="h-20 flex-1">
        Download PNG
      </Button>
      <Button onClick={onDownloadSVG} className="h-20 flex-1">
        Download SVG
      </Button>
    </div>
  );
});
