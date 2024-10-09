import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Alert, AppState, AppStateStatus} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useAuth} from 'context/AuthContext';
import {useAppSelector} from 'hooks/useStore';
import useBiometricAuth from 'hooks/useBiometricAuth';
import {ScreenNames, StackParamList} from 'types/navigation';
import {selectBiometrics, selectUser} from 'store/slices/auth/authSlice';
import {BiometricScreen, DetailsScreen, HomeScreen, LoginScreen} from 'screens';

const Stack = createNativeStackNavigator<StackParamList>();

const AppNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {authenticate} = useBiometricAuth();
  const {initialAuth, user} = useAuth();
  const appState = useRef(AppState.currentState);
  const isBiometrics = useAppSelector(selectBiometrics);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthRequired, setIsAuthRequired] = useState(false);

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (isAuthRequired) {
          const isAuth = true;
          //const isAuth = await authenticate();
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
    setIsLoggedIn(false);
    if (user && initialAuth && isBiometrics) {
      // const isAuth = await authenticate();
      // setIsLoggedIn(isAuth);
      setIsLoggedIn(true);
      setIsAuthRequired(true);
    }
    setIsLoading(false);
  }, [user, isBiometrics, initialAuth, authenticate]);

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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name={ScreenNames.Home}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenNames.Details}
            component={DetailsScreen}
            options={{
              //headerShown: false,
              headerBackVisible: true,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
          <Stack.Screen
            name={ScreenNames.Biometrics}
            component={BiometricScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
