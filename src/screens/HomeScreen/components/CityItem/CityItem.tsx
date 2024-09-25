import {Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {kelvinToFahrenheit} from '../../../../utils/tempUtils';
import {StackParamList} from 'types/navigation';
import {CityWeather} from 'types/weather';
import styles from './CityItemStyles';

interface CityItemProps {
  item: CityWeather;
}

const CityItem: React.FC<CityItemProps> = ({item}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const iconUrl = `https://openweathermap.org/img/wn/${item.icon}.png`;
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: iconUrl}} style={styles.weatherIcon} />
      <View style={styles.descrContainer}>
        <Text style={styles.cityTitle}>{item.city}</Text>
        <Text style={styles.weatherDescr}>{item.descr}</Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.temp}>{kelvinToFahrenheit(item.temp)}°F</Text>
      </View>
      <View style={styles.actionContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Details')}>
          <Icon name="chevron-right" size={20} style={styles.chevronIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default CityItem;
