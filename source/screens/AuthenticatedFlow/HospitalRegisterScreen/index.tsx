import React, { useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useStyles } from "react-native-unistyles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { stylesheet } from "./styles";
import { useHospitalMutation } from "@/store/api";
import { Button } from "@/components/atoms/Button";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { ControlledInput } from "@/components/features/ControlledInput";
import { ControlledInputMask } from "@/components/features/ControlledInputMask";
import { Masks } from "react-native-mask-input";

const formSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  cnes: z.string().min(1, "CNES obrigatório"),
  state: z.string().min(1, "Estado obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  phone: z.string().min(1, "Telefone obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
});

export default function HospitalRegisterScreen() {
  const { styles } = useStyles(stylesheet);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [registerHospital, { isLoading, isSuccess, error }] = useHospitalMutation();

  const nameInputRef = useRef<TextInput>(null);
  const cnesInputRef = useRef<TextInput>(null);
  const stateInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cnes: "",
      state: "",
      city: "",
      phone: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (form) => {
    try {
      await registerHospital({
        name: form.name,
        cnes: Number(form.cnes),
        state: form.state,
        city: form.city,
        phone: form.phone,
        description: form.description,
      }).unwrap();
      reset();
      setApiErrors([]);
    } catch (err) {
      setApiErrors(["Erro ao cadastrar hospital."]);
    }
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          {/* <Text style={styles.pageTitle}>Cadastro de Hospital</Text> */}
          <ErrorMessage title="Erro ao cadastrar hospital:" errors={apiErrors} />
          <View style={styles.formContainer}>
            <ControlledInput
              inputRef={nameInputRef}
              control={control}
              name="name"
              label="Nome do hospital"
              autoCapitalize="words"
              error={errors.name?.message}
              returnKeyType="next"
              onSubmitEditing={() => cnesInputRef.current?.focus()}
              editable={!isSubmitting}
            />
            <ControlledInput
              inputRef={cnesInputRef}
              control={control}
              name="cnes"
              label="CNES"
              keyboardType="numeric"
              error={errors.cnes?.message}
              returnKeyType="next"
              onSubmitEditing={() => stateInputRef.current?.focus()}
              editable={!isSubmitting}
            />
            <ControlledInput
              inputRef={stateInputRef}
              control={control}
              name="state"
              label="Estado"
              autoCapitalize="characters"
              error={errors.state?.message}
              returnKeyType="next"
              onSubmitEditing={() => cityInputRef.current?.focus()}
              editable={!isSubmitting}
            />
            <ControlledInput
              inputRef={cityInputRef}
              control={control}
              name="city"
              label="Cidade"
              autoCapitalize="words"
              error={errors.city?.message}
              returnKeyType="next"
              onSubmitEditing={() => phoneInputRef.current?.focus()}
              editable={!isSubmitting}
            />
            <ControlledInputMask
              inputRef={phoneInputRef}
              control={control}
              name="phone"
              label="Telefone"
              keyboardType="phone-pad"
              error={errors.phone?.message}
              returnKeyType="next"
              onSubmitEditing={() => descriptionInputRef.current?.focus()}
              editable={!isSubmitting}
              mask={Masks.BRL_PHONE}
            />
            <ControlledInput
              inputRef={descriptionInputRef}
              control={control}
              name="description"
              label="Descrição"
              multiline
              error={errors.description?.message}
              returnKeyType="done"
              editable={!isSubmitting}
            />
          </View>
          <Button
            label="Cadastrar"
            onPress={onSubmit}
            isLoading={isSubmitting || isLoading}
          />
          {isSuccess && (
            <Text style={styles.successText}>Hospital cadastrado com sucesso!</Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}