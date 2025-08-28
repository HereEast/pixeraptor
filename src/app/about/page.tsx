import { About } from "~/components/About";

export default function AboutPage() {
  return (
    <div className="max-w-[400px]">
      <About>
        <div className="flex flex-col gap-8">
          <p>
            Pixeraptor is a free pixel art generator that turns your photos into
            cool pixel art in just a few clicks!{" "}
          </p>
          <p>
            Upload any PNG or JPG image (up to 2MB) and watch it transform into
            awesome retro art. Whether you want to make 8-bit art for fun or
            create sprites for games, this online pixel art tool makes it super
            easy to pixelate images.
          </p>
        </div>
      </About>
    </div>
  );
}
