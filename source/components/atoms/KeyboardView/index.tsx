import React, { useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { useAnimatedHeaderHeight } from "@react-navigation/native-stack";
import { useStyles } from "react-native-unistyles";

import { stylesheet } from "./styles";

interface KeyboardViewProps {
  children: React.ReactNode;
}

export function KeyboardView({ children }: KeyboardViewProps) {
  const { styles } = useStyles(stylesheet);

  const headerHeight = useAnimatedHeaderHeight();

  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true);
    });

    const keyboardWillHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const memoizedKeyboardHeight = useMemo(() => headerHeight, [headerHeight]);

  const keyboardHeight = useMemo(() => {
    if (Platform.OS === "ios") {
      return undefined;
    } else {
      if (+JSON.stringify(memoizedKeyboardHeight) !== 0) {
        return keyboardIsVisible
          ? StatusBar.currentHeight
          : +JSON.stringify(memoizedKeyboardHeight);
      } else {
        return keyboardIsVisible ? 0 : -StatusBar.currentHeight;
      }
    }
  }, [keyboardIsVisible, memoizedKeyboardHeight]) as number | undefined;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={keyboardHeight}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
