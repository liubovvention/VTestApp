import {useCallback} from 'react';
import {Linking, Text, View} from 'react-native';
import { StyledButton } from 'components';
import { useThemedStyles } from 'styles/commonStyles';
import styles from './ContactsScreenStyles';

export default function ContactsScreen() {
  const themedStyles = useThemedStyles();
  
  const handleEmailPress = useCallback(() => {
    const email = 'support@example.com';
    Linking.openURL(`mailto:${email}`);
  }, []);

  const handlePhonePress = useCallback(() => {
    const phoneNumber = 'tel:+1234567890';
    Linking.openURL(phoneNumber);
  }, []);

  const handleSmsPress = useCallback(() => {
    const phoneNumber = 'sms:+1234567890';
    Linking.openURL(phoneNumber);
  }, []);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Contact Our Support Team</Text>
      <StyledButton onPress={handleEmailPress} label='By Email' styles={styles.button} />
      <StyledButton onPress={handlePhonePress} label='By Phone' styles={styles.button} />
      <StyledButton onPress={handleSmsPress} label='Via SMS' styles={styles.button} />
    </View>
  );
}
