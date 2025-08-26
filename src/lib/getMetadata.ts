import { Metadata } from "next";

import { BASE_URL } from "~/constants";

const SEO_DATA = {
  title: "Pixeraptor - Free Online Pixel Art Generator",
  description:
    "Transform any image into pixel art with Pixeraptor. Customize tile sizes, edit colors, and export as PNG or SVG. Free online pixel art generator tool.",
  url: BASE_URL,
  imageUrl: `${BASE_URL}/og-image.png`,
  keywords: [
    "pixel art generator",
    "pixelate image",
    "image to pixel art",
    "online pixel art tool",
    "retro art generator",
    "8-bit art creator",
    "pixel art editor",
    "pixelator",
    "sprite maker",
    "pixel art",
    "pixel art tool",
    "pixel art editor",
    "pixel art maker",
  ],
};

export function getMetadata(): Metadata {
  return {
    title: SEO_DATA.title,
    description: SEO_DATA.description,
    category: "Design Tools",
    keywords: SEO_DATA.keywords,
    metadataBase: new URL(SEO_DATA.url),
    alternates: {
      canonical: SEO_DATA.url,
    },
    openGraph: {
      title: SEO_DATA.title,
      description: SEO_DATA.description,
      url: SEO_DATA.url,
      siteName: SEO_DATA.title,
      images: [
        {
          url: SEO_DATA.imageUrl,
          width: 1200,
          height: 630,
          alt: SEO_DATA.title,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SEO_DATA.title,
      description: SEO_DATA.description,
      images: [
        {
          url: SEO_DATA.imageUrl,
          alt: SEO_DATA.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
