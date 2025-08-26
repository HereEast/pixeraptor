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

export const DEFAULT_COLOR_LIMIT = 5;
export const DEFAULT_TILE_SIZE = 42;
