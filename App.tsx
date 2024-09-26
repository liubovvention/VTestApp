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
import AppNavigation from 'navigation/AppNavigation';
import {StackParamList} from 'types/navigation';
import { lightColors, darkColors } from 'styles/themeColors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);

  const getInitialRoute = (): keyof StackParamList => {
    // if (isLoggedIn) return 'Weather';
    // if (isFirstTime) return 'Login';

    return 'Weather';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? darkColors.background : lightColors.background}
      />

        <AppNavigation initialRoute={getInitialRoute()} />

    </SafeAreaView>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: isDarkMode ? darkColors.background : lightColors.background,
      flex: 1,
    },
  });

export default App;
