import React from 'react';

const MockDrawer = ({children}) => <>{children}</>;

export const createDrawerNavigator = jest.fn(() => ({
  Navigator: MockDrawer,
  Screen: MockDrawer,
}));
