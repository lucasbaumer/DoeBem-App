import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useStyles } from "react-native-unistyles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Icon from "@expo/vector-icons/Ionicons";
import { Button } from "@/components/atoms/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { stylesheet } from "./styles";
import { IconButton } from "@/components/atoms/IconButton";
import { ControlledInputMask } from "@/components/features/ControlledInputMask";
import { Masks } from "react-native-mask-input";
import { useAccountDetailsQuery, useDonationMutation } from "@/store/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "@/hooks";
import Modal from "react-native-modal";

const formSchema = z.object({
  value: z.string().min(1, "Informe um valor"),
});

type RootStackParamList = {
  MainTab: undefined;
  Donation: { hospital: any };
};

export default function DonationScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { hospital } = route.params as any;

  const { user } = useAppSelector((store) => store.auth);

  // const { data: accountData } = useAccountDetailsQuery();

  const [donate, { isLoading: isDonating }] = useDonationMutation();
  const [isModalVisible, setModalVisible] = React.useState(false);

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
    if (!user || !hospital) return;
    try {
      const result = await donate({
        value: Number(
          form.value.replace("R$ ", "").replace(/\./g, "").replace(/,/g, ".")
        ),
        date: new Date().toISOString().slice(0, 10),
        donorId: user.id,
        hospitalId: hospital.id,
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao realizar doação:", error);
    }
  });

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.navigate("MainTab");
  };

  return (
    <View style={{ flex: 1 }}>
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
              {hospital.name}
            </Text>
            <View style={styles.DateContainer}>
              <View style={styles.additionalInformationContainer}>
                <Icon
                  name="pin-outline"
                  size={16}
                  color={theme.colors.icon.event}
                />
                <Text style={styles.additionalInformationText}>
                  {hospital.city} - {hospital.state}
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
          <ControlledInputMask
            control={control}
            name="value"
            label="Valor da Doação (R$)"
            keyboardType="numeric"
            error={errors.value?.message}
            editable={!isSubmitting}
            mask={Masks.BRL_CURRENCY}
          />
          <Button label="Doar" onPress={onSubmit} isLoading={isSubmitting} />
        </View>
      </ScrollView>
      <View style={styles.newsDetailsHeaderButtons}>
        <IconButton iconName="chevron-left" onPress={handleGoBack} />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 24,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={64}
            color={"#4BB543"}
            style={{ marginBottom: 16 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 12,
              textAlign: "center",
              fontFamily: theme.fonts.plusJakartaSans[600],
              color: theme.colors.typography.light,
            }}
          >
            Obrigado pela sua doação!
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#555",
              marginBottom: 24,
              textAlign: "center",
              fontFamily: theme.fonts.plusJakartaSans[400],
              color: theme.colors.typography.dark_gray,
            }}
          >
            Sua contribuição faz a diferença. A equipe do hospital agradece!
          </Text>
          <Button
            label="Voltar para Home"
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("MainTab");
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
