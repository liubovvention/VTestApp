import React, {useCallback, useState} from 'react';
import {View, Text, TextInput, Alert, Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useActions} from 'hooks/useActions';
import {validateEmail} from 'utils/validateUtil';
import {StyledButton} from 'components';
import user from 'data/user.json';
import {useAuth} from 'context/AuthContext';
import {useAppSelector} from 'hooks/useStore';
import {selectBiometrics} from 'store/slices/auth/authSlice';
import {ScreenNames, StackParamList} from 'types/navigation';
import {useStyles} from 'react-native-unistyles';
import globalStyles from 'styles/globalStyles';
import styles from 'src/screens/LoginScreen/LoginScreenStyles';

export type LoginProps = NativeStackScreenProps<StackParamList, 'Log In'>;

export default function LoginScreen() {
  const {setInitialAuth, user: storedUser} = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {styles: themedStyles} = useStyles(globalStyles);
  const {onLogin} = useActions();
  const isBiometrics = useAppSelector(selectBiometrics);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = useCallback(async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (email === user.email && password === user.password) {
      const payload = {isLoggedIn: rememberMe, user: {email: email}};
      onLogin(payload);
      isBiometrics
        ? setInitialAuth(true)
        : navigation.navigate(ScreenNames.Biometrics);
      Alert.alert('Logged in successfuly!');
    } else {
      Alert.alert('Invalid email or password');
    }
  }, [email, password, rememberMe, navigation]);

  const handleBioLogin = useCallback(async () => {
    if (!storedUser) return;
    const payload = {isLoggedIn: rememberMe, user: {email: storedUser.email}};
    onLogin(payload);
    setInitialAuth(true);
  }, [rememberMe, email, storedUser]);

  return (
    <View style={themedStyles.container}>
      <Text style={[themedStyles.primaryText, styles.label]}>Email:</Text>
      <TextInput
        testID="email-input"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={[themedStyles.primaryText, styles.label]}>Password:</Text>
      <TextInput
        testID="password-input"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
        <Text
          style={[
            themedStyles.primaryText,
            styles.label,
            {paddingHorizontal: 5},
          ]}>
          Remember me
        </Text>
      </View>
      <StyledButton
        testID="login-button"
        label="Login"
        onPress={handleLogin}
        styles={styles.button}
      />
      {storedUser && isBiometrics && (
        <StyledButton
          label="Use Biometrcs"
          onPress={handleBioLogin}
          styles={styles.button}
        />
      )}
    </View>
  );
}
