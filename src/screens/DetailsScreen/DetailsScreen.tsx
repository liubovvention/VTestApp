import { RouteProp } from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { StackParamList } from 'types/navigation';

type DetailsProps = {
  route: RouteProp<StackParamList, 'Details'>;
};

const DetailsScreen: React.FC<DetailsProps> = ({ route }) => {
  const { city, descr, icon, temp } = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Text>New screen: {city}</Text>
      </View>
    </SafeAreaView>
  );
}

export default DetailsScreen;
