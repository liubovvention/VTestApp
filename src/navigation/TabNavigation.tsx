import {useCallback, useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator, Alert, AppState, AppStateStatus} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppNavigation from 'navigation/AppNavigation';
import SettingsNavigation from 'navigation/SettingsNavigation';
import {StackParamList, ScreenNames} from 'types/navigation';
import {useAppSelector} from 'hooks/useStore';
import useBiometricAuth from 'hooks/useBiometricAuth';
import {
  selectBiometrics,
  selectisLoggedIn,
  selectUser,
} from 'src/store/slices/auth/authSlice';
import {basicColors, blueColors, grayColors} from 'styles/themeColors';

type TabNavigationProps = {
  initialRoute: keyof StackParamList;
};

const Tab = createBottomTabNavigator();

const TabNavigation = ({initialRoute}: TabNavigationProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {authenticate} = useBiometricAuth();
  const user = useAppSelector(selectUser);
  const appState = useRef(AppState.currentState);
  const [isAuthRequired, setIsAuthRequired] = useState(false);
  const isBiometrics = useAppSelector(selectBiometrics);
  const isStoredLoggedIn = useAppSelector(selectisLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (isAuthRequired) {
          const isAuth = await authenticate();
          setIsLoggedIn(isAuth);
          if (!isAuth) {
            Alert.alert('Error', 'You need to authenticate to access the app');
            navigation.reset({
              index: 0,
              routes: [{ name: ScreenNames.Login }],
            });
          }
        }
      }
      appState.current = nextAppState;
    },
    [isAuthRequired, authenticate],
  );

  const checkLoginStatus = useCallback(async () => {
    if (user && isStoredLoggedIn && isBiometrics) {
      const isAuth = await authenticate();
      setIsLoggedIn(isAuth);
      setIsAuthRequired(true);
    }
    setIsLoading(false);
  }, [user, isBiometrics, isStoredLoggedIn, authenticate]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove(); 
    };
  }, [handleAppStateChange]);

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
