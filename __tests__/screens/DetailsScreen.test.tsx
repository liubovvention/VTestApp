import React from 'react';
import {render} from '@testing-library/react-native';
import {DetailsScreen} from 'screens';
import {CityWeather} from 'types/weather';
import {RouteProp} from '@react-navigation/native';
import {mockCityWeather, mockDetailRoute} from '__mocks__/mockData';

// Mock useNavigation from @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('DetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render city weather', () => {
    const mockNavigation = jest
      .requireMock('@react-navigation/native')
      .useNavigation();

    const {getByText} = render(
      <DetailsScreen route={mockDetailRoute} navigation={mockNavigation} />,
    );
    expect(getByText('New York')).toBeTruthy();
  });
});
