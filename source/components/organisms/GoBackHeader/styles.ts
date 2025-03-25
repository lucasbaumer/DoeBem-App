import { getResponsiveSizeByPixel } from "@/utils";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: UnistylesRuntime.insets.top + 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: getResponsiveSizeByPixel(22),
    color: theme.colors.typography.primary,
    fontFamily: theme.fonts.plusJakartaSans[600],
    alignSelf: "center",
    textAlign: "center",
  },
  headerSideItem: {
    flex: 1,
  },
  headerCenterItem: {
    flex: 3,
  },
}));
