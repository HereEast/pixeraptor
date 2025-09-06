"use client";

import { useState, useEffect } from "react";

import { Gallery } from "./Gallery";
import { CONTACT, GALLERY_IMAGES_COUNT, ABOUT_FEATURES } from "~/constants";
import { IPublicImageData } from "~/types";
import Image from "next/image";

// About Section
export function AboutSection() {
  const [imagesData, setImagesData] = useState<IPublicImageData[]>([]);

  useEffect(() => {
    const imagesData = new Array(GALLERY_IMAGES_COUNT).fill(0).map((_, i) => {
      const imageIdx = String(i + 1).padStart(2, "0");

      return {
        src: `/assets/gallery/gallery-img-${imageIdx}.png`,
        alt: `Gallery Image ${imageIdx}`,
        id: `gallery-img-${imageIdx}`,
      };
    });

    setImagesData(imagesData);
  }, []);

  return (
    <section className="grid md:grid-cols-[1fr_85px] md:gap-6">
      <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-[minmax(0,400px)_minmax(0,1200px)] md:gap-6">
        <div className="md:pr-4">
          <Description />
        </div>

        <Gallery imagesData={imagesData} />
      </div>

      <div className="hidden md:block" />
    </section>
  );
}

// Description
function Description() {
  return (
    <div className="flex h-full flex-col justify-between gap-16">
      <div className="flex w-full flex-col gap-8 text-sm">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Free Online Pixel Art Generator</h1>
          <h2>
            Transform your image into pixel art with Pixeraptor. Customize tile
            sizes, edit colors, and export as PNG or SVG.
          </h2>
        </div>

        <div>
          <ul>
            {ABOUT_FEATURES.map((feature, i) => (
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
      </div>

      <div className="hidden size-20 md:block">
        <Image
          src="/assets/images/logo-img.png"
          alt="Pixeraptor Logo"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
