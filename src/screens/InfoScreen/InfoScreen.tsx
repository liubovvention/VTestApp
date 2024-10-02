import DeviceInfo from 'react-native-device-info';
import {Text, View} from 'react-native';
import {useThemedStyles} from 'styles/commonStyles';
import styles from 'src/screens/InfoScreen/InfoScreenStyles';

export default function InfoScreen() {
  const themedStyles = useThemedStyles();
  const version = DeviceInfo.getVersion();
  const build = DeviceInfo.getBuildNumber();

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>App Information</Text>
      <Text style={styles.info}>Version: {version}</Text>
      <Text style={styles.info}>Build: {build}</Text>
    </View>
  );
}
