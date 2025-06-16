import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";
import { useDonationListQuery, useMyDonationsQuery } from "@/store/api";
import { useAppSelector } from "@/hooks";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  const { styles } = useStyles(stylesheet);
  const { user } = useAppSelector((state) => state.auth);

  // Lógica condicional para buscar doações conforme o papel do usuário
  const isAdmin = user?.role === "Admin";
  let donations: any[] = [];
  let isLoading = false;
  let error = undefined;

  if (isAdmin) {
    // Admin: lista de todas as doações (ajuste conforme a resposta real da API)
    const {
      data: adminData,
      isLoading: adminLoading,
      error: adminError
    } = useDonationListQuery(undefined, { refetchOnMountOrArgChange: true });
    isLoading = adminLoading;
    error = adminError;
    donations = Array.isArray(adminData) ? adminData : [];
  } else {
    const {
      data: userData,
      isLoading: userLoading,
      error: userError
    } = useMyDonationsQuery(user?.id || "");
    isLoading = userLoading;
    error = userError;
    donations = userData?.donations || [];
  }

  const [selectedDonation, setSelectedDonation] = React.useState<any | null>(null);
  const [isModalVisible, setModalVisible] = React.useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={styles.pageTitle}>{user.role === "Admin"? "Doações" :  "Minhas Doações"}</Text>
      {isLoading ? (
        <Text style={styles.emptyText}>Carregando...</Text>
      ) : error ? (
        <Text style={styles.emptyText}>Erro ao carregar doações.</Text>
      ) : donations.length === 0 ? (
        <Text style={styles.emptyText}>
          Você ainda não realizou nenhuma doação.
        </Text>
      ) : (
        donations.map((donation) => (
          <TouchableOpacity
            key={donation.id}
            style={styles.donationCard}
            onPress={() => {
              setSelectedDonation(donation);
              setModalVisible(true);
            }}
          >
            <Text style={styles.hospitalName}>{donation.hospitalName || donation.nomeHospital}</Text>
            <Text style={styles.donationValue}>
              Valor: R$ {(donation.value || donation.valor).toFixed(2)}
            </Text>
            <Text style={styles.donationDate}>
              Data: {new Date(donation.date || donation.data).toLocaleDateString("pt-BR")}
            </Text>
          </TouchableOpacity>
        ))
      )}
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        {selectedDonation && (
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Detalhes da Doação</Text>
            {selectedDonation.nomeHospital || selectedDonation.hospitalName ? (
              <View style={{ marginBottom: 8, width: '100%' }}>
                <Text style={{ fontWeight: 'bold', color: '#888', fontSize: 14 }}>Hospital:</Text>
                <Text style={{ fontSize: 16, color: '#222' }}>{selectedDonation.nomeHospital || selectedDonation.hospitalName}</Text>
              </View>
            ) : null}
            {selectedDonation.nomeDoador ? (
              <View style={{ marginBottom: 8, width: '100%' }}>
                <Text style={{ fontWeight: 'bold', color: '#888', fontSize: 14 }}>Doador:</Text>
                <Text style={{ fontSize: 16, color: '#222' }}>{selectedDonation.nomeDoador}</Text>
              </View>
            ) : null}
            {selectedDonation.valor || selectedDonation.value ? (
              <View style={{ marginBottom: 8, width: '100%' }}>
                <Text style={{ fontWeight: 'bold', color: '#888', fontSize: 14 }}>Valor:</Text>
                <Text style={{ fontSize: 16, color: '#222' }}>R$ {(selectedDonation.valor || selectedDonation.value).toFixed(2)}</Text>
              </View>
            ) : null}
            {selectedDonation.data || selectedDonation.date ? (
              <View style={{ marginBottom: 8, width: '100%' }}>
                <Text style={{ fontWeight: 'bold', color: '#888', fontSize: 14 }}>Data:</Text>
                <Text style={{ fontSize: 16, color: '#222' }}>{new Date(selectedDonation.data || selectedDonation.date).toLocaleDateString('pt-BR')}</Text>
              </View>
            ) : null}
            <TouchableOpacity
              style={{ marginTop: 20, backgroundColor: '#1976d2', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </ScrollView>
  );
}
