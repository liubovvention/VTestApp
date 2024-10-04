import React from 'react';
import {render} from '@testing-library/react-native';
import {DetailsScreen} from 'screens';
import {CityWeather} from 'types/weather';
import {RouteProp} from '@react-navigation/native';

// Mock useNavigation from @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('DetailsScreen', () => {
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

  const mockRoute: RouteProp<{Details: CityWeather}, 'Details'> = {
    key: 'Details-1',
    name: 'Details',
    params: mockCityWeather,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render city weather', () => {
    const mockNavigation = jest
      .requireMock('@react-navigation/native')
      .useNavigation();

    const {getByText} = render(
      <DetailsScreen route={mockRoute} navigation={mockNavigation} />,
    );
    expect(getByText('New York')).toBeTruthy();
  });
});
