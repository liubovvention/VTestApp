import {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActions } from 'hooks/useActions';
import {useThemedStyles} from 'styles/commonStyles';
import { ScreenNames, StackParamList } from 'types/navigation';

export default function LogoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const themedStyles = useThemedStyles();
  const {onLogout} = useActions();

  useEffect(() => {
    const handleLogout = async () => {
      onLogout();
      Alert.alert('Logged out successfully');
      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.Login}],
      });
    };

    handleLogout();
  }, []);
  
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>You're successfully logged out...</Text>
    </View>
  );
}
