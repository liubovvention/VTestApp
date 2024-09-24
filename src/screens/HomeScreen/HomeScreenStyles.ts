import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    viewContainer: {
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default styles;