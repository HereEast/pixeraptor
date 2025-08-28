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
    <div className="flex w-full gap-6">
      <section className="flex w-full flex-col gap-2">
        <UploadImage />

        <div className="flex gap-6">
          <div className="relative flex max-w-[400px] flex-col gap-6">
            <Canvas />

            {image && (
              <DownloadButtons
                onDownloadPNG={download.savePNG}
                onDownloadSVG={download.saveSVG}
              />
            )}
          </div>

          {image && (
            <div className="w-[440px]">
              <Controls />
            </div>
          )}
        </div>
      </section>

      <section className="flex max-w-[400px] pt-10 pr-4">
        <About>
          Transform your image into pixel art with Pixeraptor. Customize tile
          sizes, edit colors, and export as PNG or SVG.
        </About>
      </section>
    </div>
  );
}
