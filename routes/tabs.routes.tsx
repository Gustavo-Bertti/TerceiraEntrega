import GerenciadorPostagem from "@/components/Screens/GerenciadorPostagem";
import GerenciadorUsuario from "@/components/Screens/GerenciadorUsuario";
import Home from "@/components/Screens/Home";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';


const Tab = createBottomTabNavigator();
const AppTabs = () => {
  

    return (
        <Tab.Navigator
          screenOptions={{headerShown: false}}
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
        </Tab.Navigator>
    );
}

export default AppTabs;