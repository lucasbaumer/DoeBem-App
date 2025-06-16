import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";
import { Ionicons } from "@/types/ionicons";

interface MenuItemProps {
  iconName: Ionicons;
  text: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ iconName, text, onPress }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.menuItem}
    >
      <Icon name={iconName} style={styles.menuItemIcon} />
      <Text style={styles.menuItemText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
