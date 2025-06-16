import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "react-native-unistyles";
import Icon from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { stylesheet } from "./styles";

export interface CardProps {
  Name: string;
  City: string;
  State: string;
  onPress: () => void;
}

export function HospitalCard({
  Name,
  City,
  State,
  onPress,
}: CardProps) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={[styles.Image, { backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }]}> 
        <MaterialCommunityIcons name="hospital-building" size={48} color="#b0b0b0" />
      </View>
      <View>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.Name}>{Name}</Text>
        <View style={styles.DateContainer}>
          <View style={styles.additionalInformationContainer}>
            <Icon name="pin-outline" size={16} color={theme.colors.icon.event} />
            <Text style={styles.additionalInformationText}>{City} - {State}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
