import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    itemContainer: {
      width: width,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    weatherIcon: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    descrContainer: {
      flexDirection: 'column',
      width: width / 2.5,
      justifyContent: 'center', // Added for vertical centering
    },
    cityTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    weatherDescr: {
      fontSize: 16,
    },
    tempContainer: {
      backgroundColor: 'blue',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      width: 100,
      marginRight: 10, // Added margin between temperature and button
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
      color: 'gray', // Ensures the icon is visible
    },
  });

export default styles;
