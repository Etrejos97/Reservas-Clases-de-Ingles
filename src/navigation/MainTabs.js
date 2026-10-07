import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ClasesStack from './ClasesStack';
import ReservasScreen from '../screens/ReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

// Ícono de cada pestaña: [cuando está seleccionada, cuando no lo está]
const ICONOS = {
    Clases: ['book', 'book-outline'],
    Reservas: ['calendar', 'calendar-outline'],
    Perfil: ['person', 'person-outline'],
};

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: colors.primario,
                tabBarInactiveTintColor: colors.textoSuave,
                tabBarIcon: ({ focused, color, size }) => {
                    const [seleccionado, contorno] = ICONOS[route.name];
                    return <Ionicons name={focused ? seleccionado : contorno} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Clases"
                component={ClasesStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Reservas" component={ReservasScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}
