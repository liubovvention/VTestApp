import {useCallback} from 'react';
import {Alert} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const useBiometricAuth = () => {
  const authenticate = useCallback(async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
      });

      if (success) {
        Alert.alert('Success', 'Biometric authentication successful');
        return true;
      } else {
        Alert.alert(
          'Authentication failed',
          'Biometric authentication failed ' + error,
        );
        return false;
      }
    } catch (error) {
      console.error('[DEBUG useBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  }, []);

  return {authenticate};
};

export default useBiometricAuth;
