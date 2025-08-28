"use client";

import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { UploadImage } from "./UploadImage";
import { DownloadButtons } from "./DownloadButtons";
import { About } from "./About";

import { useCanvasContext, useSettingsContext } from "~/hooks";

export function MainApp() {
  const { image } = useCanvasContext();
  const { tileAssignments, download } = useSettingsContext();

  // const isLoaded = image && tileAssignments.length > 0;

  return (
    <div className="w-full">
      <UploadImage />

      <div className="flex w-full gap-10">
        {/* Col 1 */}
        <div className="relative flex max-w-[400px] flex-col gap-6">
          {!image && (
            <div className="absolute inset-0 size-[400px] bg-zinc-200" />
          )}

          <Canvas />

          {image && (
            <DownloadButtons
              onDownloadPNG={download.savePNG}
              onDownloadSVG={download.saveSVG}
            />
          )}
        </div>

        {/* Col 2 */}
        {image && (
          <div className="w-[440px]">
            <Controls />
          </div>
        )}

        {/* Col 3 */}
        <div className="ml-auto flex max-w-[400px]">
          <About>
            Transform your image into pixel art with Pixeraptor. Customize tile
            sizes, edit colors, and export as PNG or SVG.
          </About>
        </div>
      </div>
    </div>
  );
}
