import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CityItem from 'src/components/CityItem/CityItem';
import { useNavigation } from '@react-navigation/native';
import { CityWeather } from 'types/weather';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

jest.mock('utils/tempUtils', () => ({
  kelvinToFahrenheit: jest.fn((kelvin: number) => Math.round((kelvin - 273.15) * 9/5 + 32)),
}));

const mockedNavigate = jest.fn();

describe('CityItem', () => {
  const mockCityWeather: CityWeather = {
      city: 'New York',
      icon: '01d',
      descr: 'Clear sky',
      temp: 295.37,
      humidity: 50,
      pressure: 70,
      wspeed: 10,
      cloud: 0
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockedNavigate });
  });

  it('should display the correct city weather information', () => {
    const { getByText } = render(<CityItem item={mockCityWeather} />);

    expect(getByText('New York')).toBeTruthy();
    expect(getByText('Clear sky')).toBeTruthy();
    expect(getByText('72°F')).toBeTruthy(); // kelvinToFahrenheit(295.37)
  });

  it('should navigate when the pressable button is pressed', () => {
    const { getByTestId } = render(<CityItem item={mockCityWeather} isPressable={true} />);

    const pressable = getByTestId('chevron-right-button');
    fireEvent.press(pressable);

    expect(mockedNavigate).toHaveBeenCalledWith('Details', mockCityWeather);
  });

  it('should not render the pressable button when isPressable is false', () => {
    const { queryByTestId } = render(<CityItem item={mockCityWeather} isPressable={false} />);

    expect(queryByTestId('chevron-right-button')).toBeNull();
  });
});
