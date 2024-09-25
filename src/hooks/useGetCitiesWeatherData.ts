import { useState, useEffect } from 'react';
import { CityWeather, WeatherResponse } from 'types/weather';
import ApiService from 'services/apiService';


export const useGetCitiesWeatherData = (cities: string[]) => {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      setLoading(true);
      try {
        const weatherData: CityWeather[] = await Promise.all(
          cities.map(async (city) => {
            const result: WeatherResponse = await ApiService.get('/weather', {
              q: city,
            });
            const cWeather: CityWeather = {
              city: result.name,
              icon: result.weather[0].icon,
              descr: result.weather[0].main,
              temp: result.main.temp,
              humidity: result.main.humidity,
              pressure: result.main.pressure,
              wspeed: result.wind.speed,
              cloud: result.clouds.all,
            };
            return cWeather;
          })
        );

        setCitiesWeather(weatherData);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch cities weather');
      } finally {
        setLoading(false);
      }
    };

    if (cities.length) {
      fetchCitiesWeather();
    }
  }, [cities]);

  return { citiesWeather, loading, error };
};
