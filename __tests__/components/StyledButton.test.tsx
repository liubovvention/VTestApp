import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {StyledButton} from 'src/components'; 

describe('StyledButton', () => {
  const mockOnPress = jest.fn();

  it('renders without crashing', () => {
    const { getByText } = render(
      <StyledButton label="Test Button" onPress={mockOnPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <StyledButton label="Test Button" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not render label when not provided', () => {
    const { queryByText } = render(
      <StyledButton onPress={mockOnPress} />
    );

    expect(queryByText('Test Button')).toBeNull();
  });

  it('applies custom styles', () => {
    const { getByTestId } = render(
      <StyledButton label="Styled Button" onPress={mockOnPress} styles={{ borderWidth: 2 }} />
    );

    const button = getByTestId('styled-button'); // the testID to find the Pressable
    expect(button.props.style).toContainEqual({ borderWidth: 2 });
  });
});
