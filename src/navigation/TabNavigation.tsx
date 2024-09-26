import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HomeScreen} from 'screens';
import SettingsNavigation from './SettingsNavigation';
import { blueColors, grayColors } from 'styles/themeColors';

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
        tabBarActiveBackgroundColor: blueColors.blue100,
        tabBarInactiveBackgroundColor: grayColors.gray100,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          fontSize: 16,  
          fontWeight: 'bold',
        },
        headerShown: true,
      })}>
      <Tab.Screen name="Weather" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsNavigation} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
