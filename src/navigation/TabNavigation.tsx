import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppNavigation from 'navigation/AppNavigation';
import SettingsNavigation from 'navigation/SettingsNavigation';
import {basicColors, blueColors, grayColors} from 'styles/themeColors';
import {StackParamList, ScreenNames} from 'types/navigation';
import {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from 'src/hooks/useStore';
import useBiometricAuth from 'hooks/useBiometricAuth';
import {
  selectBiometrics,
  selectisLoggedIn,
  selectUser,
} from 'src/store/slices/auth/authSlice';

type TabNavigationProps = {
  initialRoute: keyof StackParamList;
};

const Tab = createBottomTabNavigator();

const TabNavigation = ({initialRoute}: TabNavigationProps) => {
  const {authenticate} = useBiometricAuth();
  const user = useAppSelector(selectUser);
  const isBiometrics = useAppSelector(selectBiometrics);
  const isStoredLoggedIn = useAppSelector(selectisLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      console.log("DEBUG bio check login status params: ", user, isStoredLoggedIn, isBiometrics )
      if (user && isStoredLoggedIn && isBiometrics) {
        console.log("DEBUG bio case: remember & bio")
        const isAuth = await authenticate();
        console.log("DEBUG bio case: remember & bio, isAuth = ", isAuth)
        setIsLoggedIn(isAuth);
      }
      setIsLoading(false);
    };
    checkLoginStatus();
  }, [isBiometrics, isStoredLoggedIn, user, authenticate]);

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
