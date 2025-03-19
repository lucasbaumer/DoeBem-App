import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils/getResponsiveSizeByPixel";

import EyeClosedIcon from "@/assets/images/icons/eye-closed.svg";
import EyeOpenIcon from "@/assets/images/icons/eye-open.svg";

import { stylesheet } from "./styles";

export interface InputProps
  extends Omit<TextInputProps, "ref" | "style" | "cursorColor" | "selectionColor"> {
  inputRef?: LegacyRef<TextInput>;
  label?: string;
  error?: string;
}

export function Input({
  inputRef,
  label,
  error,
  value,
  secureTextEntry,
  onFocus,
  onBlur,
  ...inputProps
}: InputProps) {
  const { styles, theme } = useStyles(stylesheet);

  const animation = useRef(new Animated.Value(0)).current;

  const [isFocused, setIsFocused] = useState(false);
  const [textIsVisible, setTextIsVisible] = useState(false);

  const fontSizeAnimated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [getResponsiveSizeByPixel(18), getResponsiveSizeByPixel(13)],
  });

  const transformYAnimated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [(56 - getResponsiveSizeByPixel(24)) / 2, -(getResponsiveSizeByPixel(16) / 2)],
  });

  const lineHeightAnimated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [getResponsiveSizeByPixel(24), getResponsiveSizeByPixel(16)],
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused || value?.length > 0 ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animation, isFocused, value]);

  return (
    <View style={styles.container}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            {
              fontSize: fontSizeAnimated,
              lineHeight: lineHeightAnimated,
              transform: [{ translateY: transformYAnimated }],
            },
          ]}
          disabled
        >
          {label}
        </Animated.Text>
      )}

      {secureTextEntry ? (
        <TouchableOpacity
          onPress={() => {
            setTextIsVisible((state) => !state);
          }}
          style={styles.showPasswordButton}
        >
          {/* {textIsVisible ? <EyeOpenIcon width={24} /> : <EyeClosedIcon width={24} />} */}
        </TouchableOpacity>
      ) : null}

      <TextInput
        {...inputProps}
        ref={inputRef}
        value={value}
        onFocus={(event) => {
          setIsFocused(true);

          if (typeof onFocus === "function") {
            onFocus(event);
          }
        }}
        onBlur={(event) => {
          setIsFocused(false);

          if (typeof onFocus === "function") {
            onBlur(event);
          }
        }}
        secureTextEntry={
          typeof secureTextEntry === "boolean" && secureTextEntry ? !textIsVisible : undefined
        }
        cursorColor={theme.colors.primary}
        style={styles.input}
      />

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}