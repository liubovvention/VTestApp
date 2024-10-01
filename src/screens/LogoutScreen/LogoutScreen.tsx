import {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import { useActions } from 'hooks/useActions';
import {useThemedStyles} from 'styles/commonStyles';

export default function LogoutScreen() {
  const themedStyles = useThemedStyles();
  const {onLogout} = useActions();

  useEffect(() => {
    const handleLogout = async () => {
      onLogout();
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
