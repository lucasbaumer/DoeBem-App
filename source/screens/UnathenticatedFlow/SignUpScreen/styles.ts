import { createStyleSheet } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    gap: 16,
  },
  termsCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
    gap: 4,
  },
  termsCheckboxText: {
    color: theme.colors.typography.primary,
    fontSize: getResponsiveSizeByPixel(16),
    lineHeight: getResponsiveSizeByPixel(18),
    fontFamily: theme.fonts.plusJakartaSans[600],
  },
  termsCheckboxTextLink: {
    color: theme.colors.typography.secundary,
    fontSize: getResponsiveSizeByPixel(16),
    lineHeight: getResponsiveSizeByPixel(18),
    fontFamily: theme.fonts.plusJakartaSans[600],
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
  },
  successText: {
    color: theme.colors.typography.primary,
    fontSize: getResponsiveSizeByPixel(24),
    fontFamily: theme.fonts.plusJakartaSans[600],
    textAlign: "center",
  },
  successIcon: {
    padding: 8,
    borderRadius: 150,
    backgroundColor: "#EFF3FF",
    marginVertical: 90,
  },
}));
