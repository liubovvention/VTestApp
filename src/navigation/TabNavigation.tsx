import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppNavigation from 'navigation/AppNavigation';
import SettingsNavigation from 'navigation/SettingsNavigation';
import {basicColors, blueColors, grayColors} from 'styles/themeColors';
import { StackParamList } from 'types/navigation';

type TabNavigationProps = {
  initialRoute: keyof StackParamList;
};

const TabNavigation = ({ initialRoute }: TabNavigationProps) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName = 'ios-information-circle';
          if (route.name === 'Weather') {
            iconName = 'cloud';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
          }
          return <Icon name={iconName} size={20} color={basicColors.white} />;
        },
        tabBarActiveBackgroundColor: blueColors.blue100,
        tabBarInactiveBackgroundColor: grayColors.gray100,
        tabBarActiveTintColor: basicColors.white,
        tabBarInactiveTintColor: basicColors.white,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        headerShown: true,
      })}>
      {/* <Tab.Screen name="Weather" component={AppNavigation} /> */}
      <Tab.Screen
        name="Weather"
        children={() => <AppNavigation initialRoute={initialRoute} />}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigation}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
