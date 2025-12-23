import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Rabisco</Text>
          <Text style={styles.brand}>Team</Text>
        </View>

        {/* Headline */}
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Escolha como deseja acessar</Text>

        {/* CTA PROFISSIONAL */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => router.replace("/(auth)/loginmaster")}
        >
          <Text style={styles.primaryText}>Área do Profissional</Text>
        </TouchableOpacity>

        {/* CTA ALUNO */}
        <TouchableOpacity
          style={styles.secondaryMainButton}
          activeOpacity={0.85}
          onPress={() => router.push("/(auth)/loginclient")}
        >
          <Text style={styles.secondaryMainText}>Área do Aluno</Text>
        </TouchableOpacity>

        {/* Cadastro */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.signupLink}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.line} />
        </View>

        {/* Download App */}
        <Text style={styles.downloadTitle}>Baixar App do Aluno</Text>

        <View style={styles.storeButtons}>
          <TouchableOpacity style={styles.storeButton}>
            <Ionicons name="logo-apple" size={20} color="#FFF" />
            <Text style={styles.storeText}>iOS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.storeButton}>
            <Ionicons name="logo-google-playstore" size={20} color="#FFF" />
            <Text style={styles.storeText}>Android</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Ao continuar, você concorda com nossos termos.
        </Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },

  /* Logo */
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    fontSize: 42,
    color: "#DC2626",
    fontWeight: "800",
  },
  brand: {
    fontSize: 16,
    color: "#888",
    letterSpacing: 4,
    textTransform: "uppercase",
    marginTop: 2,
  },

  /* Text */
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#AAA",
    textAlign: "center",
    marginBottom: 24,
  },

  /* Inputs */
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#FFF",
    marginBottom: 14,
    fontSize: 15,
  },

  /* Buttons */
  primaryButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#DC2626",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryMainButton: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12, // 🔥 espaçamento entre os botões
    borderWidth: 1,
    borderColor: "#333",
  },
  secondaryMainText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },

  /* Signup */
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  signupText: {
    color: "#AAA",
    fontSize: 14,
  },
  signupLink: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },

  /* Divider */
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#222",
  },
  dividerText: {
    color: "#666",
    marginHorizontal: 10,
    fontSize: 13,
  },

  /* Download */
  downloadTitle: {
    textAlign: "center",
    color: "#AAA",
    fontSize: 14,
    marginBottom: 12,
  },
  storeButtons: {
    flexDirection: "row",
    gap: 12,
  },
  storeButton: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#222",
  },
  storeText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },

  /* Footer */
  footer: {
    marginTop: 28,
    color: "#555",
    fontSize: 12,
    textAlign: "center",
  },
});
