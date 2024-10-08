import {Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {kelvinToFahrenheit} from 'utils/tempUtils';
import {ScreenNames, StackParamList} from 'types/navigation';
import {CityWeather} from 'types/weather';
import {useStyles} from 'react-native-unistyles';
import globalStyles from 'styles/globalStyles';
import styles from 'src/components/CityItem/CityItemStyles';

interface CityItemProps {
  item: CityWeather;
  isPressable?: boolean;
}

const CityItem: React.FC<CityItemProps> = ({item, isPressable = true}) => {
  const {styles: themedStyles} = useStyles(globalStyles);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const iconUrl = `https://openweathermap.org/img/wn/${item.icon}.png`;
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: iconUrl}} style={styles.weatherIcon} />
      <View style={styles.descrContainer}>
        <Text style={[styles.cityTitle, themedStyles.primaryText]}>
          {item.city}
        </Text>
        <Text style={[styles.weatherDescr, themedStyles.secondaryText]}>
          {item.descr}
        </Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.temp}>{kelvinToFahrenheit(item.temp)}°F</Text>
      </View>
      {isPressable && (
        <View style={styles.actionContainer}>
          <Pressable
            testID="chevron-right-button"
            style={styles.button}
            onPress={() => navigation.navigate(ScreenNames.Details, item)}>
            <Icon name="chevron-right" size={20} style={styles.chevronIcon} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CityItem;
