import { createStyleSheet } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils/getResponsiveSizeByPixel";

export const stylesheet = createStyleSheet((theme) => ({
  button: {
    height: 60,
    width: "100%",
    borderRadius: 5,
    variants: {
      type: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.white,
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
      },
    },
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: getResponsiveSizeByPixel(18),
    lineHeight: getResponsiveSizeByPixel(18),
    fontFamily: theme.fonts.plusJakartaSans[600],
    variants: {
      type: {
        primary: {
          color: theme.colors.white,
        },
        secondary: {
          color: theme.colors.primary,
        },
      },
    },
  },
  disableButton: {
    opacity: 0.7,
  },
}));
