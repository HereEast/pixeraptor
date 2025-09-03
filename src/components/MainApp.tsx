"use client";

import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { UploadImage } from "./UploadImage";
import { DownloadButtons } from "./DownloadButtons";
import { About } from "./About";

import { useCanvasContext } from "~/hooks";
import { SavedCanvasList } from "./SavedCanvasList";

export function MainApp() {
  const { image } = useCanvasContext();

  return (
    <div className="flex w-full flex-col gap-6 xl:flex-row">
      <section className="flex w-full flex-col gap-2">
        <UploadImage />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,400px)_minmax(0,440px)]">
          <div className="flex flex-col gap-6">
            <Canvas />

            {image && <DownloadButtons />}
          </div>

          {image && <Controls />}
        </div>
      </section>

      <SavedCanvasList />

      {/* <section className="flex max-w-[400px] pt-10 pr-4">
        <About>
          Transform your image into pixel art with Pixeraptor. Customize tile
          sizes, edit colors, and export as PNG or SVG.
        </About>
      </section> */}
    </div>
  );
}
