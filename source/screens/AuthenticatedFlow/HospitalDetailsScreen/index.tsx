import React from "react";
import { View, Text, ScrollView, StatusBar, Platform } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IconButton } from "@/components/atoms/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getResponsiveSizeByPixel } from "@/utils";
import { Button } from "@/components/atoms/Button";
import { useDonationListQuery, useHospitalDetailsQuery, useHospitalDonationsQuery } from "@/store/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Hospital } from "@/@types/queries/HospitalListResponse";
import { ProgressChart } from "@/components/organisms/ProgressChart";

import { format, parseISO } from "date-fns";
import { useMemo } from "react";
import { lineDataItem } from "react-native-gifted-charts";
import { DonateListResponse, Doacao } from "@/@types/queries/DonateListResponse";


export interface UseMeasurementChartDataProps {
  data?: {
    medidas?: MeasurementData[] | null;
  };
  useDynamicScaling?: boolean; // If false, uses fixed yAxisOffset=10 and stepValue=10
}

export const useMeasurementChartData = (props: UseMeasurementChartDataProps) => {
  const { data, useDynamicScaling = true } = props;

  // maior valor do gráfico
  const maxMeasure = useMemo(() => {
    return Math.max(...(data?.medidas?.map((measure) => Number(measure.valor ?? 0)) ?? []));
  }, [data]);

  const yAxisOffset = useMemo(() => {
    if (!useDynamicScaling) return 10;

    const rawOffset = maxMeasure * 0.33;
    return Math.max(5, Math.round(rawOffset / 5) * 5);
  }, [maxMeasure, useDynamicScaling]);

  const stepValue = useMemo(() => {
    if (!useDynamicScaling) return 10;

    const targetMax = maxMeasure * 1.1;
    const range = targetMax - yAxisOffset;
    const rawStepValue = range / 4; // 4 casas do eixo y que está definido no ProgressChart

    // Arredonda para o próximo múltiplo de 5 para valores mais limpos
    return Math.max(5, Math.ceil(rawStepValue / 5) * 5);
  }, [maxMeasure, yAxisOffset, useDynamicScaling]);

  const chartData = useMemo(() => {
    const reversedMedidas = [...(data?.medidas ?? [])].reverse();

    const getItemMarginLeft = (index: number) => {
      if (index === 0) return 5;

      // For items after index 1, add the extra 20 margin to maintain consistent spacing
      return 20 * index + 20;
    };

    return reversedMedidas.map((measure, index) => {
      const item: lineDataItem = {
        value: Number(measure.valor ?? 0),
        label: measure.medido_em ? format(parseISO(measure.medido_em), "dd/MM/yy") : "",
        labelTextStyle: {
          fontSize: 13,
          color: colors.grays.gray6,
          width: 80,

          marginLeft: getItemMarginLeft(index),
          // marginRight: index > 0 && index === (data?.medidas?.length ?? 0) - 1 ? 80 : 0,
        },

        spacing: 80,
        dataPointWidth: 10,
        dataPointShape: "rectangular",
      };

      return item;
    });
  }, [data, colors]);

  return {
    maxMeasure,
    yAxisOffset,
    stepValue,
    chartData,
  };
};

