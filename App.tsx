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
import {PersistGate} from 'redux-persist/integration/react';
import { useStyles } from 'react-native-unistyles';
import store, {persistor} from 'store/store';
import {AuthProvider} from 'context/AuthContext';
import TabNavigation from 'navigation/TabNavigation';
import {Screen} from 'src/layout';
import {lightColors, darkColors} from 'styles/themeColors';
import 'styles/unistyles';
import globalStyles from 'src/styles/globalStyles';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const {styles} = useStyles(globalStyles);

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
          <Screen>
            <AuthProvider>
              <NavigationContainer>
                <TabNavigation initialRoute={'Home'} />
              </NavigationContainer>
            </AuthProvider>
          </Screen>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
