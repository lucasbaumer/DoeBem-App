import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

import { MainScreen } from "@/screens/AuthenticatedFlow/MainScreen";
import SignInScreen from "@/screens/UnathenticatedFlow/SignInScreen";
import { GoBackHeader } from "@/components/organisms/GoBackHeader";
import SignUpScreen from "@/screens/UnathenticatedFlow/SignUpScreen";

import TabNavigator from "./navigators/TabNavigator";

const MainStack = createNativeStackNavigator();

export default function Routes() {
  return (
    <>
      <StatusBar
        // backgroundColor="#FFFFFF"
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={false}
      />
      <NavigationContainer>
        <MainStack.Navigator id={undefined} initialRouteName="SignIn">
          <MainStack.Screen
            name="MainTab"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ header: () => <GoBackHeader label="Cadastre-se" /> }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}
