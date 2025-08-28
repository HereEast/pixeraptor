import Image from "next/image";
import { ReactNode } from "react";

import { CONTACT } from "~/constants";

export const FEATURES = [
  "Upload .PNG/JPG (Max 2MB)",
  "Adjust tile size",
  "Adjust color limit",
  `Refresh palette → "RE"`,
  "Edit colors → Click on the color swatch → Select new color",
  "Download .PNG/SVG (800x800)",
];

interface AboutProps {
  children: ReactNode;
}

export function About({ children }: AboutProps) {
  return (
    <div className="flex w-full flex-col gap-8 text-sm">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Free Online Pixel Art Generator</h1>
        <h2>{children}</h2>
      </div>

      <div>
        <ul>
          {FEATURES.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <span>[+]</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>Pixeraptor is a WIP.</p>
        <p>
          More features are coming soon. In case you have any feature request,
          please drop an email at{" "}
          <a
            href={`mailto:${CONTACT.EMAIL}`}
            className="underline underline-offset-2 hover:no-underline hover:opacity-50"
          >
            {CONTACT.EMAIL}
          </a>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="size-24">
          <Image
            src="/assets/logo-img.png"
            alt="Pixeraptor Logo"
            width={400}
            height={40}
            className="transition-transform duration-300 hover:scale-160"
          />
        </div>
      </div>
    </div>
  );
}
