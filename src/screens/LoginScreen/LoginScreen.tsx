import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateEmail} from 'utils/validateUtil';
import {StyledButton} from 'components';
import {useThemedStyles} from 'styles/commonStyles';
import user from 'data/user.json';
import styles from 'src/screens/LoginScreen/LoginScreenStyles';

export default function LoginScreen() {
  const themedStyles = useThemedStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('rememberMe');
      if (loggedIn) {
        setRememberMe(true);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = useCallback(async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (email === user.email && password === user.password) {
      if (rememberMe) {
        await AsyncStorage.setItem('rememberMe', 'true');
      }
      setRememberMe(true);
      Alert.alert('Login successful!');
      //&move to home screen
    } else {
      Alert.alert('Invalid email or password');
    }
  }, [setRememberMe]);

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
        <Text style={[themedStyles.primaryText, styles.label, {paddingHorizontal: 5}]}>Remember me</Text>
      </View>
      <StyledButton label="Login" onPress={handleLogin} styles={styles.button} />
    </View>
  );
}
