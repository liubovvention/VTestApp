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
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from 'store/store';
import TabNavigation from 'navigation/TabNavigation';
import {ScreenNames} from 'types/navigation';
import {lightColors, darkColors} from 'styles/themeColors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={
          isDarkMode ? darkColors.background : lightColors.background
        }
      />
      <Provider store={store}>
        <NavigationContainer>
          <TabNavigation initialRoute={ScreenNames.Weather} />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
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
