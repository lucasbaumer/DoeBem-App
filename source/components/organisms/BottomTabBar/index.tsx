import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './styles';
import { useAppSelector } from '@/hooks';


export function BottomTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const { styles, theme } = useStyles(stylesheet);

  const { user } = useAppSelector((store) => store.auth);
  
  const screenIcons = {
    Home: 'home',
    Pesquisar: 'search-web',
    Users: 'account-multiple',
    Donations: 'heart',
  };
  
  const screenLabels = {
    Home: 'Home',
    Pesquisar: 'Pesquisar',
    Users: 'Doadores',
    Donations: user?.role === 'Admin' ? 'Doações' : 'Minhas Doações',
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <LinearGradient
        colors={[
          theme.colors.gradients.tabBar.start,
          theme.colors.gradients.tabBar.end,
        ]}
        style={styles.shadow}
      />
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={onPress}
              style={styles.tab}
            >
              <View
                style={[
                  styles.activeIndicator,
                  {
                    backgroundColor: isFocused
                      ? theme.colors.typography.focused
                      : theme.colors.background,
                  },
                ]}
              />
              <Icon
                name={screenIcons[route.name]}
                size={28}
                color={theme.colors.button.primary}
              />
              <Text style={styles.tabText}>{screenLabels[route.name]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
