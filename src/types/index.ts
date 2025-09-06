export type RGBColor = [number, number, number];

export interface ISavedCanvas {
  dataUrl: string; // base64 data URL
  settings: {
    colors: string[];
    tileSize: number;
    tileAssignments: number[];
    imageData: ImageData;
  };
}

export interface IPublicImageData {
  src: string;
  alt: string;
  id: string;
}
