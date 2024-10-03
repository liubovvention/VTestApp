import React from 'react';
import {Alert} from 'react-native';
import {render} from '@testing-library/react-native';
import {LogoutScreen} from 'screens';
import {useAuth} from 'context/AuthContext';
import {useActions} from 'hooks/useActions';
import {useThemedStyles} from 'styles/commonStyles';

jest.mock('context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('hooks/useActions', () => ({
  useActions: jest.fn(),
}));

jest.mock('styles/commonStyles', () => ({
  useThemedStyles: jest.fn(),
}));

// Mock the Alert module
jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

describe('LogoutScreen', () => {
  const mockThemedStyles = {
    container: {padding: 10},
    title: {fontSize: 20},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useThemedStyles as jest.Mock).mockReturnValue(mockThemedStyles);
  });

  it('should call onLogout and setInitialAuth on mount', async () => {
    const setInitialAuthMock = jest.fn();
    const onLogoutMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      setInitialAuth: setInitialAuthMock,
    });

    (useActions as jest.Mock).mockReturnValue({
      onLogout: onLogoutMock,
    });

    render(<LogoutScreen />);

    expect(onLogoutMock).toHaveBeenCalled();

    expect(Alert.alert).toHaveBeenCalledWith('Logged out successfully');

    expect(setInitialAuthMock).toHaveBeenCalledWith(false);
  });
});
