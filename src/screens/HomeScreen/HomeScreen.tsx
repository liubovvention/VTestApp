import {FlatList, Text, View} from 'react-native';
import {useGetCitiesWeatherData} from 'hooks/useGetCitiesWeatherData';
import {CityItem} from 'components';
import citiesList from './data/citiesList.json';
import {useThemedStyles} from 'styles/commonStyles';

export default function HomeScreen() {
  const themedStyles = useThemedStyles();
  const {citiesWeather, loading, error} = useGetCitiesWeatherData(citiesList);

  return (
    <View style={themedStyles.container}>
      {loading && <Text style={themedStyles.text}>Loading...</Text>}
      {error && <Text style={themedStyles.text}>Error: {error}</Text>}
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
