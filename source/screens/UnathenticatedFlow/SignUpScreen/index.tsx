import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStyles } from "react-native-unistyles";
import { Masks } from "react-native-mask-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { SignUpRequest } from "@/@types";

import { errorToast, getResponsiveSizeByPixel } from "@/utils/index";

// import { useSignUpMutation } from "@/store/api";

import { Button } from "@/components/atoms/Button";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { ControlledInput } from "@/components/features/ControlledInput";
import { ControlledInputMask } from "@/components/features/ControlledInputMask";

import { stylesheet } from "./styles";
import { useSignUpDonorMutation } from "@/store/api";

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .transform((value) => value.trim()),
  email: z
    .string()
    .email()
    .transform((value) => value.trim()),
  cpf: z.string().min(1),
  phone: z.string().min(1),
  dateOfBirth: z.string().min(1),
  password: z.string().min(1),
});

type RootStackParamList = {
  TermsOfUse: undefined;
  SignUpSuccess: undefined;
};

export default function SignUpScreen() {
  const { styles, theme } = useStyles(stylesheet);

  const navigator =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const scrollViewRef = useRef<ScrollView>(null);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const dateOfBirthInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);

  const [termAccepted, setTermAccepted] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const [signUpRequest] = useSignUpDonorMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      phone: "",
      dateOfBirth: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (form) => {
    try {
      // Inverter data de nascimento para YYYY-MM-DD
      let dateOfBirth = form.dateOfBirth;
      if (dateOfBirth && dateOfBirth.includes("/")) {
        // Espera-se DD/MM/YYYY
        const [day, month, year] = dateOfBirth.split("/");
        dateOfBirth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }
      // Garantir que todos os campos obrigatórios estejam presentes
      const formToSend = {
        name: form.name || "",
        email: form.email || "",
        cpf: form.cpf || "",
        phone: form.phone || "",
        dateOfBirth: dateOfBirth || "",
        password: form.password || "",
      };
      const result = await signUpRequest(formToSend).unwrap();
      navigator.replace("SignUpSuccess");
    } catch (error) {
      if ("data" in error) {
        setApiErrors([`${error.data.message}`]);
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      } else {
        errorToast({ message: "Erro interno no servidor." });
      }
    }
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <ErrorMessage title="Erro ao criar conta:" errors={apiErrors} />
          <View style={styles.formContainer}>
            <ControlledInput
              inputRef={nameInputRef}
              control={control}
              name="name"
              label="Nome"
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect={false}
              error={errors.name?.message}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              editable={!isSubmitting}
            />
            <ControlledInput
              inputRef={emailInputRef}
              control={control}
              name="email"
              label="E-mail"
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              error={errors.email?.message}
              returnKeyType="next"
              onSubmitEditing={() => cpfInputRef.current?.focus()}
              editable={!isSubmitting}
            />
            <ControlledInputMask
              inputRef={cpfInputRef}
              control={control}
              name="cpf"
              label="CPF"
              keyboardType="numeric"
              autoComplete="cc-number"
              error={errors.cpf?.message}
              returnKeyType="next"
              onSubmitEditing={() => phoneInputRef.current?.focus()}
              editable={!isSubmitting}
              mask={Masks.BRL_CPF}
            />
            <ControlledInputMask
              inputRef={phoneInputRef}
              control={control}
              name="phone"
              label="Telefone"
              autoComplete="tel"
              keyboardType="phone-pad"
              error={errors.phone?.message}
              returnKeyType="next"
              onSubmitEditing={() => dateOfBirthInputRef.current?.focus()}
              editable={!isSubmitting}
              mask={Masks.BRL_PHONE}
            />
            <ControlledInputMask
              inputRef={dateOfBirthInputRef}
              control={control}
              name="dateOfBirth"
              label="Data de Nascimento"
              keyboardType="numeric"
              autoComplete="birthdate-full"
              error={errors.dateOfBirth?.message}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              editable={!isSubmitting}
              mask={Masks.DATE_DDMMYYYY}
            />
            <ControlledInput
              inputRef={passwordInputRef}
              control={control}
              name="password"
              label="Senha"
              secureTextEntry
              autoComplete="new-password"
              autoCapitalize="none"
              error={errors.password?.message}
              returnKeyType="done"
              editable={!isSubmitting}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setTermAccepted(!termAccepted)}
            style={styles.termsCheckboxContainer}
            disabled={isSubmitting}
          >
            <MaterialCommunityIcons
              name={
                termAccepted
                  ? "checkbox-marked-outline"
                  : "checkbox-blank-outline"
              }
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.termsCheckboxText}>
              Concordo com os{" "}
              <Text
                onPress={() => navigator.navigate("TermsOfUse")}
                style={styles.termsCheckboxTextLink}
              >
                Termos e Condições
              </Text>
            </Text>
          </TouchableOpacity>
          <Button
            label="Cadastrar"
            onPress={onSubmit}
            isLoading={isSubmitting}
            disabled={!termAccepted}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
