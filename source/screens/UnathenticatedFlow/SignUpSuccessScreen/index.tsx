import React from "react";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";

import { getResponsiveSizeByPixel } from "@/utils";

import { Button } from "@/components/atoms/Button";

import AccountsuccessIcon from "@/assets/images/icons/account-success-icon.svg";

import { stylesheet } from "./styles";

export default function SignUpSuccessScreen() {
  const { styles } = useStyles(stylesheet);
  const navigator = useNavigation<
    NativeStackNavigationProp<{
      SignIn: undefined;
    }>
  >();

  return (
    <View style={styles.successContainer}>
      <Text style={styles.successText}>Conta criada com sucesso!</Text>
      <View style={styles.successIcon}>
        <AccountsuccessIcon
          width={getResponsiveSizeByPixel(180)}
          height={getResponsiveSizeByPixel(180)}
        />
      </View>
      <View style={styles.PedingAccountContainer}>
        <Text style={styles.PedingAccountTextTitle}>Faça seu login para começar a fazer o bem, de forma simples!</Text>
        <View>
          <Button label="Voltar para o Login" onPress={() => navigator.navigate("SignIn")} />
        </View>
      </View>
    </View>
  );
}
