import {useState, useEffect} from 'react';
import ApiService from 'services/apiService';
import {CityWeather, WeatherResponse} from 'types/weather';

export const useGetCityWeatherData = (city: string) => {
  const [cityWeather, setCityWeather] = useState<CityWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCityWeather = async () => {
      setLoading(true);
      try {
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

        setCityWeather(cWeather);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchCityWeather();
    }
  }, [city]);

  return {cityWeather, loading, error};
};
