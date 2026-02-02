"use client";

import {
  CanvasContextProvider,
  SavedCanvasProvider,
  SettingsContextProvider,
} from "~/context";

import { PixelEditor } from "../PixelEditor";
import { GallerySection } from "../GallerySection";

export function PixelateApp() {
  return (
    <div className="mb-12">
      <CanvasContextProvider>
        <SettingsContextProvider>
          <SavedCanvasProvider>
            <PixelEditor />
          </SavedCanvasProvider>
        </SettingsContextProvider>
      </CanvasContextProvider>

      <GallerySection />
    </div>
  );
}
