import {Image, Text, View} from 'react-native';
import {CityWeather} from 'types/weather';
import styles from './CityItemStyles';
import {kelvinToFahrenheit} from '../../../../utils/tempUtils';

interface CityItemProps {
  item: CityWeather;
}

const CityItem: React.FC<CityItemProps> = ({item}) => {
  const iconUrl = `http://openweathermap.org/img/wn/${item.icon}.png`;
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: iconUrl}} style={styles.icon} />
      <View style={styles.descrContainer}>
        <Text style={styles.cityTitle}>{item.city}</Text>
        <Text style={styles.weatherDescr}>{item.descr}</Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.temp}>{kelvinToFahrenheit(item.temp)}°F</Text>
      </View>
    </View>
  );
};

export default CityItem;
