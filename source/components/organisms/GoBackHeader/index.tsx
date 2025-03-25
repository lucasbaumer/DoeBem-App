import { View, Text } from "react-native";
import { useStyles } from "react-native-unistyles";

import { IconButton } from "@/components/atoms/IconButton";

import { stylesheet } from "./styles";

interface GobackHeaderProps {
  label: string;
}

export function GoBackHeader({ label }: GobackHeaderProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.headerSideItem}>
        <IconButton iconName="chevron-left" />
      </View>
      <View style={styles.headerCenterItem}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.headerSideItem} />
    </View>
  );
}
