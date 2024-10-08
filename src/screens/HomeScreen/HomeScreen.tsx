import {FlatList, Text, View} from 'react-native';
import {useGetCitiesWeatherData} from 'hooks/useGetCitiesWeatherData';
import { Screen } from 'src/layout';
import {CityItem} from 'components';
import citiesList from 'data/citiesList.json';
import {useStyles} from 'react-native-unistyles';
import globalStyles from 'styles/globalStyles';

export default function HomeScreen() {
  const {styles: themedStyles} = useStyles(globalStyles);
  const {citiesWeather, loading, error} = useGetCitiesWeatherData(citiesList);

  return (
    <Screen.Content>
      {loading && <Text style={themedStyles.text}>Loading...</Text>}
      {error && <Text style={themedStyles.text}>Error: {error}</Text>}
      {citiesWeather && (
        <FlatList
          data={citiesWeather}
          renderItem={({item}) => <CityItem item={item} />}
          keyExtractor={item => item.city}
        />
      )}
    </Screen.Content>
  );
}
