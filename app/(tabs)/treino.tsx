import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

// Dados mockados de exercícios
const exerciciosMock = [
  { id: 1, nome: "Supino Reto", series: 4, repeticoes: 12 },
  { id: 2, nome: "Supino Inclinado", series: 3, repeticoes: 10 },
  { id: 3, nome: "Tríceps Pulley", series: 3, repeticoes: 15 },
  { id: 4, nome: "Tríceps Francês", series: 3, repeticoes: 12 },
];

type Exercicio = {
  id: number;
  nome: string;
  series: number;
  repeticoes: number;
  concluido: boolean;
};

export default function Treino() {
  const [exercicios, setExercicios] = useState<Exercicio[]>(
    exerciciosMock.map((ex) => ({
      ...ex,
      concluido: false,
    }))
  );

  const concluirExercicio = (id: number) => {
    setExercicios((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, concluido: true } : ex))
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Text style={styles.title}>Treino</Text>

        {exercicios.map((exercicio) => (
          <View
            key={exercicio.id}
            style={[
              styles.exercicioCard,
              exercicio.concluido && styles.cardConcluido,
            ]}
          >
            <View style={styles.exercicioInfo}>
              <Text
                style={[
                  styles.exercicioNome,
                  exercicio.concluido && styles.textConcluido,
                ]}
              >
                {exercicio.nome}
              </Text>

              <Text
                style={[
                  styles.exercicioDetalhes,
                  exercicio.concluido && styles.textConcluido,
                ]}
              >
                {exercicio.series} séries x {exercicio.repeticoes} repetições
              </Text>
            </View>

            {!exercicio.concluido ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => concluirExercicio(exercicio.id)}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Concluir exercício</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.doneText}>✔ Exercício concluído</Text>
            )}
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
  exercicioCard: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  exercicioInfo: {
    marginBottom: 12,
  },
  exercicioNome: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF0000",
    marginBottom: 4,
  },
  exercicioDetalhes: {
    fontSize: 14,
    color: "#888",
  },
  button: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  cardConcluido: {
    opacity: 0.6,
  },
  textConcluido: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  doneText: {
    color: "#00FF00",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
