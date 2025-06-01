import { createStyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { Platform } from 'react-native';
import { getResponsiveSizeByPixel } from '@/utils';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabText: {
    color: theme.colors.typography.tabBar,
    fontSize: getResponsiveSizeByPixel(14),
    fontFamily: theme.fonts.plusJakartaSans[700],
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:
      Platform.OS == 'android' ? UnistylesRuntime.insets.bottom : 0,
  },
  activeIndicator: {
    width: 55,
    height: 7,
    marginBottom: 14,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  shadow: {
    position: 'absolute',
    height: 10,
    top: -10,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
}));
