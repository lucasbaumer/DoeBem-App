import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useStyles } from "react-native-unistyles";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";

import { stylesheet } from "./styles";

export interface IconButtonProps extends Omit<TouchableOpacityProps, "activeOpacity" | "style"> {
  iconName: string;
}

export function IconButton({
  iconName,
  onPress,
  ...buttonProps
}: IconButtonProps) {
  const { styles } = useStyles(stylesheet);

  const navigator = useNavigation();
  return (
    <TouchableOpacity
      {...buttonProps}
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress || (() => navigator.canGoBack() && navigator.goBack())}
    >
      <Icon name={iconName as keyof typeof Icon.glyphMap} size={25} style={styles.icon} />
    </TouchableOpacity>
  );
}
