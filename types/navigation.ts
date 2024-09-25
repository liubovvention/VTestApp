import { CityWeather } from "./weather";

export type StackParamList = {
    Weather: undefined;          // Screen "Weather" does not require any parameters
    Details: CityWeather;   // Screen "City Weather" also doesn't require parameters for now
  };