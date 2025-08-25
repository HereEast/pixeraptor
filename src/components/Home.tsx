"use client";

import { App } from "./App";
import { Providers } from "./Providers";

export function Home() {
  return (
    <Providers>
      <App />
    </Providers>
  );
}
