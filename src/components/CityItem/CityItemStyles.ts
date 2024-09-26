import {StyleSheet} from 'react-native';
import {width} from 'styles/commonStyles';
import { blueColors, grayColors } from 'styles/themeColors';


const styles = StyleSheet.create({
    itemContainer: {
      width: width,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: grayColors.gray25,
    },
    weatherIcon: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    descrContainer: {
      flexDirection: 'column',
      width: width / 2.5,
      justifyContent: 'center',
    },
    cityTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    weatherDescr: {
      fontSize: 16,
    },
    tempContainer: {
      backgroundColor: blueColors.blue50,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      width: 100,
      marginRight: 10, 
    },
    temp: {
      fontSize: 16,
      color: 'white',
    },
    actionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 50,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    chevronIcon: {
      color: grayColors.gray50,
    },
  });

export default styles;
