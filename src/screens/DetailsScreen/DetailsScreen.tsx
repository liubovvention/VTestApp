import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'types/navigation';
import {CityItem} from 'components';
import styles from './DetailsScreenStyles';

type DetailsProps = NativeStackScreenProps<StackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsProps> = ({route}) => {
  const {humidity, wspeed, pressure, cloud} = route.params;

  return (
    <View style={styles.wrapper}>
      <CityItem item={route.params} isPressable={false} />
      <View style={styles.container}>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Humidity:</Text>
          <Text style={styles.value}>{humidity}%</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Pressure:</Text>
          <Text style={styles.value}>{pressure} hPa</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Wind Speed:</Text>
          <Text style={styles.value}>{wspeed} mph</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Cloud Cover:</Text>
          <Text style={styles.value}>{cloud}%</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
