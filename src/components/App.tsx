"use client";

import { ToolContainer } from "./ToolContainer";
import { UploadImage } from "./UploadImage";
import { Canvas } from "./Canvas";
import { TileRange } from "./TileRange";
import { ColorsRange } from "./ColorsRange";
import { Colors } from "./Colors";
import { DownloadButtons } from "./DownloadButtons";

import { useCanvasContext, useSettingsContext } from "~/hooks";

export function App() {
  const { image } = useCanvasContext();
  const { tileAssignments, editedColors, replaceColor, download } =
    useSettingsContext();

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

        {isLoaded && (
          <div className="flex flex-col gap-3">
            <ToolContainer>
              <TileRange />
            </ToolContainer>

            <ToolContainer className="gap-6">
              <ColorsRange />

              <Colors colors={editedColors} handleChange={replaceColor} />
            </ToolContainer>
          </div>
        )}
      </div>
    </section>
  );
}
