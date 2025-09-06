import Image from "next/image";
import { useState } from "react";

import { Skeleton } from "./ui/Skeleton";
import { IPublicImageData } from "~/types";
import { cn } from "~/utils";

interface GalleryProps {
  imagesData: IPublicImageData[];
  className?: string;
}

export function Gallery({ imagesData, className }: GalleryProps) {
  return (
    <div>
      <ul
        className={cn(
          "grid grid-cols-3 gap-2 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]",
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
