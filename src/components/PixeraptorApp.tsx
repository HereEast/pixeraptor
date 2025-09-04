"use client";

import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { UploadImage } from "./UploadImage";
import { DownloadPNGButton, DownloadSVGButton } from "./DownloadButtons";
import { SavedCanvasList } from "./SavedCanvasList";
import { About } from "./About";

import { useCanvasContext, useSettingsContext } from "~/hooks";

export function PixeraptorApp() {
  const { image, canvasRef, filename, imageData } = useCanvasContext();
  const { tileSize, editedColors, tileAssignments } = useSettingsContext();

  return (
    <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-[minmax(0,400px)_minmax(0,440px)_1fr] md:gap-6">
      <section className="flex w-full flex-col gap-2">
        <UploadImage />

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-6">
            <Canvas />

            {image && (
              <div className="flex flex-col gap-2 lg:flex-row">
                <DownloadPNGButton canvasRef={canvasRef} filename={filename} />

                <DownloadSVGButton
                  tileSize={tileSize}
                  editedColors={editedColors}
                  imageData={imageData}
                  tileAssignments={tileAssignments}
                  filename={filename}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="md:mt-12">{image && <Controls />}</section>

      <section className="max-h-full md:mt-3 md:ml-auto">
        <SavedCanvasList />
      </section>

      {/* <section className="flex max-w-[400px] pt-10 pr-4">
        <About>
          Transform your image into pixel art with Pixeraptor. Customize tile
          sizes, edit colors, and export as PNG or SVG.
        </About>
      </section> */}
    </div>
  );
}
