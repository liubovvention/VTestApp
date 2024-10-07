import {RouteProp} from '@react-navigation/native';
import {useGetCitiesWeatherData} from 'src/hooks/useGetCitiesWeatherData';
import {CityWeather} from 'types/weather';

const mockStoredUser = {email: 'leodance@gmail.com'};

const mockCityWeather: CityWeather = {
  city: 'New York',
  icon: '01d',
  descr: 'Clear sky',
  temp: 295.37,
  humidity: 50,
  pressure: 70,
  wspeed: 10,
  cloud: 0,
};

const mockDetailRoute: RouteProp<{Details: CityWeather}, 'Details'> = {
  key: 'Details',
  name: 'Details',
  params: mockCityWeather,
};

const mockedUseGetCitiesWeatherData = useGetCitiesWeatherData as jest.Mock;

const mockCitiesWeather: CityWeather[] = [
  {
    city: 'Kyiv',
    temp: 25,
    descr: 'Sunny',
    icon: 'sunny',
    humidity: 70,
    pressure: 10,
    wspeed: 0,
    cloud: 0,
  },
  {
    city: 'Vilnius',
    temp: 20,
    descr: 'Cloudy',
    icon: 'cloudy',
    humidity: 50,
    pressure: 40,
    wspeed: 20,
    cloud: 90,
  },
];

export {
  mockCityWeather,
  mockDetailRoute,
  mockStoredUser,
  mockedUseGetCitiesWeatherData,
  mockCitiesWeather,
};
