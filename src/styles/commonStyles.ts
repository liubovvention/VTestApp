import {Dimensions, StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native';
import {lightColors, darkColors, blueColors} from 'styles/themeColors';

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
    gradientWrapper: {
      borderRadius: 10,
      height: 45,
    },
    button: {
      flex: 1,
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
