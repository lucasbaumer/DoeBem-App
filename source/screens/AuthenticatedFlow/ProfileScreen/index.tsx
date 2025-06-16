import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";

// Mock de doações do usuário
const mockDonations = [
  {
    id: 1,
    hospital: "Hospital IPO",
    value: 100,
    date: "2025-06-10",
  },
  {
    id: 2,
    hospital: "Hospital X",
    value: 50,
    date: "2025-06-12",
  },
  {
    id: 3,
    hospital: "Hospital Y",
    value: 75,
    date: "2025-06-15",
  },
];

export default function ProfileScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.pageTitle}>Minhas Doações</Text>
      {mockDonations.length === 0 ? (
        <Text style={styles.emptyText}>Você ainda não realizou nenhuma doação.</Text>
      ) : (
        mockDonations.map((donation) => (
          <View key={donation.id} style={styles.donationCard}>
            <Text style={styles.hospitalName}>{donation.hospital}</Text>
            <Text style={styles.donationValue}>Valor: R$ {donation.value.toFixed(2)}</Text>
            <Text style={styles.donationDate}>Data: {donation.date}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
