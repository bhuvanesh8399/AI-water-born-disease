declare module "leaflet" {
  export type FitBoundsOptions = Record<string, never>;
  export type LatLngBoundsExpression = [number, number] | [number, number][];
  export type LatLngExpression = [number, number];

  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
  }

  export interface TileLayerOptions {
    attribution?: string;
  }

  export class Map {}
  export class TileLayer {}

  export namespace Icon {
    class Default {
      static prototype: {
        _getIconUrl?: unknown;
      };

      static mergeOptions(options: {
        iconRetinaUrl?: string;
        iconUrl?: string;
        shadowUrl?: string;
      }): void;
    }
  }

  const Leaflet: {
    Icon: typeof Icon;
  };

  export default Leaflet;
}
