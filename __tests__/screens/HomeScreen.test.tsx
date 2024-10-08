// __tests__/HomeScreen.test.tsx
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {HomeScreen} from 'screens';
import {useGetCitiesWeatherData} from 'hooks/useGetCitiesWeatherData';
import {NavigationContainer} from '@react-navigation/native';
import {useThemedStyles} from 'styles/commonStyles';
import {mockCitiesWeather} from '__mocks__/mockData';
import mockThemedStyles from '__mocks__/mockThemedStyles';

// Mock the useGetCitiesWeatherData hook
jest.mock('hooks/useGetCitiesWeatherData');

jest.mock('styles/commonStyles', () => ({
  useThemedStyles: jest.fn(),
}));

describe('HomeScreen', () => {
  const mockedUseGetCitiesWeatherData = useGetCitiesWeatherData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useThemedStyles as jest.Mock).mockReturnValue(mockThemedStyles);
  });

  const renderHomeScreen = () => {
    return render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
  };

  it('displays loading state when data is loading', () => {
    mockedUseGetCitiesWeatherData.mockReturnValue({
      citiesWeather: null,
      loading: true,
      error: null,
    });

    renderHomeScreen();

    expect(screen.getByText(/Loading.../i)).toBeTruthy();
  });

  it('displays error message when there is an error', () => {
    mockedUseGetCitiesWeatherData.mockReturnValue({
      citiesWeather: null,
      loading: false,
      error: 'Failed to fetch data',
    });

    renderHomeScreen();

    expect(screen.getByText(/Error: Failed to fetch data/i)).toBeTruthy();
  });

  it('displays the list of cities when data is loaded', () => {
    mockedUseGetCitiesWeatherData.mockReturnValue({
      citiesWeather: mockCitiesWeather,
      loading: false,
      error: null,
    });

    renderHomeScreen();

    expect(screen.getByText('Kyiv')).toBeTruthy();
    expect(screen.getByText('Vilnius')).toBeTruthy();
  });
});
