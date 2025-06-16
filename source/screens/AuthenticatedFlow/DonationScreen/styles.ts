import { getResponsiveSizeByPixel } from "@/utils";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.typography.dark_gray,
    marginBottom: 16,
    marginTop: 8,
  },
  card: {
    flexDirection: "row",
    gap: 24,
    },
    linearGradient: {
        height: "100%",
        width: "100%",
        borderRadius : 3.
      },
    Image: {
        width: 112,
        height: 110,
      },
    Name: {
        maxWidth: 240,
        fontSize: getResponsiveSizeByPixel(20),
        fontFamily: theme.fonts.plusJakartaSans[600],
        color: theme.colors.typography.dark_gray,
      },
    DateContainer: {
        flexDirection: "column",
        gap: 10,
        marginTop: 10,
        alignItems: "flex-start",
        justifyContent: "center",
      },
    additionalInformationContainer: {
        flexDirection: "row",
        alignItems: "center",
      justifyContent: "center",
      gap: 3,
      },
    additionalInformationText: {
        fontSize: getResponsiveSizeByPixel(16),
        fontFamily: theme.fonts.plusJakartaSans[500],
        color: theme.colors.typography.dark_gray,
      },
        newsDetailsHeaderButtons: {
    position: "absolute",
    top: UnistylesRuntime.insets.top + 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
  },
}));