const HospitalDetailsScreen = () => {
  const navigation = useNavigation<
    NativeStackNavigationProp<{
      Donation: { hospital: Hospital };
      MainTab: undefined;
    }>
  >();
  const { styles, theme } = useStyles(stylesheet);



  const route = useRoute();
  const { hospitalId } = route.params as { hospitalId: string };
  const {
    data: hospital,
    isLoading,
    error,
  } = useHospitalDetailsQuery(hospitalId);
  const { data, isLoading: isDonationsLoading } = useDonationListQuery(undefined);
  // Extrai e filtra as doações do hospital a partir do DonateListResponse
  const donationsData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    // O backend já retorna os campos no formato correto (ex: hospitalId, value, date)
    // Então basta filtrar diretamente
    return data.filter((donation) => donation.hospitalId === hospitalId);
  }, [data, hospitalId]);

  console.log("donationsData", donationsData  , );

  const [variant, setVariant] = React.useState<
    "primary" | "secondary" | "tertiary"
  >("secondary");

  const hadleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 230) {
      setVariant("primary");
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("#FFFFFF");
    } else {
      setVariant("secondary");
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    }
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.navigate("MainTab");
  };
  const handleDonate = () => {
    navigation.navigate("Donation", { hospital });
  };

  // Agrupa e formata as doações por data
  const chartData = React.useMemo(() => {
    if (!donationsData.length) return [];
    const grouped: Record<string, number> = {};
    donationsData.forEach((d) => {
      // Suporte tanto para 'data' quanto 'date' e 'valor' quanto 'value'
      const rawDate = d.data || d.date;
      const rawValue = d.valor ?? d.value ?? 0;
      if (!rawDate) return;
      const date = typeof rawDate === 'string' && rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;
      grouped[date] = (grouped[date] || 0) + rawValue;
    });
    const sortedDates = Object.keys(grouped).sort();
    return sortedDates.map((date) => ({
      value: grouped[date],
      label: date ? date.split("-").reverse().join("/") : "",
    }));
  }, [donationsData, hospitalId]);

  // Cálculo do maior valor para o gráfico
  const maxValue = useMemo(() => {
    if (!chartData.length) return 10;
    return Math.max(...chartData.map((item) => item.value));
  }, [chartData]);

  // Offset e step para o gráfico
  const yAxisOffset = useMemo(() => {
    if (!chartData.length) return 10;
    const rawOffset = maxValue * 0.33;
    return Math.max(5, Math.round(rawOffset / 5) * 5);
  }, [maxValue, chartData]);

  const stepValue = useMemo(() => {
    if (!chartData.length) return 10;
    const targetMax = maxValue * 1.1;
    const range = targetMax - yAxisOffset;
    const rawStepValue = range / 4;
    return Math.max(5, Math.ceil(rawStepValue / 5) * 5);
  }, [maxValue, yAxisOffset, chartData]);

  if (isLoading || isDonationsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }
  if (error || !hospital) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Erro ao carregar hospital.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={styles.container}
        onScroll={hadleScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View
          style={[
            styles.newsDetailsHeader,
            {
              backgroundColor: "#e0e0e0",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <MaterialCommunityIcons
            name="hospital-building"
            size={90}
            color="#b0b0b0"
          />
        </View>
        <View style={styles.newsDetailsBody}>
          <Text style={styles.newsTitle}>{hospital.name}</Text>
          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: getResponsiveSizeByPixel(16),
                color: '#515254', // gray
                marginBottom: 4,
                gap: 16,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                color="#C6C6C6" // icon.event
              />{" "}
              {hospital.city} - {hospital.state}
            </Text>
            <Text
              style={{
                fontSize: getResponsiveSizeByPixel(16),
                color: '#515254', // gray
                marginBottom: 4,
              }}
            >
              <MaterialCommunityIcons
                name="office-building"
                size={16}
                color="#C6C6C6" // icon.event
              />
              CNES: {hospital.cnes}
            </Text>
            <Text
              style={{
                fontSize: getResponsiveSizeByPixel(16),
                color: '#515254', // gray
              }}
            >
              <MaterialCommunityIcons
                name="phone"
                size={16}
                color="#C6C6C6" // icon.event
              />{" "}
              {hospital.phone}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: '#515254', // dark_gray
            lineHeight: 24,
            marginHorizontal: 20,
            marginBottom: 12,
          }}
        >
          {hospital.description}
        </Text>
        <ProgressChart
          adjustToWidth={false}
          data={chartData}
          height={220}
          yAxisOffset={yAxisOffset}
          isAnimated={true}
          color={'#61646B'}
          hideDataPoints={false}
          dataPointsColor={'#61646B'}
          initialSpacing={chartData.length < 2 ? 20 : 5}
          stepValue={stepValue}
          curved={false}
          thickness={3}
          xAxisLabelTextStyle={{ color: '#515254', fontSize: 12 }}
          yAxisTextStyle={{ color: '#7B7B7B', fontSize: 12 }}
          rulesColor={'#D7DBE7'}
          xAxisColor={'#E1E9EE'}
          yAxisColor={'#E1E9EE'}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label={"Fazer uma doação"}
          onPress={() => handleDonate()}
          variant="secondary"
        />
      </View>
      <View style={styles.newsDetailsHeaderButtons}>
        <IconButton iconName="chevron-left" onPress={handleGoBack} />
      </View>
    </View>
  );
};
export default HospitalDetailsScreen;
