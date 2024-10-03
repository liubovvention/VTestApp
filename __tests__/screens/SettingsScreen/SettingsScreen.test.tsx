import React from 'react';
import {render} from '@testing-library/react-native';
import {SettingsScreen} from 'screens';
import {useAppSelector} from 'hooks/useStore';
import {useThemedStyles} from 'styles/commonStyles';

// Mock the hooks
jest.mock('hooks/useStore', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('styles/commonStyles', () => ({
  useThemedStyles: jest.fn(),
}));

describe('SettingsScreen', () => {
  it('should display logged in message when user is logged in', () => {
    // Mock the return value of useAppSelector to simulate logged-in user
    (useAppSelector as jest.Mock).mockReturnValue({email: 'test@example.com'});
    
    // Mock the themed styles
    (useThemedStyles as jest.Mock).mockReturnValue({
      container: {},
      text: {},
    });

    const {getByText} = render(<SettingsScreen />);
    
    // Check that the logged-in message is displayed
    expect(getByText("Hey, test@example.com, you're successfuly logged in")).toBeTruthy();
  });

  it('should display not logged in message when user is not logged in', () => {
    // Mock the return value of useAppSelector to simulate no user
    (useAppSelector as jest.Mock).mockReturnValue(null);
    
    // Mock the themed styles
    (useThemedStyles as jest.Mock).mockReturnValue({
      container: {},
      text: {},
    });

    const {getByText} = render(<SettingsScreen />);

    // Check that the not logged-in message is displayed
    expect(getByText("Hey, you're not logged in, but it's ok")).toBeTruthy();
  });

  it('should display menu options message', () => {
    // Simulate any user state
    (useAppSelector as jest.Mock).mockReturnValue(null);

    // Mock the themed styles
    (useThemedStyles as jest.Mock).mockReturnValue({
      container: {},
      text: {},
    });

    const {getByText} = render(<SettingsScreen />);

    // Check that the menu options message is displayed
    expect(getByText('Use the menu to explore your options')).toBeTruthy();
  });
});
