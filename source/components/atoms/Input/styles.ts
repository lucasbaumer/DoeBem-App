import { createStyleSheet } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils/getResponsiveSizeByPixel";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    position: "relative",
    gap: 6,
  },
  input: {
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.input.border,
    fontSize: getResponsiveSizeByPixel(18),
    lineHeight: getResponsiveSizeByPixel(24),
    fontFamily: theme.fonts.plusJakartaSans[400],
    color: theme.colors.input.value,
  },
  label: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    paddingHorizontal: 5,
    backgroundColor: theme.colors.background,
    fontSize: getResponsiveSizeByPixel(18),
    fontFamily: theme.fonts.plusJakartaSans[400],
    color: theme.colors.input.label,
  },
  errorMessage: {
    fontSize: getResponsiveSizeByPixel(14),
    fontFamily: theme.fonts.plusJakartaSans[400],
    color: theme.colors.input.error,
  },
  showPasswordButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    height: 56,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
}));