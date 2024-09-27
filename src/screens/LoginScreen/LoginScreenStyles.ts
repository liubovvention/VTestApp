import {StyleSheet} from 'react-native';
import {width} from 'styles/commonStyles';
import {basicColors, grayColors} from 'src/styles/themeColors';

const styles = StyleSheet.create({
  input: {
    width: width / 2,
    height: 40,
    borderColor: grayColors.gray25,
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 8,
    borderRadius: 10
  },
  label: {
    fontWeight: 'bold'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: basicColors.red,
    marginBottom: 12,
  },
  button: {
    width: width / 2,
    marginVertical: 10,
  },
});

export default styles;
