import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {BiometricScreen} from 'screens';
import {useActions} from 'hooks/useActions';
import {Alert} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

//jest.mock('react-native-biometrics');

jest.mock('hooks/useActions', () => ({
  useActions: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

describe('BiometricScreen', () => {
  const mockNavigation = {navigate: jest.fn()};
  const mockOnSetBiometrics = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useActions as jest.Mock).mockReturnValue({
      onSetBiometrics: mockOnSetBiometrics,
    });
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const {getByText} = render(<BiometricScreen />);

    expect(getByText('Setup Biometrics')).toBeTruthy();
  });

});
