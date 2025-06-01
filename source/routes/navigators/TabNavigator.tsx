import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

// import OrderListScreen from '@/screens/AuthenticatedFlow/OrderListScreen';
// import ServiceScreen from '@/screens/AuthenticatedFlow/ServiceScreen';
// import StoreScreen from '@/screens/AuthenticatedFlow/StoreScreen';

import { BottomTabBar } from '@/components/organisms/BottomTabBar';
// import MenuSideBar from '@/components/organisms/MenuSideBar';
// import NotifySideBar from '@/components/organisms/NotifySideBar';

import LogoHeader from "@/assets/images/logo-header.svg";
import MenuIcon from "@/assets/images/menu-icon.svg";
import CartIcon from "@/assets/images/cart-icon.svg";
import { MainScreen } from "@/screens/AuthenticatedFlow/MainScreen";
import { useStyles } from "react-native-unistyles";
import { getResponsiveSizeByPixel } from "@/utils";

type RootStackParamList = {
  SignIn: undefined;
};

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useStyles();

  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <Tab.Navigator
        id={undefined}
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          headerTitle: () => (
        <Text
          style={{
            fontFamily: theme.fonts.plusJakartaSans[600],
            fontSize: getResponsiveSizeByPixel(30),
            color: theme.colors.typography.yellow,
          }}
        >
          DoeBem
        </Text>
          ),
          headerTitleAlign: "center",
          headerStyle: {
        backgroundColor: "#C94734",
          },
        }}
      >
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Pesquisar" component={MainScreen} />
        <Tab.Screen
          name="Notificações"
          component={MainScreen}
          options={{
        headerTitle: () => (
          <Text
            style={{
          fontFamily: theme.fonts.plusJakartaSans[600],
          fontSize: getResponsiveSizeByPixel(30),
          color: theme.colors.typography.yellow,
            }}
          >
            DoeBem
          </Text>
        ),
          }}
        />
        <Tab.Screen name="Perfil" component={MainScreen} />
      </Tab.Navigator>
    </>
  );
}
