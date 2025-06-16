import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import OrderListScreen from '@/screens/AuthenticatedFlow/OrderListScreen';
// import ServiceScreen from '@/screens/AuthenticatedFlow/ServiceScreen';
// import StoreScreen from '@/screens/AuthenticatedFlow/StoreScreen';

import { BottomTabBar } from "@/components/organisms/BottomTabBar";
// import MenuSideBar from '@/components/organisms/MenuSideBar';
// import NotifySideBar from '@/components/organisms/NotifySideBar';

import { useStyles } from "react-native-unistyles";
import { getResponsiveSizeByPixel } from "@/utils";
import MainScreen from "@/screens/AuthenticatedFlow/MainScreen";
import ProfileScreen from "@/screens/AuthenticatedFlow/ProfileScreen";
import MenuSidebar from "@/components/organisms/MenuSiderbar";
import { useAppSelector } from "@/hooks";

type RootStackParamList = {
  SignIn: undefined;
};

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useStyles();

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user, access_token } = useAppSelector((store) => store.auth);

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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setIsMenuVisible(true)}
              style={{
                padding: 10,
                marginLeft: 10,
              }}
            >
              <MaterialCommunityIcons
                name="menu"
                size={24}
                color={theme.colors.icon.header}
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Donations" component={ProfileScreen} />

        {user.role === "Admin" && access_token && (
          <Tab.Screen name="Users" component={MainScreen} />
        )}
      </Tab.Navigator>
      <MenuSidebar
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
      />
    </>
  );
}
