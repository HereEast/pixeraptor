declare module "svgcanvas" {
  export class Context {
    constructor(width: number, height: number);
    fillStyle: string;
    fillRect(x: number, y: number, width: number, height: number): void;
    getSerializedSvg(): string;
    getSvg(): SVGElement;
  }

  export class Element {
    constructor(options?: {
      width?: number;
      height?: number;
      ctx?: CanvasRenderingContext2D;
      enableMirroring?: boolean;
      document?: Document;
    });
    ctx: Context;
    wrapper: HTMLDivElement;
    svg: SVGElement;
  }
}
