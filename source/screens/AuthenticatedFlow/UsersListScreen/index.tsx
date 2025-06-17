import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "../ProfileScreen/styles";
import { useAppSelector } from "@/hooks";

// Supondo que exista um hook para buscar usuários, substitua pelo correto se necessário
// import { useUsersListQuery } from "@/store/api";

// Mock de dados de usuários para exemplo
const mockUsers = [
  { id: "1", name: "Pedro", email: "pedro@email.com", phone: "(41) 99999-1111", role: "Admin" },
  { id: "2", name: "Ana", email: "ana@email.com", phone: "(41) 98888-2222", role: "User" },
  { id: "3", name: "Lucas", email: "lucas@email.com", phone: "(41) 97777-3333", role: "User" },
];

export default function UsersListScreen() {
  const { styles } = useStyles(stylesheet);
  // const { data: users, isLoading, error } = useUsersListQuery(); // Use a query real se existir
  const users = mockUsers; // Remova quando usar a query real
  const isLoading = false;
  const error = undefined;

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
          </View>
        ))
      )}
    </ScrollView>
  );
}
