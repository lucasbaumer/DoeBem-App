import { getResponsiveSizeByPixel } from "@/utils";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  newsDetailsHeader: {
    width: "100%",
    height: 340,
    backgroundColor: theme.colors.skeleton
  },
  newsDetailsHeaderButtons: {
    position: "absolute",
    top: UnistylesRuntime.insets.top + 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
  },
  newsImage: {
    width: "100%",
    height: "100%",
  },
  newsDetailsBody: {
    backgroundColor: theme.colors.background,
    paddingBottom: 25,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 20,
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  newsTitle: {
    fontFamily: theme.fonts.plusJakartaSans[600],
    fontSize: getResponsiveSizeByPixel(32),
    color: theme.colors.typography.dark_gray,
  },
  newsDescription: {
    fontFamily: theme.fonts.plusJakartaSans[300],
    fontSize: getResponsiveSizeByPixel(25),
    color: theme.colors.typography.dark_gray,
  },
  footer: {
    marginVertical: 16,
    marginHorizontal: 33,
    backgroundColor: theme.colors.background,
  }
}));
