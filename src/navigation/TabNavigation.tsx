import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigation from 'navigation/AppNavigation';
import SettingsNavigation from 'navigation/SettingsNavigation';
import {basicColors, blueColors, grayColors} from 'styles/themeColors';
import {StackParamList, ScreenNames} from 'types/navigation';
import {useCallback, useEffect, useState} from 'react';
import { useAppSelector } from 'src/hooks/useStore';
import { selectisLoggedIn, selectUser } from 'src/store/slices/auth/authSlice';

type TabNavigationProps = {
  initialRoute: keyof StackParamList;
};

const Tab = createBottomTabNavigator();

const TabNavigation = ({initialRoute}: TabNavigationProps) => {
  const user = useAppSelector(selectUser);
  const isStoredLoggedIn = useAppSelector(selectisLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isStoredLoggedIn && user) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    checkLoginStatus();
  }, [isStoredLoggedIn, user]);

  const getInitialRoute = useCallback((): keyof StackParamList => {
    return isLoggedIn ? ScreenNames.Weather : ScreenNames.Login;
  }, [isLoggedIn]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName = 'ios-information-circle';
          if (route.name === ScreenNames.Weather) {
            iconName = 'cloud';
          } else if (route.name === ScreenNames.Settings) {
            iconName = 'gear';
          }
          return <Icon name={iconName} size={20} color={basicColors.white} />;
        },
        tabBarActiveBackgroundColor: blueColors.blue100,
        tabBarInactiveBackgroundColor: grayColors.gray100,
        tabBarActiveTintColor: basicColors.white,
        tabBarInactiveTintColor: basicColors.white,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        headerShown: true,
      })}>
      <Tab.Screen
        name={ScreenNames.Weather}
        children={() => <AppNavigation initialRoute={getInitialRoute()} />}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={ScreenNames.Settings}
        component={SettingsNavigation}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
