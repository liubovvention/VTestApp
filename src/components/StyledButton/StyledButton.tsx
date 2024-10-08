import {Pressable, StyleProp, Text, ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useThemedStyles} from 'styles/commonStyles';
import {blueColors} from 'styles/themeColors';

export type StyledButtonProps<T extends any[] = any[]> = {
  testID?: string;
  label?: string;
  icon?: string;
  styles?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  onPress: (...args: T) => void;
};

const StyledButton: React.FC<StyledButtonProps> = (
  props: StyledButtonProps,
) => {
  const themedStyles = useThemedStyles();
  const {label, icon, onPress, styles, testID} = props;
  return (
    <LinearGradient
      colors={[blueColors.blue25, blueColors.blue100]}
      style={[
        themedStyles.gradientWrapper,
        ...(Array.isArray(styles) ? styles : styles ? [styles] : []),
      ]}>
      <Pressable
        testID={testID ? testID : 'styled-button'}
        onPress={onPress}
        style={({pressed}) => [
          themedStyles.button,
          pressed ? themedStyles.buttonPressed : null,
        ]}>
        {label && <Text style={themedStyles.buttonLabel}>{label}</Text>}
      </Pressable>
    </LinearGradient>
  );
};

export default StyledButton;
