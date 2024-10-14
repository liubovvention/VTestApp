import {Text} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {Screen} from 'layout';
import globalStyles from 'src/styles/globalStyles';

export default function OptionScreen() {
  const {styles: themedStyles} = useStyles(globalStyles);
  return (
    <Screen.Content style={themedStyles.container}>
      <Text style={themedStyles.title}>Add Option Form will be here</Text>
    </Screen.Content>
  );
}
