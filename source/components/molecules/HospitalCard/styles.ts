import { getResponsiveSizeByPixel } from "@/utils";
import { createStyleSheet } from "react-native-unistyles";


export const stylesheet = createStyleSheet((theme) => ({
    container: {
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
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
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
}));
