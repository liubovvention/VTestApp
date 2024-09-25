import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {padding: 20},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {fontSize: 16, color: '#333'},
  value: {fontSize: 16, color: '#bbb'},
});

export default styles;
