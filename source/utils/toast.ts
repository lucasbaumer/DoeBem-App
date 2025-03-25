import { UnistylesRuntime } from "react-native-unistyles";
import { showMessage, MessageOptions } from "react-native-flash-message";

import * as theme from "@/styles/themes";

const defaultConfig: Partial<MessageOptions> = {
  floating: true,
  duration: 6000,
  position: "top",
  statusBarHeight: UnistylesRuntime.insets.top,
  titleStyle: {
    fontFamily: theme.lightTheme.fonts.plusJakartaSans[700],
  },
  textStyle: {
    fontFamily: theme.lightTheme.fonts.plusJakartaSans[500],
    textAlign: "justify",
  },
};

export function defaultToast(settings: MessageOptions) {
  showMessage({
    ...defaultConfig,
    ...settings,
  });
}

export function errorToast(settings: MessageOptions) {
  showMessage({
    backgroundColor: theme.lightTheme.colors.input.error,
    ...defaultConfig,
    ...settings,
  });
}
