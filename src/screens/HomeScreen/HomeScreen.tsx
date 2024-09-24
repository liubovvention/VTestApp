import {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ApiService from '../../services/apiService';

import styles from './HomeScreenStyles';
import { Section } from '../../components';


export default function HomeScreen() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fetchWeatherData = async () => {
    const url = '/weather';

    try {
      const result = await ApiService.get(url, {q: 'Vilnius'});
      setData(result);
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
    fetchWeatherData();
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
        <Section title="Weather Data">
          {loading && <Text>Loading...</Text>}
          {error && <Text>Error: {error}</Text>}
          {data && <Text>{JSON.stringify(data.coord, null, 2)}</Text>}
        </Section>
      </View>
    </SafeAreaView>
  );
}
