import React from 'react';

const MockTab = ({children}) => <>{children}</>;

export const createBottomTabNavigator = jest.fn(() => ({
    Navigator: MockTab,
    Screen: MockTab,
  }));