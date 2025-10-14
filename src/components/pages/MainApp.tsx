"use client";

import {
  CanvasContextProvider,
  SavedCanvasProvider,
  SettingsContextProvider,
} from "~/context";

import { PixelEditor } from "../PixelEditor";
import { AboutSection } from "../AboutSection";

export function MainApp() {
  return (
    <div className="mb-12">
      <CanvasContextProvider>
        <SettingsContextProvider>
          <SavedCanvasProvider>
            <PixelEditor />
          </SavedCanvasProvider>
        </SettingsContextProvider>
      </CanvasContextProvider>

      <AboutSection />
    </div>
  );
}
