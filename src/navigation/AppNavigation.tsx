import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import TabNavigation from 'navigation/TabNavigation';
import {DetailsScreen} from 'screens';
import {StackParamList} from 'types/navigation';

type AppNavigationProps = {
  initialRoute: keyof StackParamList;
};

const AppNavigation = ({initialRoute}: AppNavigationProps) => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
