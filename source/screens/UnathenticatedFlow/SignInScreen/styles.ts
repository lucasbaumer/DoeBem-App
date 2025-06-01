import { createStyleSheet } from "react-native-unistyles";

import { getResponsiveSizeByPixel } from "@/utils/index";

export const stylesheet = createStyleSheet((theme) => ({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: getResponsiveSizeByPixel(42),
  },
  pageTitle: {
    fontFamily: theme.fonts.plusJakartaSans[600],
    fontSize: getResponsiveSizeByPixel(30),
  color: theme.colors.typography.primary,
  },
  formContainer: {
    marginTop: getResponsiveSizeByPixel(32),
    gap: 16,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    fontFamily: theme.fonts.plusJakartaSans[700],
    fontSize: getResponsiveSizeByPixel(16),
    color: theme.colors.typography.secundary,
  },
  buttonContainer: {
    marginTop: getResponsiveSizeByPixel(42),
  },
  separatorContainer: {
    gap: 20,
    marginVertical: getResponsiveSizeByPixel(35),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  separatorLine: {
    width: 60,
    height: 1,
    backgroundColor: theme.colors.typography.black,
  },
  separatorText: {
    fontSize: getResponsiveSizeByPixel(16),
    fontFamily: theme.fonts.plusJakartaSans[400],
    lineHeight: getResponsiveSizeByPixel(18),
    color: theme.colors.typography.black,
  },
  socialLoginButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: getResponsiveSizeByPixel(28),
    gap: 2,
  },
  signUpButtonText: {
    fontSize: getResponsiveSizeByPixel(16),
    fontFamily: theme.fonts.plusJakartaSans[700],
    color: theme.colors.typography.secundary,
  },
  signUpText: {
    fontSize: getResponsiveSizeByPixel(16),
    fontFamily: theme.fonts.plusJakartaSans[700],
    color: theme.colors.typography.lightGray,
  },
  termOfUseContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    marginHorizontal: 40,
    marginTop: getResponsiveSizeByPixel(90),
    flexWrap: "wrap",
  },
  termOfUseText: {
    fontSize: getResponsiveSizeByPixel(13),
    fontFamily: theme.fonts.plusJakartaSans[700],
    color: theme.colors.typography.lightGray,
  },
  termOfUseLink: {
    fontSize: getResponsiveSizeByPixel(13),
    fontFamily: theme.fonts.plusJakartaSans[700],
    color: theme.colors.typography.secundary,
    textAlign: "center",
  },
}));
