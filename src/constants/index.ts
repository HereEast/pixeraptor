import { RGBColor } from "~/types";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://pixeraptor.com");

export const MIN_TILE_SIZE = 16;
export const MAX_TILE_SIZE = 60;
export const TILE_SIZE_STEP = 2;

export const MIN_COLOR_LIMIT = 2;
export const MAX_COLOR_LIMIT = 20;

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 800;

export const DEFAULT_COLOR_LIMIT = 10;
export const DEFAULT_TILE_SIZE = 20;

export const FALLBACK_COLOR = [234, 234, 234] as RGBColor;
export const SAVED_CANVAS_LIMIT = 10;

export const GALLERY_IMAGES_COUNT = 4;

export const ROUTE = {
  HOME: "/",
  ABOUT: "/about",
};

export const CONTACT = {
  EMAIL: "heypeoplework@gmail.com",
};
