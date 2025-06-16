import { getResponsiveSizeByPixel } from "@/utils";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemIcon: {
    color: theme.colors.icon.menu,
    fontSize: 25,
    paddingRight: 23,
  },
  menuItemText: {
    fontFamily: theme.fonts.plusJakartaSans[500],
    fontSize: getResponsiveSizeByPixel(20),
  },
}));
