import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useStyles } from "react-native-unistyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HospitalCard } from "@/components/molecules/HospitalCard";

import { stylesheet } from "./styles";

// Mock de hospitais
const mockHospitals = [
  {
    id: 1,
    nome: "Hospital IPO",
    cnes: "1234567",
    estado: "Paraná",
    cidade: "Curitiba",
    phone: "(41)99999-9999",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    nome: "Hospital X",
    cnes: "1234567",
    estado: "Paraná",
    cidade: "Curitiba",
    phone: "(41)99999-9999",
    descricao: "Descrição",
  },
  {
    id: 3,
    nome: "Hospital Y",
    cnes: "1234567",
    estado: "Paraná",
    cidade: "Curitiba",
    phone: "(41)99999-9999",
    descricao: "Descrição",
  },
];

export default function MainScreen() {
  const { styles } = useStyles(stylesheet);
  const navigator = useNavigation<
    NativeStackNavigationProp<{
      HospitalDetails: { newsId: number; external?: boolean };
    }>
  >();

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
            {mockHospitals.map((hospital, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() =>
                  navigator.navigate(
                    "HospitalDetails",
                    { newsId: hospital.id }
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
                    {hospital.nome}
                  </Text>
                  <Text numberOfLines={2} style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>{hospital.descricao}</Text>
                  <Text style={styles.carouselDate}>
                    {hospital.cidade} - {hospital.estado}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.paginationContainer}>
            {mockHospitals.map((_, index) => (
              <View
                key={index}
                style={[styles.paginationDot, index === 0 && styles.activeDot]}
              />
            ))}
          </View>
          {/* Lista de cards mock */}
          {mockHospitals.map((item) => (
            <View style={styles.newsCard} key={item.id}>
              <HospitalCard
                Name={item.nome}
                City={item.cidade}
                State={item.estado}
                Description={item.descricao}
                onPress={() =>
                  navigator.navigate(
                    "HospitalDetails",
                    { newsId: item.id }
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
