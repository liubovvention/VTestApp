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
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  descrContainer: {
    flexDirection: 'column',
    width: width / 2,
    marginRight: 10,
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
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    width: 100,
  },
  temp: {
    fontSize: 16,
    color: 'white',
  },
});

export default styles;
