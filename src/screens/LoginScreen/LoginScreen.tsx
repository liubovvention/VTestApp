import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useActions} from 'hooks/useActions';
import {validateEmail} from 'utils/validateUtil';
import {StyledButton} from 'components';
import user from 'data/user.json';
import {ScreenNames, StackParamList} from 'types/navigation';
import {useAppSelector} from 'src/hooks/useStore';
import useBiometricAuth from 'hooks/useBiometricAuth';
import {selectBiometrics, selectUser} from 'src/store/slices/auth/authSlice';
import {useThemedStyles} from 'styles/commonStyles';
import styles from 'src/screens/LoginScreen/LoginScreenStyles';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {authenticate} = useBiometricAuth();
  const themedStyles = useThemedStyles();
  const {onLogin} = useActions();
  const storedUser = useAppSelector(selectUser);
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
        ? navigation.navigate(ScreenNames.Weather)
        : navigation.navigate(ScreenNames.Biometrics);
      Alert.alert('Logged in successfuly!');
    } else {
      Alert.alert('Invalid email or password');
    }
  }, [email, password, rememberMe, navigation]);

  const handleBioLogin = useCallback(async() => {
    if (!storedUser) return;
    const isAuth = await authenticate();
    if (isAuth) navigation.navigate(ScreenNames.Weather)
  }, [rememberMe, storedUser]);

  return (
    <View style={themedStyles.container}>
      <Text style={[themedStyles.primaryText, styles.label]}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={[themedStyles.primaryText, styles.label]}>Password:</Text>
      <TextInput
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
