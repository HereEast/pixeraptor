import Image from "next/image";
import { Button, ButtonLink } from "~/components/ui/Button";

import { Skeleton } from "~/components/ui/Skeleton";

import { ABOUT_FEATURES, ROUTE } from "~/constants";
import { IPublicImageData } from "~/types";
import { cn } from "~/utils";

export const IMAGES_COUNT = 18;

export default function HomePage() {
  const imagesData = new Array(IMAGES_COUNT).fill(0).map((_, i) => {
    const imageIdx = String(i + 1).padStart(2, "0");

    return {
      src: `/assets/gallery/img-${imageIdx}.png`,
      alt: `Image ${imageIdx}`,
      id: `img-${imageIdx}`,
    };
  });

  return (
    <section>
      <div className="mb-10 grid w-full grid-cols-1 gap-10 md:grid-cols-[minmax(0,400px)_minmax(0,1200px)] lg:gap-20">
        <Description />
        <Gallery imagesData={imagesData} />
      </div>
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
          <li key={image.id}>
            <Image src={image.src} alt={image.alt} width={400} height={400} />
          </li>
        ))}
      </ul>
    </div>
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
          <ButtonLink href={ROUTE.PIXELATE} className="h-20 w-full">
            Pixelate →
          </ButtonLink>
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
