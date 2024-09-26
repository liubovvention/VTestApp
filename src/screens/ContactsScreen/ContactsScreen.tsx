import {useCallback} from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
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
      <Pressable
        onPress={handleEmailPress}
        style={({pressed}) => [
          styles.button,
          themedStyles.button,
          pressed ? themedStyles.buttonPressed : null,
        ]}>
        <Text style={themedStyles.buttonLabel}>By Email</Text>
      </Pressable>
      <Pressable
        onPress={handlePhonePress}
        style={({pressed}) => [
          styles.button,
          themedStyles.button,
          pressed ? themedStyles.buttonPressed : null,
        ]}>
        <Text style={themedStyles.buttonLabel}>By Phone</Text>
      </Pressable>
      <Pressable
        onPress={handleSmsPress}
        style={({pressed}) => [
          styles.button,
          themedStyles.button,
          pressed ? themedStyles.buttonPressed : null,
        ]}>
        <Text style={themedStyles.buttonLabel}>Via SMS</Text>
      </Pressable>
    </View>
  );
}
