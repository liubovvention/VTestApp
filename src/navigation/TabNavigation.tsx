import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsNavigation from 'navigation/SettingsNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HomeScreen, SettingsScreen} from 'screens';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Weather"
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName = 'ios-information-circle';
          if (route.name === 'Weather') {
            iconName = 'cloud';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
          }
          return <Icon name={iconName} size={20} color="white" />;
        },
        tabBarActiveBackgroundColor: 'blue',
        tabBarInactiveBackgroundColor: 'gray',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
      })}>
      <Tab.Screen name="Weather" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
