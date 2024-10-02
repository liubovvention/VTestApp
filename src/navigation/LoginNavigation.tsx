import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, BiometricScreen} from 'screens';
import {StackParamList, ScreenNames} from 'types/navigation';

type LoginNavigationProps = {
  initialRoute: keyof StackParamList;
};

const Stack = createNativeStackNavigator<StackParamList>();

const LoginNavigation = ({initialRoute}: LoginNavigationProps) => {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
      <Stack.Screen name={ScreenNames.Biometrics} component={BiometricScreen} />
    </Stack.Navigator>
  );
};

export default LoginNavigation;