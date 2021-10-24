import React from 'react';

import { ThemeProvider } from 'styled-components';

import { main } from './src/global/styles/theme';

import { Dashboard } from './src/screens/Dashboard';
import { CreateBet } from './src/screens/CreateBet';
import { OptionSelect } from './src/screens/OptionSelect';

import { AppRoutes } from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';

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

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });
  if(!fontsLoaded){
    return <AppLoading />
  }
  return (
  <ThemeProvider theme={main} >
    <StatusBar backgroundColor={main.colors.primary}  barStyle='dark-content' />
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  </ThemeProvider>
  );
}