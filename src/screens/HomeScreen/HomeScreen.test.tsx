// HomeScreen.test.tsx

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import WeatherService from '../../services/weatherServices';
import { CityWeather } from 'types/weather';
import citiesList from './data/citiesList.json';

// Mock the WeatherService
jest.mock('../../services/weatherServices');

const mockWeatherData: CityWeather[] = [
    {
      city: 'City A',
      icon: 'd10',
      descr: 'Clear',
      temp: 25,
      humidity: 50, 
      pressure: 1012, 
      wspeed: 5, 
      cloud: 0, 
    },
    {
      city: 'City B',
      icon: 'd10',
      descr: 'Cloudy',
      temp: 20,
      humidity: 60, 
      pressure: 1010, 
      wspeed: 3, 
      cloud: 20, 
    },
  ];
  

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders error message when there is an error', async () => {
    (WeatherService.getCitiesWeather as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<HomeScreen />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeTruthy();
    });
  });

  it('renders weather data when fetched successfully', async () => {
    (WeatherService.getCitiesWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<HomeScreen />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
      expect(screen.getByText('City A')).toBeTruthy();
      expect(screen.getByText('City B')).toBeTruthy();
    });
  });
});
