import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    viewContainer: {
      width: width,
      height: height - 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    info: {
      fontSize: 18,
      marginVertical: 5,
    },
  });

  export default styles;