import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// Dados mockados de refeições
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

export default function Dieta() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Text style={styles.title}>Dieta</Text>

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
    marginBottom: 24,
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
