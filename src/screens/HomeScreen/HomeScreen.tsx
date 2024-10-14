import {FlatList, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useStyles} from 'react-native-unistyles';
import {useGetCitiesWeatherData} from 'hooks/useGetCitiesWeatherData';
import {Screen} from 'src/layout';
import {CityItem, Section, StyledButton} from 'components';
import {ScreenNames, StackParamList} from 'types/navigation';
import citiesList from 'data/citiesList.json';
import globalStyles from 'styles/globalStyles';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {styles: themedStyles} = useStyles(globalStyles);
  const {citiesWeather, loading, error} = useGetCitiesWeatherData(citiesList);

  return (
    <Screen.Content>
      {loading && <Text style={themedStyles.text}>Loading...</Text>}
      {error && <Text style={themedStyles.text}>Error: {error}</Text>}
      {citiesWeather && (
        <FlatList
          ListHeaderComponent={
            <Section title={'Weather'}>
              <Text>You can modify this list and add new city</Text>
              <View style={themedStyles.rightAlignContainer}>
                <StyledButton
                  onPress={() => navigation.navigate(ScreenNames.Option)}
                  label={'Add Option'}
                />
              </View>
            </Section>
          }
          data={citiesWeather}
          renderItem={({item}) => <CityItem item={item} />}
          keyExtractor={item => item.city}
        />
      )}
    </Screen.Content>
  );
}
