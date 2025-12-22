import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Text style={styles.welcome}>Bem-vindo!</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Treino do dia</Text>
          <Text style={styles.cardSubtitle}>Peito e Tríceps</Text>
          <Text style={styles.cardDescription}>
            4 exercícios • 12 séries • 45 min
          </Text>
        </View>
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
  welcome: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF0000",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#888",
  },
});
