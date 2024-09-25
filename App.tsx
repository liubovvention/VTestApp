/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, DetailsScreen} from './src/screens';
import {StackParamList} from 'types/navigation';
import {SafeAreaView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles(isDarkMode);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Weather" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
      paddingVertical: 150,
      borderWidth: 2
    },
  });

export default App;
