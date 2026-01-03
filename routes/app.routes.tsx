
import ControllerPostagem from '@/components/Screens/ControllerPostagem';
import Login from '@/components/Screens/Login';
import ViewPostagem from '@/components/Screens/ViewPostagem';
import { RootStackParamList } from '@/types/Navigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './tabs.routes';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes =() => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="HomeScreen" component={AppTabs} />
    <Stack.Screen name="DetailsPostagem" component={ViewPostagem} />
    <Stack.Screen name="ControllerPostagem" component={ControllerPostagem} />

  </Stack.Navigator>
);
export default AppRoutes;