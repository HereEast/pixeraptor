import type { MetadataRoute } from "next";

import { BASE_URL, ROUTE } from "~/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/${ROUTE.ABOUT}`,
      lastModified: new Date(),
    },
  ];
}
