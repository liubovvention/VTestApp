import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import {Text, View} from 'react-native';
import styles from './InfoScreenStyles';
import { useThemedStyles } from 'styles/commonStyles';


export default function InfoScreen() {
  const themedStyles = useThemedStyles();
  const [appInfo, setAppInfo] = useState({ version: '', build: '' });

  useEffect(() => {
    const fetchAppInfo = () => {
      const version = DeviceInfo.getVersion();
      const build = DeviceInfo.getBuildNumber();
      setAppInfo({ version, build });
    };

    fetchAppInfo();
  }, []);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>App Information</Text>
      <Text style={styles.info}>Version: {appInfo.version}</Text>
      <Text style={styles.info}>Build: {appInfo.build}</Text>
    </View>
  );
}
