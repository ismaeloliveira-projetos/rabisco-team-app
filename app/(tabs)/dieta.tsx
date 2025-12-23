import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

// ================= DADOS MOCK =================

const resumoDieta = {
  calorias: 2450,
};

const refeicoes = [
  {
    id: 1,
    horario: "07:00",
    nome: "Café da manhã",
    descricao: "Aveia, banana e whey protein",
  },
  {
    id: 2,
    horario: "10:00",
    nome: "Lanche da manhã",
    descricao: "Maçã e castanhas",
  },
  {
    id: 3,
    horario: "13:00",
    nome: "Almoço",
    descricao: "Arroz, frango grelhado e salada",
  },
  {
    id: 4,
    horario: "16:00",
    nome: "Pré-treino",
    descricao: "Banana e café",
  },
  {
    id: 5,
    horario: "19:00",
    nome: "Jantar",
    descricao: "Batata doce, peixe e legumes",
  },
];

const lembretesMock = [
  { id: 1, texto: "Tomar creatina", feito: false },
  { id: 2, texto: "Beber 500ml de água", feito: false },
];

// ================= COMPONENT =================

export default function Dieta() {
  const [lembretes, setLembretes] = useState(lembretesMock);

  const concluirLembrete = (id: number) => {
    setLembretes((prev) =>
      prev.map((l) => (l.id === id ? { ...l, feito: true } : l))
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Text style={styles.title}>Dieta</Text>

        {/* ===== DASHBOARD ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Calorias do dia</Text>
          <Text style={styles.calorias}>{resumoDieta.calorias} kcal</Text>
        </View>

        {/* ===== LEMBRETES ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lembretes</Text>

          {lembretes.map((lembrete) => (
            <View
              key={lembrete.id}
              style={[styles.lembrete, lembrete.feito && styles.lembreteFeito]}
            >
              <Text
                style={[
                  styles.lembreteText,
                  lembrete.feito && styles.textFeito,
                ]}
              >
                {lembrete.texto}
              </Text>

              {!lembrete.feito && (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => concluirLembrete(lembrete.id)}
                >
                  <Text style={styles.btnText}>OK</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* ===== REFEIÇÕES ===== */}
        <Text style={styles.sectionTitle}>Refeições</Text>

        {refeicoes.map((refeicao) => (
          <View key={refeicao.id} style={styles.refeicaoCard}>
            <View style={styles.refeicaoHeader}>
              <Text style={styles.horario}>{refeicao.horario}</Text>
              <Text style={styles.refeicaoNome}>{refeicao.nome}</Text>
            </View>
            <Text style={styles.descricao}>{refeicao.descricao}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardTitle: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  calorias: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "700",
  },
  lembrete: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  lembreteFeito: {
    opacity: 0.5,
  },
  lembreteText: {
    color: "#FFF",
    fontSize: 14,
  },
  textFeito: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  btn: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
  },
  refeicaoCard: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  refeicaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  horario: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF0000",
  },
  refeicaoNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  descricao: {
    fontSize: 14,
    color: "#888",
    lineHeight: 20,
  },
});
