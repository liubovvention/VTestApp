import React from 'react';

const MockStack = ({children}) => <>{children}</>;

export const createNativeStackNavigator = jest.fn(() => ({
  Navigator: MockStack,
  Screen: MockStack,
}));
