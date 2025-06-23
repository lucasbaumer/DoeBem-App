import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

import SignInScreen from "@/screens/UnathenticatedFlow/SignInScreen";
import { GoBackHeader } from "@/components/organisms/GoBackHeader";
import SignUpScreen from "@/screens/UnathenticatedFlow/SignUpScreen";

import TabNavigator from "./navigators/TabNavigator";
import { useAppSelector } from "@/hooks";
import SignUpSuccessScreen from "@/screens/UnathenticatedFlow/SignUpSuccessScreen";
import HospitalDetailsScreen from "@/screens/AuthenticatedFlow/HospitalDetailsScreen";
import DonationScreen from "@/screens/AuthenticatedFlow/DonationScreen";
import HospitalRegisterScreen from "@/screens/AuthenticatedFlow/HospitalRegisterScreen";


const MainStack = createNativeStackNavigator();

export default function Routes() {
  const { access_token } = useAppSelector((store) => store.auth);

  return (
    <>
      <StatusBar
        // backgroundColor="#FFFFFF"
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={false}
      />
      <NavigationContainer>
        <MainStack.Navigator
          id={undefined}
          initialRouteName={access_token ? "MainTab" : "SignIn"}
        >
          {access_token ? (
            <>
              <MainStack.Screen
                name="MainTab"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <MainStack.Screen
                name="HospitalDetails"
                component={HospitalDetailsScreen}
                options={{
                  headerShown: false,
                }}
              />
              <MainStack.Screen
                name="Donation"
                component={DonationScreen}
                options={{
                  headerShown: false,
                }}
              />
                            <MainStack.Screen
                name="CreateHospital"
                component={HospitalRegisterScreen}
                options={{ header: () => <GoBackHeader label="Cadastrar Hospital" /> }}
              />
            </>
          ) : (
            <>
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
              <MainStack.Screen
                name="SignUpSuccess"
                component={SignUpSuccessScreen}
                options={{ headerShown: false }}
              />
              
            </>
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}
