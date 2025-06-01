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

import {
  errorToast,
  getResponsiveSizeByPixel,
  PersonalizedMasks,
} from "@/utils/index";

// import { useSignUpMutation } from "@/store/api";

import { Button } from "@/components/atoms/Button";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { ControlledInput } from "@/components/features/ControlledInput";
import { ControlledInputMask } from "@/components/features/ControlledInputMask";

import { stylesheet } from "./styles";

const formSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .transform((value) => value.trim()),
    email: z
      .string()
      .email()
      .transform((value) => value.trim()),
    password: z.string().min(1),
    password_confirmation: z.string().min(1),
    cellphone: z.string().min(1),
    document: z.string().min(1),
    contact_person_name: z.string().min(1),
    contact_person_cellphone: z.string().min(1),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: "As senhas devem corresponder.",
    path: ["password_confirmation"],
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
  const cpfInputRef = useRef<TextInput>(null);
  const contactNameRef = useRef<TextInput>(null);
  const contactPhone = useRef<TextInput>(null);

  const [termAccepted, setTermAccepted] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  // const [signUpRequest] = useSignUpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      cellphone: "",
      document: "",
      contact_person_name: "",
      contact_person_cellphone: "",
    },
  });

  const onSubmit = handleSubmit(async (form) => {
    try {
      // await signUpRequest(form).unwrap();

      navigator.replace("SignUpSuccess");
    } catch (error) {
      if ("data" in error) {
        setApiErrors(error.data.errors);

        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      } else {
        errorToast({
          message: "Erro interno no servidor.",
        });
      }
    }
  });

  const [formType, setFormType] = useState("donor");

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <ErrorMessage title="Erro ao criar conta:" errors={apiErrors} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: theme.colors.divider,
              borderBottomWidth: 1,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 10,
                backgroundColor:
                  formType === "donor"
                    ? "rgba(58, 0, 229, 0.1)"
                    : "transparent",
                borderBottomWidth: formType === "donor" ? 2 : 0,
                borderBottomColor:
                  formType === "donor" ? "#3A00E5" : "transparent",
              }}
              onPress={() => setFormType("donor")}
            >
              <Text
                style={{
                  fontSize: getResponsiveSizeByPixel(16),
                  fontFamily: theme.fonts.plusJakartaSans[400],
                }}
              >
                Doador
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 10,
                backgroundColor:
                  formType === "hospital"
                    ? "rgba(58, 0, 229, 0.1)"
                    : "transparent",
                borderBottomWidth: formType === "hospital" ? 2 : 0,
                borderBottomColor:
                  formType === "hospital" ? "#3A00E5" : "transparent",
              }}
              onPress={() => setFormType("hospital")}
            >
              <Text
                style={{
                  fontSize: getResponsiveSizeByPixel(16),
                  fontFamily: theme.fonts.plusJakartaSans[400],
                }}
              >
                Hospital
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            {formType === "hospital" && (
              <>
                <ControlledInput
                  inputRef={nameInputRef}
                  control={control}
                  name="contact_person_name"
                  label="Gerente de Doações"
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect={false}
                  error={errors.contact_person_name?.message}
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
                <ControlledInput
                  inputRef={cpfInputRef}
                  control={control}
                  name="document"
                  label="CNES"
                  keyboardType="numeric"
                  autoComplete="cc-number"
                  error={errors.document?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => contactNameRef.current?.focus()}
                  editable={!isSubmitting}
                />
                <ControlledInput
                  inputRef={contactNameRef}
                  control={control}
                  name="name"
                  label="Nome da Instituição"
                  autoCapitalize="words"
                  autoComplete="organization"
                  autoCorrect={false}
                  error={errors.name?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  editable={!isSubmitting}
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
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
                  editable={!isSubmitting}
                />
                <ControlledInput
                  inputRef={confirmPasswordInputRef}
                  control={control}
                  name="password_confirmation"
                  autoComplete="password"
                  label="Confirmar senha"
                  secureTextEntry
                  autoCapitalize="none"
                  error={errors.password_confirmation?.message}
                  returnKeyType="done"
                  editable={!isSubmitting}
                />
              </>
            )}
            {formType === "donor" && (
                <>
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
                <ControlledInput
                inputRef={cpfInputRef}
                control={control}
                name="document"
                label="CPF"
                keyboardType="numeric"
                autoComplete="cc-number"
                error={errors.document?.message}
                returnKeyType="next"
                onSubmitEditing={() => contactNameRef.current?.focus()}
                editable={!isSubmitting}
                />
                <ControlledInput
                inputRef={phoneInputRef}
                control={control}
                name="cellphone"
                label="Telefone"
                autoComplete="tel"
                keyboardType="phone-pad"
                error={errors.cellphone?.message}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                editable={!isSubmitting}
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
                returnKeyType="next"
                onSubmitEditing={() =>
                confirmPasswordInputRef.current?.focus()
                }
                editable={!isSubmitting}
                />
                <ControlledInput
                inputRef={confirmPasswordInputRef}
                control={control}
                name="password_confirmation"
                autoComplete="password"
                label="Confirmar senha"
                secureTextEntry
                autoCapitalize="none"
                error={errors.password_confirmation?.message}
                returnKeyType="done"
                editable={!isSubmitting}
                />
                </>
            )}
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
