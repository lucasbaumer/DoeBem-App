import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({

  separator: {
    height: 1,
    backgroundColor: theme.colors.separator,
  },
}));
