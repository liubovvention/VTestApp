import {Dimensions, StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native';
import {lightColors, darkColors, blueColors} from './themeColors';

export const {width, height} = Dimensions.get('screen');

export const useThemedStyles = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height - 150,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.text,
    },
    primaryText: {
      color: colors.primary,
    },
    secondaryText: {
      color: colors.secondary,
    },
    button: {
      backgroundColor: colors.buttonBackground,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonPressed: {
      backgroundColor: blueColors.blue25,
    },
    buttonActive: {
      backgroundColor: blueColors.blue100,
    },
    buttonLabel: {
      color: colors.buttonText,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
    },
  });
};
