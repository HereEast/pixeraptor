"use client";

import { Canvas } from "./Canvas";
import { UploadImage } from "./UploadImage";
import { DownloadButtons } from "./DownloadButtons";
import { Controls } from "./Controls";

import { useCanvasContext, useSettingsContext } from "~/hooks";

export function App() {
  const { image } = useCanvasContext();
  const { tileAssignments, download } = useSettingsContext();

  const isLoaded = image && tileAssignments.length > 0;

  return (
    <section className="w-full max-w-5xl">
      <UploadImage />

      <div className="grid grid-cols-[400px_minmax(400px,600px)] gap-10">
        <div className="relative flex flex-col gap-6">
          {!isLoaded && (
            <div className="absolute inset-0 size-[400px] bg-zinc-200" />
          )}

          <Canvas />

          {/* Download buttons */}
          {isLoaded && (
            <DownloadButtons
              onDownloadPNG={download.savePNG}
              onDownloadSVG={download.saveSVG}
            />
          )}
        </div>

        {isLoaded && <Controls />}
      </div>
    </section>
  );
}
