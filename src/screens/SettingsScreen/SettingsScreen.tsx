import {Text, View} from 'react-native';
import { useThemedStyles } from 'styles/commonStyles';
import styles from 'src/screens/SettingsScreen/SettingsScreenStyles';

export default function SettingsScreen() {
  const themedStyles = useThemedStyles();
  return (
    <View style={themedStyles.container}>
      <Text style={[styles.info, themedStyles.text]}>Use the menu to explore your options</Text>
    </View>
  );
}
