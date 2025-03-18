import { StatusBar } from 'react-native';
import React from 'react';
import {
  useFonts,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";

import '@/styles/index';

import { MainScreen } from './source/screens/AuthenticatedFlow/MainScreen';



export default function App() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });


  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <MainScreen />
    </>
  );
}
