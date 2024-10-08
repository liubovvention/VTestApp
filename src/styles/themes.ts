import * as colors from 'styles/themeColors';

export const lightTheme = {
  colors: {
    background: colors.basicColors.white,
    text: colors.basicColors.black,
    primary: colors.grayColors.gray75,
    secondary: colors.grayColors.gray50,
    border: colors.grayColors.gray25,
    buttonBackground: colors.blueColors.blue75,
    buttonText: colors.basicColors.white,
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;

export const darkTheme = {
  colors: {
    background: colors.basicColors.black,
    text: colors.basicColors.white,
    primary: colors.grayColors.gray0,
    secondary: colors.grayColors.gray25,
    border: colors.grayColors.gray25,
    buttonBackground: colors.blueColors.blue75,
    buttonText: colors.basicColors.white,
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;
