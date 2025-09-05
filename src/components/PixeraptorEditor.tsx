"use client";

import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { UploadImage } from "./UploadImage";
import { DownloadPNGButton, DownloadSVGButton } from "./DownloadButtons";
import { SavedCanvasList } from "./SavedCanvasList";

import { useCanvasContext, useSettingsContext } from "~/hooks";

export function PixeraptorEditor() {
  const { image, canvasRef, filename, imageData } = useCanvasContext();
  const { tileSize, editedColors, tileAssignments } = useSettingsContext();

  return (
    <section className="mb-24">
      <div className="flex w-full flex-col justify-between gap-16 md:flex-row md:gap-6">
        {/* Canvas & Controls */}
        <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-[minmax(0,400px)_minmax(0,440px)] md:gap-6">
          {/* 1 */}
          <div className="flex w-full flex-col gap-2">
            <UploadImage />

            <div className="flex flex-col gap-6">
              <Canvas />

              {image && (
                <div className="flex flex-col gap-2 lg:flex-row">
                  <DownloadPNGButton
                    canvasRef={canvasRef}
                    filename={filename}
                  />

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

          {/* 2 */}
          <div className="md:mt-12">{image && <Controls />}</div>
        </div>

        {/* Saved List */}
        <div className="max-h-full md:mt-3 md:ml-auto">
          <SavedCanvasList />
        </div>
      </div>
    </section>
  );
}
