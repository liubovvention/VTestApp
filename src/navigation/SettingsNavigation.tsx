import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  SettingsScreen,
  InfoScreen,
  LogoutScreen,
  ContactsScreen,
} from 'screens';

const Drawer = createDrawerNavigator();

const SettingsNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Settings">
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="App Info" component={InfoScreen} />
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
      <Drawer.Screen name="Log Out" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default SettingsNavigation;
