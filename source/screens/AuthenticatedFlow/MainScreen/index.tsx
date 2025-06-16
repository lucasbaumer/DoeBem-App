import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useStyles } from "react-native-unistyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HospitalCard } from "@/components/molecules/HospitalCard";
import { useHospitalListQuery } from "@/store/api";

import { stylesheet } from "./styles";

export default function MainScreen() {
  const { styles } = useStyles(stylesheet);
  const navigator = useNavigation<
    NativeStackNavigationProp<{
      HospitalDetails: { hospitalId: string;};
    }>
  >();

  const { data : hospitals, isLoading, error } = useHospitalListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const carouselHospitals = hospitals?.slice(0, 3);
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Hospitais</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.newsContainer}
        >
          {/* Carousel mock */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={380}
            snapToAlignment="center"
            decelerationRate={"fast"}
            contentContainerStyle={styles.carousel}
          >
            {carouselHospitals?.map((hospital, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() =>
                  navigator.navigate(
                    "HospitalDetails",
                    { hospitalId: hospital.id }
                  )
                }
                style={styles.carouselCard}
              >
                <View
                  style={{
                    ...styles.carouselCardImage,
                    backgroundColor: "#e0e0e0",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="hospital-building"
                    size={70}
                    color="#b0b0b0"
                  />
                </View>
                <View style={styles.carouselTexts}>
                  <Text numberOfLines={2} style={styles.carouselTitle}>
                    {hospital.name}
                  </Text>
                  <Text numberOfLines={2} style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>{hospital.description}</Text>
                  <Text style={styles.carouselDate}>
                    {hospital.city} - {hospital.state}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.paginationContainer}>
            {hospitals?.map((_, index) => (
              <View
                key={index}
                style={[styles.paginationDot, index === 0 && styles.activeDot]}
              />
            ))}
          </View>
          {/* Lista de cards mock */}
          {hospitals?.map((item) => (
            <View style={styles.newsCard} key={item.id}>
              <HospitalCard
                Name={item.name}
                City={item.city}
                State={item.state}
                onPress={() =>
                  navigator.navigate(
                    "HospitalDetails",
                    { hospitalId: item.id }
                  )
                }
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
