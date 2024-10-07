import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {BiometricScreen} from 'screens';
import {useActions} from 'hooks/useActions';
import {Alert, AlertButton} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {ScreenNames} from 'types/navigation';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-native-biometrics');

const mockOnSetBiometrics = jest.fn();
jest.mock('hooks/useActions', () => ({
  useActions: () => ({
    onSetBiometrics: mockOnSetBiometrics,
  }),
}));

describe('BiometricScreen', () => {
  const mockNavigation = {navigate: jest.fn()};
  const mockAlert = jest.spyOn(Alert, 'alert');
  const mockIsSensorAvailable = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (ReactNativeBiometrics as jest.Mock).mockImplementation(() => ({
      isSensorAvailable: mockIsSensorAvailable,
    }));
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    const {getByText} = render(<BiometricScreen />);

    expect(getByText('Setup Biometrics')).toBeTruthy();
    expect(getByText('Setup Biometric Auth')).toBeTruthy();
  });

  it('should show an alert if biometrics are not supported', async () => {
    mockIsSensorAvailable.mockResolvedValue({
      available: false,
      biometryType: null,
    });

    const {getByText} = render(<BiometricScreen />);

    fireEvent.press(getByText('Setup Biometric Auth'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Biometrics not supported',
        'This device does not support biometric authentication.',
      );
    });
  });

  it('should show alert for TouchID availability', async () => {
    mockIsSensorAvailable.mockResolvedValue({
      available: true,
      biometryType: 'TouchID',
    });

    const {getByText} = render(<BiometricScreen />);

    fireEvent.press(getByText('Setup Biometric Auth'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'TouchID',
        'Would you like to enable TouchID authentication for the next time?',
        expect.any(Array),
      );
    });
  });

  it('should show error alert if biometrics setup fails', async () => {
    mockIsSensorAvailable.mockResolvedValue({
      available: true,
      biometryType: 'TouchID',
    });

    mockOnSetBiometrics.mockImplementation(() => {
      throw new Error('Keychain error');
    });

    const {getByText} = render(<BiometricScreen />);

    fireEvent.press(getByText('Setup Biometric Auth'));

    await waitFor(() => {
      const alertButtons = mockAlert.mock.calls[0][2];
      if (alertButtons) {
        const yesButton = alertButtons.find(
          button => button.text === 'Yes please',
        );

        if (yesButton && yesButton.onPress) {
          yesButton.onPress();
        }
      }
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while enabling biometrics.',
      );
    });
  });

  it('should enable biometrics and navigate to login on success', async () => {
    mockOnSetBiometrics.mockResolvedValueOnce(true);
    mockIsSensorAvailable.mockResolvedValue({
      available: true,
      biometryType: 'FaceID',
    });

    const {getByText} = render(<BiometricScreen />);

    fireEvent.press(getByText('Setup Biometric Auth'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledTimes(1);
    });

    const alertButtons = mockAlert.mock.calls[0][2];

    if (alertButtons) {
      const yesButton = alertButtons.find(
        button => button.text === 'Yes please',
      );

      if (yesButton && yesButton.onPress) {
        yesButton.onPress();
      }
    }

    await waitFor(() => {
      // Check the second alert for the success message
      expect(mockAlert).toHaveBeenNthCalledWith(
        2,
        'Success!',
        'FaceID authentication enabled successfully!',
      );

      expect(mockOnSetBiometrics).toHaveBeenCalled();
      expect(mockNavigation.navigate).toHaveBeenCalledWith(ScreenNames.Login);
    });
  });
});
