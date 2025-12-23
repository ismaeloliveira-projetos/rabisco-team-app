import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <Text style={styles.title}>Acesse a plataforma</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.highlight}></Text>
        </Text>

        {/* Progress */}
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {/* CTA */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => router.replace("/(auth)/loginclient")}
        >
          <Text style={styles.primaryText}>Entrar</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.line} />
        </View>

        {/* Login */}
        <TouchableOpacity onPress={() => router.replace("/(auth)/register")}>
          <Text style={styles.loginText}>
            Ainda não é assinante?{" "}
            <Text style={styles.loginLink}>Cadastre-se →</Text>
          </Text>
        </TouchableOpacity>
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

  /* Header */
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#AAA",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  highlight: {
    color: "#DC2626",
    fontWeight: "700",
  },

  /* Progress */
  progressBar: {
    height: 6,
    backgroundColor: "#222",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 28,
  },
  progressFill: {
    width: "33%",
    height: "100%",
    backgroundColor: "#DC2626",
  },

  /* Form */
  field: {
    marginBottom: 16,
  },
  label: {
    color: "#AAA",
    fontSize: 13,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#FFF",
    fontSize: 15,
  },

  /* CTA */
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

  /* Divider */
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
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

  /* Login */
  loginText: {
    color: "#AAA",
    fontSize: 14,
    textAlign: "center",
  },
  loginLink: {
    color: "#DC2626",
    fontWeight: "600",
  },

  /* Footer */
  footer: {
    marginTop: 24,
    color: "#555",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  footerLink: {
    color: "#777",
    textDecorationLine: "underline",
  },
});
