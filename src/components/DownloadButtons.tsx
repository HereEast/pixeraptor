import React from "react";

import { Button } from "~/components/ui/Button";

interface DownloadButtonsProps {
  onDownloadPNG: () => void;
  onDownloadSVG: () => void;
}

export const DownloadButtons = React.memo(function DownloadButtons({
  onDownloadPNG,
  onDownloadSVG,
}: DownloadButtonsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button onClick={onDownloadPNG} className="h-20 w-full">
        Download .PNG
      </Button>
      <Button onClick={onDownloadSVG} className="h-20 w-full">
        Download .SVG
      </Button>
    </div>
  );
});
