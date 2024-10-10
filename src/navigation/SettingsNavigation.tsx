import {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  SettingsScreen,
  InfoScreen,
  LogoutScreen,
  ContactsScreen,
} from 'screens';
import {ScreenNames} from 'types/navigation';
import {Screen} from 'layout';

const Drawer = createDrawerNavigator();

const SettingsNavigation = () => {
  return (
    <Screen topInset={0} bottomInset={0}>
      <Drawer.Navigator initialRouteName={ScreenNames.Settings}>
        <Drawer.Screen
          name={ScreenNames.GeneralSettings}
          component={SettingsScreen}
        />
        <Drawer.Screen name={ScreenNames.Info} component={InfoScreen} />
        <Drawer.Screen name={ScreenNames.Contacts} component={ContactsScreen} />
        <Drawer.Screen name={ScreenNames.Logout} component={LogoutScreen} />
      </Drawer.Navigator>
    </Screen>
  );
};

export default SettingsNavigation;
