import {useCallback} from 'react';
import {Button, Linking, Pressable, Text, View} from 'react-native';
import styles from './ContactsScreenStyles';

export default function ContactsScreen() {
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
    <View style={styles.viewContainer}>
      <Text style={styles.title}>Contact Our Support Team</Text>
      <Pressable
        onPress={handleEmailPress}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}>
        <Text style={styles.label}>By Email</Text>
      </Pressable>
      <Pressable
        onPress={handlePhonePress}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}>
        <Text style={styles.label}>By Phone</Text>
      </Pressable>
      <Pressable
        onPress={handleSmsPress}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}>
        <Text style={styles.label}>Via SMS</Text>
      </Pressable>
    </View>
  );
}
