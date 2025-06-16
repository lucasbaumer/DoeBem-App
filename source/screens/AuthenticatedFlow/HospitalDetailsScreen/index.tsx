import React from "react";
import { View, Text, ScrollView, StatusBar, Platform } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IconButton } from "@/components/atoms/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getResponsiveSizeByPixel } from "@/utils";
import { Button } from "@/components/atoms/Button";
import { useHospitalDetailsQuery } from "@/store/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Hospital } from "@/@types/queries/HospitalListResponse";

const HospitalDetailsScreen = () => {
  const navigation = useNavigation<
    NativeStackNavigationProp<{
      Donation: { hospital: Hospital };
      MainTab: undefined;
    }>
  >();
  const { styles, theme } = useStyles(stylesheet);
  const route = useRoute();
  const { hospitalId } = route.params as { hospitalId: string };
  const {
    data: hospital,
    isLoading,
    error,
  } = useHospitalDetailsQuery(hospitalId);
  const [variant, setVariant] = React.useState<
    "primary" | "secondary" | "tertiary"
  >("secondary");

  const hadleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 230) {
      setVariant("primary");
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("#FFFFFF");
    } else {
      setVariant("secondary");
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    }
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.navigate("MainTab");
  };
  const handleDonate = () => {
    navigation.navigate("Donation", { hospital });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }
  if (error || !hospital) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Erro ao carregar hospital.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
          <Text style={styles.newsTitle}>{hospital.name}</Text>
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
              {hospital.city} - {hospital.state}
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
              />
              CNES: {hospital.cnes}
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
              {hospital.phone}
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
          {hospital.description}
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
