import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen, HomeScreen, LoginScreen} from 'screens';
import {StackParamList, ScreenNames} from 'types/navigation';

type AppNavigationProps = {
  initialRoute: keyof StackParamList;
};

const Stack = createNativeStackNavigator<StackParamList>();

const AppNavigation = ({initialRoute}: AppNavigationProps) => {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ScreenNames.Details} component={DetailsScreen} />
      <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
