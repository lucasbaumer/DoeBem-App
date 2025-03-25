import { createStyleSheet } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils/getResponsiveSizeByPixel";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.red.twentyPercentOpacity,
    borderColor: theme.colors.red.base,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
  },
  title: {
    fontFamily: theme.fonts.plusJakartaSans[700],
    fontSize: getResponsiveSizeByPixel(16),
    marginBottom: 4,
  },
  message: {
    fontFamily: theme.fonts.plusJakartaSans[400],
    fontSize: getResponsiveSizeByPixel(14),
  },
}));
