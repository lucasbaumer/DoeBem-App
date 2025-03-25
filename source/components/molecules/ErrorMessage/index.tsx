import React from "react";
import { View, Text } from "react-native";
import { useStyles } from "react-native-unistyles";

import { stylesheet } from "./styles";

interface ErrorMessageProps {
  title: string;
  errors: string[];
}

export const ErrorMessage = ({ title, errors }: ErrorMessageProps) => {
  const { styles } = useStyles(stylesheet);

  if (errors.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {errors.map((error, index) => (
        <Text key={index.toString()} style={styles.message}>
          - {error}
        </Text>
      ))}
    </View>
  );
};
