import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";

import Routes from "@/routes";

import "@/styles";
import { Provider } from "react-redux";
import { store } from "@/store";

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
    <Provider store={store}>
      <StatusBar translucent style="dark" />
      <Routes />  
    </Provider>
  );
}
