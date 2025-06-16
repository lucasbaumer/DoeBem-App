import React, { useRef } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStyles } from "react-native-unistyles";
import { useForm } from "react-hook-form";

import { z } from "../../../config/zod";

import { errorToast, getResponsiveSizeByPixel } from "@/utils/index";

// import { useAppDispatch } from "@/hooks";

// import { useLazyAccountDetailsQuery, useSignInMutation } from "@/store/api";
// import { setToken, setUser } from "@/store/reducers/authSlice";

import { Button } from "@/components/atoms/Button";
import { KeyboardView } from "@/components/atoms/KeyboardView";
import { ControlledInput } from "@/components/features/ControlledInput";

import Logo from "@/assets/images/main-logo.svg";

import { stylesheet } from "./styles";
import { useSignInMutation } from "@/store/api";
import { useAppDispatch } from "@/hooks";
import { setToken } from "@/store/reducers/authSlice";

type RootStackParamList = {
  ForgotPassword: undefined;
  SignUp: undefined;
  TermsOfUse: undefined;
  PendingAccount: undefined;
  Main: undefined;
  MainTab: undefined;
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default function SignInScreen() {
  const { styles } = useStyles(stylesheet);

  const passwordInputRef = useRef<TextInput>(null);

  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [signInRequest] = useSignInMutation();
  // const [accountDetailsRequest] = useLazyAccountDetailsQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleGoToForgotPasswordScreen() {
    reset();

    navigator.navigate("ForgotPassword");
  }

  function handleGoToSignUpScreen() {
    reset();

    navigator.navigate("SignUp");
  }

  function handleGoToTermsOfUseScreen() {
    reset();

    navigator.navigate("TermsOfUse");
  }

  function handleGoToPendingAccountScreen() {
    reset();

    navigator.navigate("PendingAccount");
  }

  const onSubmit = handleSubmit(async (form: { email: string; password: string }) => {
    try {
      const delay = (delayInms: number) => {
      return new Promise((resolve) => setTimeout(resolve, delayInms));
    };
      const signInResponse = await signInRequest(form).unwrap();
      dispatch(setToken(signInResponse.token));
      console.log("signInResponse", signInResponse);
      await delay(1000);
      // const accountDetailsResponse = await accountDetailsRequest().unwrap();
      // dispatch(setUser(accountDetailsResponse));
      navigator.navigate("MainTab");
    } catch (error) {
      if ("data" in error) {
        if (error.status === 403) {
          return handleGoToPendingAccountScreen();
        }

        errorToast({ message: error.data.errors[0] });
      } else {
        errorToast({ message: "Erro interno no servidor." });
      }
    }
  });

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <KeyboardView>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.logoContainer}>
            <Logo
              width={getResponsiveSizeByPixel(150)}
              height={getResponsiveSizeByPixel(150)}
            />
          </View>

          <View>
            <Text style={styles.pageTitle}>Entrar</Text>

            <View style={styles.formContainer}>
              <ControlledInput
                control={control}
                name="email"
                label="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                returnKeyType="next"
                editable={!isSubmitting}
                error={errors.email?.message}
                onSubmitEditing={() => passwordInputRef.current.focus()}
              />

              <ControlledInput
                inputRef={passwordInputRef}
                control={control}
                name="password"
                label="Senha"
                autoComplete="current-password"
                secureTextEntry
                editable={!isSubmitting}
                error={errors.password?.message}
                onSubmitEditing={onSubmit}
              />
            </View>

            <TouchableOpacity
              onPress={handleGoToForgotPasswordScreen}
              activeOpacity={0.7}
              style={styles.forgotPasswordButton}
            >
              <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Button label="Entrar" onPress={onSubmit} isLoading={isSubmitting} />
            </View>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Ainda não tem uma conta?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={handleGoToSignUpScreen}>
              <Text style={styles.signUpButtonText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.termOfUseContainer}>
            <Text style={styles.termOfUseText}>Ao entrar, você concorda com nossos</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.termOfUseLink} onPress={handleGoToTermsOfUseScreen}>
                Termos e Condições e Política de Privacidade.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardView>
    </SafeAreaView>
  );
}
