import {Pressable, StyleProp, Text, ViewStyle} from 'react-native';
import {useThemedStyles} from 'src/styles/commonStyles';

export type StyledButtonProps = {
  label?: string;
  icon?: string;
  styles?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  onPress: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = (
  props: StyledButtonProps,
) => {
  const themedStyles = useThemedStyles();
  const {label, icon, onPress, styles} = props;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        ...(Array.isArray(styles) ? styles : styles ? [styles] : []),
        themedStyles.button,
        pressed ? themedStyles.buttonPressed : null,
      ]}>
      {label && <Text style={themedStyles.buttonLabel}>{label}</Text>}
    </Pressable>
  );
};

export default StyledButton;
