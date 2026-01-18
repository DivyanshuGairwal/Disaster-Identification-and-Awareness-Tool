export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  windSpeed: number;
  humidity?: number; // Optional depending on API
  locationName?: string;
}

// USGS Earthquake Feature Interface
export interface DisasterFeature {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: number | null;
    url: string;
    detail: string;
    felt: number | null;
    cdi: number | null;
    mmi: number | null;
    alert: string | null;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: number | null;
    dmin: number | null;
    rms: number | null;
    gap: number | null;
    magType: string;
    type: string;
    title: string;
  };
  geometry: {
    type: "Point";
    coordinates: number[]; // [longitude, latitude, depth]
  };
}

export interface DisasterResponse {
  type: "FeatureCollection";
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: DisasterFeature[];
}
