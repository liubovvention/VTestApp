import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ContactsScreen} from 'screens';
import {useThemedStyles} from 'styles/commonStyles';
import { Linking } from 'react-native';
import mockThemedStyles from '__mocks__/mockThemedStyles';

// Mock the dependencies
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

jest.mock('styles/commonStyles', () => ({
  useThemedStyles: jest.fn(),
}));

jest.mock('components', () => ({
    StyledButton: jest.fn(({ onPress, label }) => {
      const { Pressable, Text } = require('react-native');
      return (
        <Pressable onPress={onPress}>
          <Text>{label}</Text>
        </Pressable>
      );
    }),
  }));

describe('ContactsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useThemedStyles as jest.Mock).mockReturnValue(mockThemedStyles);
  });

  it('should render the contact buttons correctly', () => {
    const {getByText} = render(<ContactsScreen />);
    
    expect(getByText('By Email')).toBeTruthy();
    expect(getByText('By Phone')).toBeTruthy();
    expect(getByText('Via SMS')).toBeTruthy();
  });

  it('should handle email button press', () => {
    const {getByText} = render(<ContactsScreen />);
    const emailButton = getByText('By Email');

    fireEvent.press(emailButton);

    expect(Linking.openURL).toHaveBeenCalledWith('mailto:support@example.com');
  });

  it('should handle phone button press', () => {
    const {getByText} = render(<ContactsScreen />);
    const phoneButton = getByText('By Phone');

    fireEvent.press(phoneButton);

    expect(Linking.openURL).toHaveBeenCalledWith('tel:+1234567890');
  });

  it('should handle SMS button press', () => {
    const {getByText} = render(<ContactsScreen />);
    const smsButton = getByText('Via SMS');

    fireEvent.press(smsButton);

    expect(Linking.openURL).toHaveBeenCalledWith('sms:+1234567890');
  });
});
