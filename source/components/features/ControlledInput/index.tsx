import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

import { Input } from "@/components/atoms/Input";
import { InputProps } from "@/components/atoms/Input";  

interface ComponentProps<T> extends Omit<InputProps, "onBlur" | "onChangeText" | "value"> {
  name: Path<T>;
  control: Control<T>;
}

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  ...inputProps
}: ComponentProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input {...inputProps} onBlur={onBlur} onChangeText={onChange} value={value} />
      )}
    />
  );
}
