import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { MainScreen } from "@/screens/AuthenticatedFlow/MainScreen";
import SignInScreen from "@/screens/UnathenticatedFlow/SignInScreen";

const MainStack = createNativeStackNavigator();

export default function Routes() {
    
    return (
        <NavigationContainer>
            <MainStack.Navigator id={undefined} initialRouteName="SignIn">
                <MainStack.Screen name="Main" component={MainScreen} options={{ headerShown : false}} />
                <MainStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown : false}} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}