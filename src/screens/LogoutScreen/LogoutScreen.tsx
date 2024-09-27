import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import {useThemedStyles} from 'styles/commonStyles';

export default function LogoutScreen() {
  const themedStyles = useThemedStyles();

  useEffect(() => {
    const handleLogout = async () => {
      await AsyncStorage.removeItem('rememberMe');
      Alert.alert('Logged out successfully');
    };

    handleLogout();
  }, []);
  
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>You're successfully logged out...</Text>
    </View>
  );
}
