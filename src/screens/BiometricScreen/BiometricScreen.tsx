import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert, StyleSheet, Text, View} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useActions} from 'hooks/useActions';
import {StyledButton} from 'components';
import {useThemedStyles, width} from 'styles/commonStyles';
import {ScreenNames, StackParamList} from 'types/navigation';

export default function BiometricScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {onSetBiometrics} = useActions();
  const themedStyles = useThemedStyles();

  const showAlert = useCallback(
    (title: string, message: string, biometryType: string) => {
      Alert.alert(title, message, [
        {
          text: 'Yes please',
          onPress: async () => {
            try {
              // Create & save publicKey for the real app
              onSetBiometrics();
              navigation.navigate(ScreenNames.Home);
              Alert.alert(
                'Success!',
                `${biometryType} authentication enabled successfully!`,
              );
            } catch (error) {
              console.error('Keychain error:', error);
              Alert.alert(
                'Error',
                'An error occurred while enabling biometrics.',
              );
            }
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ]);
    },
    [onSetBiometrics],
  );

  const enableBiometricAuth = useCallback(async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      const resultObject = await rnBiometrics.isSensorAvailable();
      const {available, biometryType} = resultObject;

      if (available) {
        if (biometryType === BiometryTypes.TouchID) {
          showAlert(
            'TouchID',
            'Would you like to enable TouchID authentication for the next time?',
            biometryType,
          );
        } else if (biometryType === BiometryTypes.FaceID) {
          showAlert(
            'FaceID',
            'Would you like to enable FaceID authentication for the next time?',
            biometryType,
          );
        } else if (biometryType === BiometryTypes.Biometrics) {
            showAlert(
            'Biometrics',
            'Would you like to enable it for the next time?',
            biometryType,
          );
        }
      } else {
        Alert.alert(
          'Biometrics not supported',
          'This device does not support biometric authentication.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'An error occurred while checking biometrics availability.',
      );
    }
  }, [showAlert]);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Setup Biometrics</Text>
      <StyledButton
        onPress={enableBiometricAuth}
        label="Setup Biometric Auth"
        styles={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width / 2,
    marginVertical: 10,
  },
});
