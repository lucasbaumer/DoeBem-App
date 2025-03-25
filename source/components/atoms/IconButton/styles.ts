import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    height: 44,
    width: 44,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.button.iconButton,
  },
  icon: {
    color: theme.colors.typography.black,
  },
}));
