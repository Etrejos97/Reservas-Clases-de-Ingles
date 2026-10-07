import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PerfilProvider } from './src/context/PerfilContext';
import { ReservasProvider } from './src/context/ReservasContext';
import MainTabs from './src/navigation/MainTabs';
import { colors } from  './src/theme/index.js';

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PerfilProvider>
        <ReservasProvider>
          <NavigationContainer theme={temaNavegacion}>
            <StatusBar style="dark"/>
            <MainTabs />
          </NavigationContainer>
        </ReservasProvider>
      </PerfilProvider>
    </SafeAreaProvider>
  );
}


