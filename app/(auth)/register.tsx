import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = () => {
    // Mock: após registro, voltar para login
    router.replace("/(auth)/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.content}>
        {/* Logo */}
        <Text style={styles.logo}>Rabisco</Text>
        <Text style={styles.brand}>Team</Text>

        {/* Formulário */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#666"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#666"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#666"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.85}
          >
            <Text style={styles.backText}>Voltar para login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FF0000",
    letterSpacing: 1,
    marginBottom: 8,
  },
  brand: {
    fontSize: 20,
    color: "#888",
    marginBottom: 48,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  form: {
    width: "100%",
    gap: 16,
  },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#FFF",
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  primaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  backText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },
});
