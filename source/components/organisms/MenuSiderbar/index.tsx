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

import { RootState } from "@/store";
import { logout } from "@/store/reducers/authSlice";
import { useDispatch } from "react-redux";

interface MenuSidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

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
};

const MenuSidebar: React.FC<MenuSidebarProps> = ({ isVisible, onClose }) => {
  // Mock de tipo de perfil
  // Troque para 'admin' para testar o menu de admin
  const profileType = "donor"; // ou 'admin'
  const { styles, theme } = useStyles(stylesheet);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigate = (screen: keyof RootStackParamList) => {
    onClose();
    navigator.navigate(screen);
  };

  async function handleLogout() {
    onClose();
    setIsLogout(true);
    navigation.navigate("SignIn");
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleNavigate("ProfileScreen")}
          style={styles.profileContainer}
        >
          <View style={styles.profileIconContainer}>
            <Icon
              name="chevron-forward"
              size={24}
              style={styles.profileFowardIcon}
            />
          </View>
        </TouchableOpacity>
        <Separator />
        <View style={styles.menuItemsContainer}>
          {profileType === "donor" ? (
            <>
              <MenuItem
                iconName="person"
                text="Perfil"
                onPress={() => handleNavigate("ProfileScreen")}
              />
              <MenuItem iconName="log-out" text="Sair" onPress={handleLogout} />
            </>
          ) : (
            <>
              <MenuItem
                iconName="business"
                text="Hospitais"
                onPress={() => handleNavigate("NewsList")}
              />
              <MenuItem
                iconName="person-add"
                text="Criar Admin"
                onPress={() => handleNavigate("MemberList")}
              />
              <MenuItem
                iconName="add-circle"
                text="Criar Hospital"
                onPress={() => handleNavigate("CompanyInvoiceList")}
              />
              <MenuItem
                iconName="cash"
                text="Doações"
                onPress={() => handleNavigate("EventList")}
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
