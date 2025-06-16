import { getResponsiveSizeByPixel } from "@/utils";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  pageTitle: {
    fontFamily: theme.fonts.plusJakartaSans[600],
    fontSize: getResponsiveSizeByPixel(26),
    color: theme.colors.typography.dark_gray,
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 30,
  },
  carousel: {
    flexDirection: "row",
  },
  carouselCard: {
    marginHorizontal: 5,
    marginBottom: 20,
    maxWidth: 370,
    width: 370,
    height: 230,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderRadius: 14, 
  },
  carouselCardImage: {
    height: 100,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  carouselTexts: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  carouselTitle: {
    fontFamily: theme.fonts.plusJakartaSans[600],
    fontSize: getResponsiveSizeByPixel(22),
  },
  carouselDate: {
    fontFamily: theme.fonts.plusJakartaSans[400],
    fontSize: getResponsiveSizeByPixel(14),
    color: theme.colors.typography.gray,
    marginBottom: 13,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.typography.light_gray,
    marginHorizontal: 4,
  },
  activeDot: {
    height: 8,
    width: 22,
    borderRadius: 38,
    backgroundColor: theme.colors.typography.light_blue,
  },
  newsContainer: {
    gap: 12,
    paddingBottom: 23,
  },
  newsCard: {
    marginHorizontal: 20,
    gap: 12
  },
  errorMessage: {
    fontSize: getResponsiveSizeByPixel(18),
    fontFamily: theme.fonts.plusJakartaSans[600],
    color: theme.colors.typography.dark_gray,
    paddingHorizontal: 20,
  },
  noNewsMessage: {
    fontSize: getResponsiveSizeByPixel(18),
    fontFamily: theme.fonts.plusJakartaSans[600],
    color: theme.colors.typography.dark_gray,
    paddingHorizontal: 20,
  },
}));
