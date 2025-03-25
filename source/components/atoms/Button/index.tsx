import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useStyles } from "react-native-unistyles";

import { stylesheet } from "./styles";

export interface ButtonProps extends Omit<TouchableOpacityProps, "activeOpacity" | "style"> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export function Button({
  label,
  variant = "primary",
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  ...buttonProps
}: ButtonProps) {
  const { styles, theme } = useStyles(stylesheet, {
    type: variant,
  });

  return (
    <TouchableOpacity
      {...buttonProps}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      style={[styles.button, disabled && !isLoading ? styles.disableButton : null]}
    >
      {!isLoading ? (
        <View style={styles.container}>
          <View style={styles.iconContainer}>{leftIcon}</View>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.iconContainer}>{rightIcon}</View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={variant === "primary" ? theme.colors.white : theme.colors.primary}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
