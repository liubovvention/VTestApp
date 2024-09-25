import {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import WeatherService from '../../services/weatherServices';
import {CityItem} from '../../components';
import {CityWeather} from 'types/weather';
import styles from './HomeScreenStyles';

//TODO: move to data
export const CitiesList = [
  'Alicante',
  'Berlin',
  'Copenhagen',
  'Dresden',
  'Edinburgh',
  'Florence',
  'Geneva',
  'Helsinki',
  'Istanbul',
  'Jena',
  'Kyiv',
  'Lisbon',
  'Madrid',
  'Nicosia',
  'Oslo',
  'Paris',
  'Rome',
  'Sofia',
  'Tallinn',
  'Utrecht',
  'Vilnius',
  'Warsaw',
  'Zagreb',
];

export default function HomeScreen() {
  const [data, setData] = useState<CityWeather[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchWeatherDataList = async () => {
    try {
      const result = await WeatherService.getCitiesWeather(CitiesList);
      console.log('DEBUG home res list', result);
      if (result) setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherDataList();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={[
          styles.viewContainer,
          {
            backgroundColor: backgroundStyle.backgroundColor,
          },
        ]}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
        {data && (
          <FlatList
            data={data}
            renderItem={({ item }) => <CityItem item={item} isPressable={true} />}
            keyExtractor={item => item.city} 
          />
        )}
      </View>
    </SafeAreaView>
  );
}
