import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStyles } from "react-native-unistyles";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Linking } from "react-native";
import { stylesheet } from "./styles";

import Icon from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import MenuItem from "@/components/atoms/MenuItem";
import Separator from "@/components/atoms/Separator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { logout } from "@/store/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useAccountDetailsQuery } from "@/store/api";

interface MenuSidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

type TabParamList = {
  Home: undefined;
  Donations: undefined;
  Users: undefined;
};

type RootStackParamList = {
  CompanyInvoiceList: undefined;
  CollaboratorProfileScreen: undefined;
  ProfileScreen: undefined;
  EventList: undefined;
  CollaboratorEventList: undefined;
  NewsList: undefined;
  FinishedEventList: undefined;
  MemberList: undefined;
  SignIn: undefined;
  MainTab: { screen?: keyof TabParamList };
};

const MenuSidebar: React.FC<MenuSidebarProps> = ({ isVisible, onClose }) => {
  const { styles, theme } = useStyles(stylesheet);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { data: account } = useAccountDetailsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigate = (screen: keyof TabParamList) => {
    onClose();
    navigator.navigate('MainTab', { screen });
  };

  const handleNavigateToStack = (screen: keyof RootStackParamList) => {
  onClose();
  navigator.navigate(screen as any);
  };  

  async function handleLogout() {
    onClose();
    setIsLogout(true);
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.4}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      animationInTiming={800}
      backdropTransitionInTiming={900}
      animationOutTiming={1000}
      backdropTransitionOutTiming={1100}
      useNativeDriverForBackdrop={true}
      onModalHide={() => {
        if (isLogout) {
          dispatch(logout());
        }
      }}
      style={styles.modal}
    >
      <View style={styles.menu}>
        <TouchableOpacity activeOpacity={0.7} style={styles.profileContainer}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.emptyAvatarImage}>
              <Icon name="person" size={30} color={theme.colors.icon.event} />
            </View>
          </View>
          <View style={styles.profileTextsContainer}>
            <Text numberOfLines={2} style={styles.profileName}>
              {account?.name}
            </Text>
            <Text style={styles.profileText}>
              {account?.role === "Donor" ? "Doador" : "Administrador"}
            </Text>
          </View>
        </TouchableOpacity>
        <Separator />
        <View style={styles.menuItemsContainer}>
          {account?.role === "Donor" ? (
            <>
              <MenuItem
                iconName="heart"
                text="Minhas Doações"
                onPress={() => handleNavigate("Donations")}
              />
              <MenuItem
                iconName="newspaper"
                text="Hospitais"
                onPress={() => handleNavigate("Home")}
              />
              <MenuItem iconName="log-out" text="Sair" onPress={handleLogout} />
            </>
          ) : (
            <>
              <MenuItem
                iconName="business"
                text="Hospitais"
                onPress={() => handleNavigateToStack("NewsList")}
              />
              <MenuItem
                iconName="person-add"
                text="Criar Admin"
                onPress={() => handleNavigateToStack("MemberList")}
              />
              <MenuItem
                iconName="add-circle"
                text="Criar Hospital"
                onPress={() => handleNavigateToStack("CreateHospital")}
              />
              <MenuItem
                iconName="cash"
                text="Doações"
                onPress={() => handleNavigateToStack("EventList")}
              />
              <MenuItem iconName="log-out" text="Sair" onPress={handleLogout} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default MenuSidebar;
