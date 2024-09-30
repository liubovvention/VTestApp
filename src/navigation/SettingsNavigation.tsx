import {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  SettingsScreen,
  InfoScreen,
  LogoutScreen,
  ContactsScreen,
  LoginScreen,
} from 'screens';
import {useAppSelector} from 'hooks/useStore';
import {selectisLoggedIn, selectUser} from 'store/slices/auth/authSlice';
import {ScreenNames} from 'types/navigation';

const Drawer = createDrawerNavigator();

const SettingsNavigation = () => {
  const user = useAppSelector(selectUser);
  const isStoredLoggedIn = useAppSelector(selectisLoggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isStoredLoggedIn && user) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [isStoredLoggedIn, user]);
  return (
    <Drawer.Navigator initialRouteName={ScreenNames.Settings}>
      <Drawer.Screen
        name={ScreenNames.GeneralSettings}
        component={SettingsScreen}
      />
      <Drawer.Screen name={ScreenNames.Info} component={InfoScreen} />
      <Drawer.Screen name={ScreenNames.Contacts} component={ContactsScreen} />
      {isLoggedIn ? (
        <Drawer.Screen name={ScreenNames.Logout} component={LogoutScreen} />
      ) : (
        <Drawer.Screen name={ScreenNames.Login} component={LoginScreen} />
      )}
    </Drawer.Navigator>
  );
};

export default SettingsNavigation;
