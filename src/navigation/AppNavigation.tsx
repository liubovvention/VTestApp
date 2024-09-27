import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen, HomeScreen} from 'screens';
import {StackParamList} from 'types/navigation';

type AppNavigationProps = {
  initialRoute: keyof StackParamList;
};

const AppNavigation = ({initialRoute}: AppNavigationProps) => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigation;
