import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { main } from './src/global/styles/theme';
import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black
} from '@expo-google-fonts/roboto';

import {
  StatusBar
} from 'react-native'
import { Hooks } from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  const { userStorageLoaging } = useAuth();

  if(!fontsLoaded || userStorageLoaging){
    return <AppLoading />
  }
  return (
  <ThemeProvider theme={main} >
    <StatusBar backgroundColor={main.colors.primary}  barStyle='dark-content' />
    <Hooks>
      <Routes />
    </Hooks>
  </ThemeProvider>
  );
}