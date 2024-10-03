import React from 'react';
import DeviceInfo from 'react-native-device-info';
import {render} from '@testing-library/react-native';
import {InfoScreen} from 'screens';
import {useThemedStyles} from 'styles/commonStyles';

jest.mock('styles/commonStyles', () => ({
  useThemedStyles: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '1.0.0'),
  getBuildNumber: jest.fn(() => '0001'), // Mocking getBuildNumber
}));

describe('InfoScreen', () => {
  const mockThemedStyles = {
    container: {padding: 10},
    title: {fontSize: 20},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useThemedStyles as jest.Mock).mockReturnValue(mockThemedStyles);
  });

  it('should display the correct device info', () => {
    const {getByText} = render(<InfoScreen />);

    expect(DeviceInfo.getVersion).toHaveBeenCalled();
    expect(DeviceInfo.getBuildNumber).toHaveBeenCalled();

    expect(getByText('Version: 1.0.0')).toBeTruthy();
    expect(getByText('Build: 0001')).toBeTruthy();
  });
});
