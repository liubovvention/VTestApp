/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'store/store';
import {AuthProvider} from 'context/AuthContext';
import TabNavigation from 'navigation/TabNavigation';
import {lightColors, darkColors} from 'styles/themeColors';
import 'styles/unistyles';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={
              isDarkMode ? darkColors.background : lightColors.background
            }
          />

          <AuthProvider>
            <NavigationContainer>
              <TabNavigation initialRoute={'Home'} />
            </NavigationContainer>
          </AuthProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
