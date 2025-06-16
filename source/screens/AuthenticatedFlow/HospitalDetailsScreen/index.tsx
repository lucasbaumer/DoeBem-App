import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "@/components/atoms/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getResponsiveSizeByPixel } from "@/utils";
import { Button } from "@/components/atoms/Button";

// Mock de dados
const mockNews = {
  id: 1,
  title: "Campanha de Doação de Sangue",
  image: "",
  cnes: "1234567",
  cidade: "Curitiba",
  estado: "Paraná",
  phone: "(41)99999-9999",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

const HospitalDetailsScreen = () => {
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const [variant, setVariant] = React.useState<
    "primary" | "secondary" | "tertiary"
  >("secondary");

  const hadleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 230) {
      setVariant("primary");
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#FFFFFF");
    } else {
      setVariant("secondary");
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("transparent");
    }
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.navigate("MainTab");
  };
  const handleDonate = () => {
    navigation.navigate("Donation", { hospital: mockNews });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        onScroll={hadleScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View
          style={[
            styles.newsDetailsHeader,
            {
              backgroundColor: "#e0e0e0",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <MaterialCommunityIcons
            name="hospital-building"
            size={90}
            color="#b0b0b0"
          />
        </View>
        <View style={styles.newsDetailsBody}>
          <Text style={styles.newsTitle}>{mockNews.title}</Text>
          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: getResponsiveSizeByPixel(16),
                color: theme.colors.typography.gray,
                marginBottom: 4,
                gap: 16,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                color={theme.colors.icon.event}
              />{" "}
              {mockNews.cidade} - {mockNews.estado}
            </Text>
            <Text
              style={{
                fontSize: getResponsiveSizeByPixel(16),
                color: theme.colors.typography.gray,
                marginBottom: 4,
              }}
            >
              <MaterialCommunityIcons
                name="office-building"
                size={16}
                color={theme.colors.icon.event}
              />{" "}
              CNES: {mockNews.cnes}
            </Text>
            <Text
              style={{
                fontSize: getResponsiveSizeByPixel(16),
                color: theme.colors.typography.gray,
              }}
            >
              <MaterialCommunityIcons
                name="phone"
                size={16}
                color={theme.colors.icon.event}
              />{" "}
              {mockNews.phone}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.typography.dark_gray,
            lineHeight: 24,
            marginHorizontal: 20,
            marginBottom: 12,
          }}
        >
          {mockNews.description}
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label={"Fazer uma doação"}
          onPress={() => handleDonate()}
          variant="secondary"
        />
      </View>
      <View style={styles.newsDetailsHeaderButtons}>
        <IconButton iconName="chevron-left" onPress={handleGoBack} />
      </View>
    </View>
  );
};
export default HospitalDetailsScreen;
