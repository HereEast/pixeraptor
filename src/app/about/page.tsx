import Image from "next/image";

import { ABOUT_FEATURES, CONTACT } from "~/constants";

export default function AboutPage() {
  return (
    <div className="max-w-[400px]">
      <div className="flex w-full flex-col gap-8 text-sm">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold">Free Online Pixel Art Generator</h1>

          <div className="flex flex-col gap-8">
            <p>
              Pixeraptor is a free pixel art generator that turns your photos
              into cool pixel art in just a few clicks!{" "}
            </p>
            <p>
              Upload any PNG or JPG image (up to 2MB) and watch it transform
              into awesome retro art. Whether you want to make 8-bit art for fun
              or create sprites for games, this online pixel art tool makes it
              super easy to pixelate images.
            </p>
          </div>
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

        <div className="mt-8 size-24">
          <Image
            src="/assets/images/logo-img.png"
            alt="Pixeraptor Logo"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
