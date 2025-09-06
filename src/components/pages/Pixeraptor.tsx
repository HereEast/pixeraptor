"use client";

import { Providers } from "../Providers";
import { PixeraptorEditor } from "../PixeraptorEditor";
import { AboutSection } from "../AboutSection";

export function Pixeraptor() {
  return (
    <div className="mb-12">
      <Providers>
        <PixeraptorEditor />
      </Providers>

      <AboutSection />
    </div>
  );
}
