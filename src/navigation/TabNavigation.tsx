import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppNavigation from 'navigation/AppNavigation';
import SettingsNavigation from 'navigation/SettingsNavigation';
import {StackParamList, ScreenNames} from 'types/navigation';
import {basicColors, blueColors, grayColors} from 'styles/themeColors';

type TabNavigationProps = {
  initialRoute: keyof StackParamList;
};

const Tab = createBottomTabNavigator();

const TabNavigation = ({initialRoute}: TabNavigationProps) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName = 'ios-information-circle';
          if (route.name === ScreenNames.Weather) {
            iconName = 'cloud';
          } else if (route.name === ScreenNames.Settings) {
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
      <Tab.Screen
        name={ScreenNames.Weather}
        children={() => <AppNavigation />}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={ScreenNames.Settings}
        component={SettingsNavigation}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
