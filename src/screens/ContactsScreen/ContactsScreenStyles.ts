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
    button: {
      width: width/2,
      backgroundColor: '#d3d3d3', 
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10, 
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    buttonPressed: {
      backgroundColor: 'blue', 
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'gray',
    }
  });

  export default styles;