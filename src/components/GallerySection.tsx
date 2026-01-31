"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Skeleton } from "./ui/Skeleton";

import { CONTACT, GALLERY_IMAGES_COUNT, ABOUT_FEATURES } from "~/constants";
import { IPublicImageData } from "~/types";
import { cn } from "~/utils";

// About Section
export function GallerySection() {
  const imagesData = useMemo<IPublicImageData[]>(() => {
    return new Array(GALLERY_IMAGES_COUNT).fill(0).map((_, i) => {
      const imageIdx = String(i + 1).padStart(2, "0");

      return {
        src: `/assets/gallery/img-${imageIdx}.png`,
        alt: `Image ${imageIdx}`,
        id: `img-${imageIdx}`,
      };
    });
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

// Gallery
interface GalleryProps {
  imagesData: IPublicImageData[];
  className?: string;
}

export function Gallery({ imagesData, className }: GalleryProps) {
  return (
    <div>
      <ul
        className={cn(
          "grid grid-cols-3 gap-2 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]",
          className,
        )}
      >
        {imagesData.length === 0 &&
          Array.from({ length: imagesData.length }).map((_, i) => (
            <li key={i}>
              <Skeleton />
            </li>
          ))}

        {imagesData.map((image) => (
          <ImageItem key={image.id} image={image} />
        ))}
      </ul>
    </div>
  );
}

// Image Item
interface ImageItemProps {
  image: IPublicImageData;
}

function ImageItem({ image }: ImageItemProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <li>
      <Image
        src={image.src}
        alt={image.alt}
        width={400}
        height={400}
        onError={() => setHasError(true)}
      />
    </li>
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
