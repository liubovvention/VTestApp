import {Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CityWeather} from 'types/weather';
import styles from './CityItemStyles';
import {kelvinToFahrenheit} from '../../../../utils/tempUtils';

interface CityItemProps {
  item: CityWeather;
}

const CityItem: React.FC<CityItemProps> = ({item}) => {
  const iconUrl = `https://openweathermap.org/img/wn/${item.icon}.png`;
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: iconUrl}} style={styles.weatherIcon} onError={() => console.log("WIcon error")} />
      <View style={styles.descrContainer}>
        <Text style={styles.cityTitle}>{item.city}</Text>
        <Text style={styles.weatherDescr}>{item.descr}</Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.temp}>{kelvinToFahrenheit(item.temp)}°F</Text>
      </View>
      <View style={styles.actionContainer}>
        <Pressable style={styles.button} onPress={() => console.log('Pressed')}>
          <Icon name="chevron-right" size={20} style={styles.chevronIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default CityItem;
