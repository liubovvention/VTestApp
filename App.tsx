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
import TabNavigation from 'navigation/TabNavigation';
import {ScreenNames} from 'types/navigation';
import {lightColors, darkColors} from 'styles/themeColors';
import {NavigationContainer} from '@react-navigation/native';

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
      <NavigationContainer>
        <TabNavigation initialRoute={ScreenNames.Weather} />
      </NavigationContainer>
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
