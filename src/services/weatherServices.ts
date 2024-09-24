import {CityWeather, WeatherResponse} from 'types/weather';
import ApiService from './apiService';

class WeatherServices {
  public static async getCityWeather(
    city: string,
  ): Promise<CityWeather | void> {
    try {
      const result: WeatherResponse = await ApiService.get('/weather', {
        q: city,
      });
      const cWeather = {
        city: result.name,
        icon: result.weather[0].icon,
        descr: result.weather[0].main,
        temp: result.main.temp,
      };

      return cWeather;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  public static async getCitiesWeather(
    cities: string[],
  ): Promise<CityWeather[]> {
    const weatherData: CityWeather[] = [];

    for (const city of cities) {
        const cityWeather = await this.getCityWeather(city);
        if (cityWeather) weatherData.push(cityWeather);
      }

    return weatherData;
  }
}

export default WeatherServices;
