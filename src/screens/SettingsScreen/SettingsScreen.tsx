import {Text, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {useAppSelector} from 'hooks/useStore';
import {selectUser} from 'store/slices/auth/authSlice';
import globalStyles from 'styles/globalStyles';
import styles from 'src/screens/SettingsScreen/SettingsScreenStyles';

export default function SettingsScreen() {
  const {styles: themedStyles} = useStyles(globalStyles);
  const user = useAppSelector(selectUser);
  return (
    <View style={themedStyles.container}>
      {user ? (
        <Text style={[styles.info, themedStyles.text]}>Hey, {user.email}, you're successfuly logged in</Text>
      ) : (
        <Text style={[styles.info, themedStyles.text]}>
          Hey, you're not logged in, but it's ok
        </Text>
      )}
      <Text style={[styles.info, themedStyles.text]}>
        Use the menu to explore your options
      </Text>
    </View>
  );
}
