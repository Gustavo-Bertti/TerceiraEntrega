import { RootStackParamList } from "@/types/Navigator";
import Token from "@/types/Token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const useUserPermissions = () => {
  const navigation = useNavigation<NavigationProps>();

  const checkPermissions = async () => {
    const tokenString = await AsyncStorage.getItem('token');

    if (!tokenString) {
      navigation.navigate('Login');
      return;
    }

    const token: Token = JSON.parse(tokenString);
    return token;
  };

  return { checkPermissions };
}
export default useUserPermissions;
