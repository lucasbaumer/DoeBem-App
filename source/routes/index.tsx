import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { MainScreen } from "@/screens/AuthenticatedFlow/MainScreen";
import SignInScreen from "@/screens/UnathenticatedFlow/SignInScreen";
import { GoBackHeader } from "@/components/organisms/GoBackHeader";
import SignUpScreen from "@/screens/UnathenticatedFlow/SignUpScreen";

const MainStack = createNativeStackNavigator();

export default function Routes() {
    
    return (
        <NavigationContainer>
            <MainStack.Navigator id={undefined} initialRouteName="SignIn">
                <MainStack.Screen name="Main" component={MainScreen} options={{ headerShown : false}} />
                <MainStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown : false}} />
                <MainStack.Screen name="SignUp" component={SignUpScreen} options={{ header: () => <GoBackHeader label="Cadastre-se" />}} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}