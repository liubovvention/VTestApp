import {Pressable, StyleProp, Text, ViewStyle} from 'react-native';
import {useThemedStyles} from 'styles/commonStyles';

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
    <Pressable
      testID={testID ? testID : "styled-button"}
      onPress={onPress}
      style={({pressed}) => [
        themedStyles.button,
        pressed ? themedStyles.buttonPressed : null,
        ...(Array.isArray(styles) ? styles : styles ? [styles] : []),
      ]}>
      {label && <Text style={themedStyles.buttonLabel}>{label}</Text>}
    </Pressable>
  );
};

export default StyledButton;
