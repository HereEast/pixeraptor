"use client";

import { MainApp } from "../MainApp";
import { Providers } from "../Providers";

export function Home() {
  return (
    <Providers>
      <MainApp />
    </Providers>
  );
}
