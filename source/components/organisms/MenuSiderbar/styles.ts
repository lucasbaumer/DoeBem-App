import { getResponsiveSizeByPixel } from "@/utils";
import { Dimensions } from "react-native";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  modal: {
    width: 280,
    height: Dimensions.get("window").height,
    margin: 0,
    backgroundColor: theme.colors.background,
    color: theme.colors.typography.dark_gray,
  },
  menu: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: UnistylesRuntime.insets.top,
  },
  profileContainer: {
    flexDirection: "row",
    paddingBottom: 32,
  },
  profilePictureContainer: {
    paddingRight: 16,
  },
  profileTextsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  profileIconContainer: {
    justifyContent: "center",
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileName: {
    fontFamily: theme.fonts.plusJakartaSans[600],
    fontSize: getResponsiveSizeByPixel(21),
    color: theme.colors.typography.dark_gray,
  },
  profileText: {
    fontFamily: theme.fonts.plusJakartaSans[400],
    fontSize: getResponsiveSizeByPixel(17),
    color: theme.colors.typography.dark_gray,
  },
  profileFowardIcon: {
    color: theme.colors.button.blue,
    fontSize: 18,
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: theme.colors.separator,
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 15,
    gap: 25,
  },
  logosContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
  },
  logosCross: {
    fontFamily: theme.fonts.plusJakartaSans[500],
    fontSize: getResponsiveSizeByPixel(18),
    marginHorizontal: 19,
    color: theme.colors.separator,
  },
  emptyAvatarImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.separator,
    
  }
}));
