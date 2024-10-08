import {useCallback} from 'react';
import {Linking, Text, View} from 'react-native';
import {StyledButton} from 'components';
import {useStyles} from 'react-native-unistyles';
import globalStyles from 'styles/globalStyles';
import styles from 'src/screens/ContactsScreen/ContactsScreenStyles';

export default function ContactsScreen() {
  const {styles: themedStyles} = useStyles(globalStyles);

  const handleButtonPress = useCallback((chanel: string) => {
    let action;
    switch (chanel) {
      case 'email':
        const email = 'support@example.com';
        action = `mailto:${email}`;
        break;
      case 'phone':
        action = 'tel:+1234567890';
        break;
      case 'sms':
        action = 'sms:+1234567890';
        break;
      default:
        break;
    }
    if (action) Linking.openURL(action);
  }, []);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Contact Our Support Team</Text>
      <StyledButton
        onPress={() => handleButtonPress('email')}
        label="By Email"
        styles={styles.button}
      />
      <StyledButton
        onPress={() => handleButtonPress('phone')}
        label="By Phone"
        styles={styles.button}
      />
      <StyledButton
        onPress={() => handleButtonPress('sms')}
        label="Via SMS"
        styles={styles.button}
      />
    </View>
  );
}
