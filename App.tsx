/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'store/store';
import AppNavigation from 'navigation/AppNavigation';
import {lightColors, darkColors} from 'styles/themeColors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={
              isDarkMode ? darkColors.background : lightColors.background
            }
          />
          <NavigationContainer>
          <AppNavigation />
          </NavigationContainer>
          
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: isDarkMode
        ? darkColors.background
        : lightColors.background,
      flex: 1,
    },
  });

export default App;
