import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useStyles } from "react-native-unistyles";
import { HospitalCard } from "@/components/molecules/HospitalCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Icon from "@expo/vector-icons/Ionicons";
import { Button } from "@/components/atoms/Button";
import { ControlledInput } from "@/components/features/ControlledInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { stylesheet } from "./styles";
import { IconButton } from "@/components/atoms/IconButton";

const formSchema = z.object({
  value: z.string().min(1, "Informe um valor"),
});

export default function DonationScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const route = useRoute();
  const navigation = useNavigation();
  // Espera receber hospital por param
  const { hospital } = route.params as any;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const onSubmit = handleSubmit(async (form) => {
    // Aqui você pode implementar a lógica de doação
    // Exemplo: await donateRequest({ ...form, hospitalId: hospital.id })
    navigation.goBack();
  });

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.navigate("MainTab");
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 16, marginTop: 80 }}
      >
        <View style={styles.card}>
          <View
            style={[
              styles.Image,
              {
                backgroundColor: "#e0e0e0",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="hospital-building"
              size={48}
              color="#b0b0b0"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.Name}>
              {hospital.title}
            </Text>
            <View style={styles.DateContainer}>
              <View style={styles.additionalInformationContainer}>
                <Icon
                  name="pin-outline"
                  size={16}
                  color={theme.colors.icon.event}
                />
                <Text style={styles.additionalInformationText}>
                  {hospital.cidade} - {hospital.estado}
                </Text>
              </View>
              <View style={styles.additionalInformationContainer}>
                <Icon
                  name="business-outline"
                  size={16}
                  color={theme.colors.icon.event}
                />
                <Text style={styles.additionalInformationText}>
                  CNES: {hospital.cnes}
                </Text>
              </View>
              <View style={styles.additionalInformationContainer}>
                <Icon
                  name="call-outline"
                  size={16}
                  color={theme.colors.icon.event}
                />
                <Text style={styles.additionalInformationText}>
                  {hospital.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 24, gap: 16 }}>
          <Text style={styles.pageTitle}>Realizar Doação</Text>
          <ControlledInput
            control={control}
            name="value"
            label="Valor da Doação (R$)"
            keyboardType="numeric"
            error={errors.value?.message}
            editable={!isSubmitting}
          />
          <Button label="Doar" onPress={onSubmit} isLoading={isSubmitting} />
        </View>
      </ScrollView>
      <View style={styles.newsDetailsHeaderButtons}>
        <IconButton iconName="chevron-left"  onPress={handleGoBack} />
      </View>
    </>
  );
}
