export interface CityWeather {
  city: string;
  icon: string;
  descr: string;
  temp: number;
  humidity: number;
  pressure: number;
  wspeed: number;
  cloud: number;
}

export interface WeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  rain?: Rain; // Optional
  clouds: Clouds;
  dt: number;
  sys: SystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number; // Optional
  grnd_level?: number; // Optional
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number; // Optional
}

export interface Rain {
  '1h'?: number; // Optional
}

export interface Clouds {
  all: number;
}

export interface SystemInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
