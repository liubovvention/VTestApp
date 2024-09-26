import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, SettingsScreen} from 'screens';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Weather"
      screenOptions={{headerShown: true}}>
      <Tab.Screen name="Weather" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
