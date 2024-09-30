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
import {useThemedStyles} from 'styles/commonStyles';
import styles from 'src/screens/LoginScreen/LoginScreenStyles';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const themedStyles = useThemedStyles();
  const {onLogin} = useActions();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('rememberMe');
      if (loggedIn) {
        setRememberMe(true);
        navigation.navigate(ScreenNames.Home);
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
        setRememberMe(true);
      }
      const payload = {keepAuth: rememberMe, user: {email: email}};
      onLogin(payload);
      navigation.navigate(ScreenNames.Home);
      Alert.alert('Logged in successfuly!');
    } else {
      Alert.alert('Invalid email or password');
    }
  }, [email, password, rememberMe, navigation]);

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
    </View>
  );
}
