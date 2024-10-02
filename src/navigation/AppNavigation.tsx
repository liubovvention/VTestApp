import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  AppState,
  AppStateStatus,
} from 'react-native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from 'hooks/useStore';
import useBiometricAuth from 'hooks/useBiometricAuth';
import TabNavigation from 'navigation/TabNavigation';
import LoginNavigation from 'navigation/LoginNavigation';
import {ScreenNames, StackParamList} from 'types/navigation';
import {
  selectBiometrics,
  selectisLoggedIn,
  selectUser,
} from 'store/slices/auth/authSlice';

const Stack = createNativeStackNavigator<StackParamList>();

const AppNavigation = () => {
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
              routes: [{name: ScreenNames.Login}],
            });
          }
        }
      }
      appState.current = nextAppState;
    },
    [isAuthRequired, authenticate],
  );

  const checkLoginStatus = useCallback(async () => {
    setIsLoading(true);
    if (user && isStoredLoggedIn && isBiometrics) {
      const isAuth = await authenticate();
      setIsLoggedIn(isAuth);
      setIsAuthRequired(true);
    }
    setIsLoading(false);
  }, [user, isBiometrics, isStoredLoggedIn, authenticate]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const getInitialRoute = useCallback((): keyof StackParamList => {
    return isLoggedIn ? ScreenNames.Weather : ScreenNames.LoginFlow;
  }, [isLoggedIn]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
      <Stack.Navigator initialRouteName={getInitialRoute()}>
        <Stack.Screen
          name={ScreenNames.LoginFlow}
          children={() => <LoginNavigation initialRoute={ScreenNames.Login} />}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.Weather}
          children={() => <TabNavigation initialRoute={ScreenNames.Weather} />}
          options={{headerShown: false, headerLeft:() => null,}}
        />
      </Stack.Navigator>
  );
};

export default AppNavigation;
