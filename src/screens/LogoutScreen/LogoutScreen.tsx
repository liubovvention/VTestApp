import {Text, View} from 'react-native';
import { useThemedStyles } from 'styles/commonStyles';

export default function LogoutScreen() {
  const themedStyles = useThemedStyles();
  //logout logic will be here
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Logout Screen</Text>
    </View>
  );
}
