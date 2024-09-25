import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import { useGetCitiesWeatherData } from 'hooks/useGetCitiesWeatherData';
import {CityItem} from 'components';
import citiesList from './data/citiesList.json';
import styles from './HomeScreenStyles';


export default function HomeScreen() {
  const { citiesWeather, loading, error } = useGetCitiesWeatherData(citiesList);

  return (
    <View style={styles.viewContainer}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {citiesWeather && (
        <FlatList
          data={citiesWeather}
          renderItem={({item}) => <CityItem item={item} />}
          keyExtractor={item => item.city}
        />
      )}
    </View>
  );
}
