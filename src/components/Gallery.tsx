import Image from "next/image";

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
      <ul className={cn("grid grid-cols-3 gap-2 lg:grid-cols-5", className)}>
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
