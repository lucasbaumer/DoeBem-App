import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput as TextInputNative, TextInputProps, View } from "react-native";
import TextInput, { Mask } from "react-native-mask-input";
import { useStyles } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils/getResponsiveSizeByPixel";

import { stylesheet } from "./styles";

export interface InputMaskProps
  extends Omit<TextInputProps, "ref" | "style" | "cursorColor" | "selectionColor"> {
  inputRef?: LegacyRef<TextInputNative>;
  mask?: Mask;
  label?: string;
  error?: string;
}

export function InputMask({
  inputRef,
  label,
  error,
  value,
  placeholder,
  onFocus,
  onBlur,
  ...inputProps
}: InputMaskProps) {
  const { styles, theme } = useStyles(stylesheet);

  const animation = useRef(new Animated.Value(0)).current;

  const [isFocused, setIsFocused] = useState(false);

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

      <TextInput
        {...inputProps}
        ref={inputRef}
        value={value}
        placeholder={typeof placeholder === "string" ? placeholder : undefined}
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
        cursorColor={theme.colors.primary}
        style={styles.input}
      />

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
