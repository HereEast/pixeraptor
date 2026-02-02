"use client";

import {
  CanvasContextProvider,
  SavedCanvasProvider,
  SettingsContextProvider,
} from "~/context";

import { PixelEditor } from "../PixelEditor";

export function PixelateApp() {
  return (
    <CanvasContextProvider>
      <SettingsContextProvider>
        <SavedCanvasProvider>
          <PixelEditor />
        </SavedCanvasProvider>
      </SettingsContextProvider>
    </CanvasContextProvider>
  );
}
