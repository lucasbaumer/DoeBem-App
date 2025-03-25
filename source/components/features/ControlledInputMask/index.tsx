import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

import { InputMask, InputMaskProps } from "@/components/atoms/InputMask";

interface ComponentProps<T> extends Omit<InputMaskProps, "onBlur" | "onChangeText" | "value"> {
  name: Path<T>;
  control: Control<T>;
}

export function ControlledInputMask<T extends FieldValues>({
  name,
  control,
  ...inputProps
}: ComponentProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <InputMask {...inputProps} onBlur={onBlur} onChangeText={onChange} value={value} />
      )}
    />
  );
}
