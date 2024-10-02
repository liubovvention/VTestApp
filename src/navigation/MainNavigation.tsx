import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen, HomeScreen} from 'screens';
import {StackParamList, ScreenNames} from 'types/navigation';

type MainNavigationProps = {
  initialRoute: keyof StackParamList;
};

const Stack = createNativeStackNavigator<StackParamList>();

const MainNavigation = ({initialRoute}: MainNavigationProps) => {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ScreenNames.Details} component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
