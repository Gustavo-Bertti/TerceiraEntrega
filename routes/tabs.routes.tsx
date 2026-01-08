import GerenciadorPostagem from "@/components/Screens/GerenciadorPostagem";
import GerenciadorUsuario from "@/components/Screens/GerenciadorUsuario";
import Home from "@/components/Screens/Home";
import useUserPermissions from "@/config/auth/userPermissions";
import Token from "@/types/Token";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from 'react';


const Tab = createBottomTabNavigator();
const AppTabs = () => {
    const { checkPermissions } = useUserPermissions();
    const [token, setToken] = useState<Token>();
    useEffect(() => {
        const fetchToken = async () => {
            const t = await checkPermissions();
            setToken(t);
        };

        fetchToken();
    }, []);
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >


            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            {token?.idTipo === 1 && (
                <>
                    <Tab.Screen
                        name="Gerenciador de Postagem"
                        component={GerenciadorPostagem}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="document-text-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Gerenciador de Usuario"
                        component={GerenciadorUsuario}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="people-outline" size={size} color={color} />
                            ),
                        }}
                    />
                </>)}
        </Tab.Navigator>
    );
}

export default AppTabs;