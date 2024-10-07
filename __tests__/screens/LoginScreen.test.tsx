import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen from 'src/screens/LoginScreen/LoginScreen';
import {useAuth} from 'context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useActions} from 'hooks/useActions';
import {useAppSelector} from 'hooks/useStore';
import {validateEmail} from 'utils/validateUtil';
import {Alert} from 'react-native';
import {useThemedStyles} from 'styles/commonStyles';
import {selectBiometrics} from 'store/slices/auth/authSlice';
import {mockStoredUser} from '__mocks__/mockData';
import mockThemedStyles from '__mocks__/mockThemedStyles';

jest.mock('styles/commonStyles', () => ({
  useThemedStyles: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('hooks/useActions', () => ({
  useActions: jest.fn(),
}));

jest.mock('hooks/useStore', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('utils/validateUtil', () => ({
  validateEmail: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

const mockNavigate = jest.fn();
const mockOnLogin = jest.fn();
const mockSetInitialAuth = jest.fn();

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useThemedStyles as jest.Mock).mockReturnValue(mockThemedStyles);
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});
    (useAuth as jest.Mock).mockReturnValue({
      setInitialAuth: mockSetInitialAuth,
      user: mockStoredUser,
    });
    (useActions as jest.Mock).mockReturnValue({onLogin: mockOnLogin});
    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector === selectBiometrics) {
        return false; // Mock biometrics as disabled for this test
      }
      return null;
    });
    (validateEmail as jest.Mock).mockReturnValue(true); // Mock email validation to be valid
  });

  it('should display an error message for invalid email', async () => {
    (validateEmail as jest.Mock).mockReturnValueOnce(false); // Invalid email

    const {getByText, getByTestId} = render(<LoginScreen />);
    const emailInput = getByTestId('email-input');
    const loginButton = getByTestId('login-button'); // Use test ID for the login button

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Please enter a valid email address')).toBeTruthy();
    });
  });

  it('should login successfully with valid credentials', async () => {
    const {getByTestId} = render(<LoginScreen />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-button');

    fireEvent.changeText(emailInput, 'leodance@gmail.com');
    fireEvent.changeText(passwordInput, '1234567');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        isLoggedIn: false,
        user: {email: 'leodance@gmail.com'},
      });
      expect(mockNavigate).toHaveBeenCalledWith('Biometrics');
      expect(mockSetInitialAuth).not.toHaveBeenCalled();
    });
  });

  it('should show biometrics button if user is stored and biometrics is enabled', () => {
    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector === selectBiometrics) {
        return true; // Mock biometrics as enabled for this test
      }
      return null;
    });

    const {getByText} = render(<LoginScreen />);

    expect(getByText('Use Biometrcs')).toBeTruthy();
  });

  it('should use biometrics login when biometrics button is pressed', async () => {
    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector === selectBiometrics) {
        return true; // Ensure biometrics are enabled
      }
      return null;
    });

    const {getByText} = render(<LoginScreen />);
    const biometricsButton = getByText('Use Biometrcs');

    fireEvent.press(biometricsButton);

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        isLoggedIn: false,
        user: {email: 'leodance@gmail.com'},
      });
      expect(mockSetInitialAuth).toHaveBeenCalledWith(true);
    });
  });

  it('should show an alert on incorrect credentials', async () => {
    (validateEmail as jest.Mock).mockReturnValueOnce(true); // Valid email

    const {getByTestId, getByText} = render(<LoginScreen />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-button');

    fireEvent.changeText(emailInput, 'wrong@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Invalid email or password');
    });
  });
});
