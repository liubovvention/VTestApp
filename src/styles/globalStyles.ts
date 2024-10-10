import {createStyleSheet} from 'react-native-unistyles';
import {blueColors} from 'styles/themeColors';

const globalStyles = createStyleSheet(theme => ({
  screen:{
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.text,
  },
  primaryText: {
    color: theme.colors.primary,
  },
  secondaryText: {
    color: theme.colors.secondary,
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
    color: theme.colors.buttonText,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
  },
}));

export default globalStyles;
