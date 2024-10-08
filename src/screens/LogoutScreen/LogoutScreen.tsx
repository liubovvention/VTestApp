import {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import {useAuth} from 'context/AuthContext';
import {useActions} from 'hooks/useActions';
import {useStyles} from 'react-native-unistyles';
import globalStyles from 'styles/globalStyles';

export default function LogoutScreen() {
  const {setInitialAuth} = useAuth();
  const {styles: themedStyles} = useStyles(globalStyles);
  const {onLogout} = useActions();

  useEffect(() => {
    const handleLogout = async () => {
      onLogout();
      Alert.alert('Logged out successfully');
      setInitialAuth(false);
    };

    handleLogout();
  }, []);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>You're successfully logged out...</Text>
    </View>
  );
}
