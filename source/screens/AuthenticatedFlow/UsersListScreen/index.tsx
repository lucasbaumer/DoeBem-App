import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "../ProfileScreen/styles";
import { useDonorsQuery } from "@/store/api";

export default function UsersListScreen() {
  const { styles } = useStyles(stylesheet);
  const { data: users = [], isLoading, error } = useDonorsQuery();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={styles.pageTitle}>Usuários</Text>
      {isLoading ? (
        <Text style={styles.emptyText}>Carregando...</Text>
      ) : error ? (
        <Text style={styles.emptyText}>Erro ao carregar usuários.</Text>
      ) : users.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhum usuário encontrado.
        </Text>
      ) : (
        users.map((user) => (
          <View key={user.id} style={styles.donationCard}>
            <Text style={styles.hospitalName}>{user.name}</Text>
            <Text style={styles.donationValue}>{user.email}</Text>
            <Text style={styles.donationValue}>Telefone: {user.phone || '-'}</Text>
            <Text style={styles.donationValue}>CPF: {user.cpf}</Text>
            <Text style={styles.donationValue}>Data de Nascimento: {user.dateOfBirth}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}