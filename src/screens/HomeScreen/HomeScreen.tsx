import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import WeatherService from 'src/services/weatherServices';
import {CityItem} from 'src/components';
import {CityWeather} from 'types/weather';
import citiesList from './data/citiesList.json';
import styles from './HomeScreenStyles';

export default function HomeScreen() {
  const [data, setData] = useState<CityWeather[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeatherDataList = useCallback(async () => {
    try {
      const result = await WeatherService.getCitiesWeather(citiesList);
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
  }, []);

  useEffect(() => {
    fetchWeatherDataList();
  }, [fetchWeatherDataList]);

  return (
    <View style={styles.viewContainer}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {data && (
        <FlatList
          data={data}
          renderItem={({item}) => <CityItem item={item} />}
          keyExtractor={item => item.city}
        />
      )}
    </View>
  );
}
