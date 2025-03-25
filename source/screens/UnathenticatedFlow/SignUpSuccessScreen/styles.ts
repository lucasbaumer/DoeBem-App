import { createStyleSheet } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils";

export const stylesheet = createStyleSheet((theme) => ({
  successContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingVertical: 80,
    backgroundColor: theme.colors.background,
  },
  successText: {
    color: theme.colors.typography.primary,
    fontSize: getResponsiveSizeByPixel(28),
    fontFamily: theme.fonts.plusJakartaSans[600],
    textAlign: "center",
  },
  successIcon: {
    padding: 45,
    borderRadius: 150,
    backgroundColor: "#EFF3FF",
    marginVertical: 60,
  },
  PedingAccountContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    gap: 30,
  },
  PedingAccountTextTitle: {
    fontFamily: theme.fonts.plusJakartaSans[700],
    fontSize: getResponsiveSizeByPixel(28),
    color: theme.colors.typography.secundary,
  },
  PedingAccountText: {
    fontFamily: theme.fonts.plusJakartaSans[400],
    fontSize: getResponsiveSizeByPixel(18),
    textAlign: "center",
    color: theme.colors.typography.beige,
  },
}));
