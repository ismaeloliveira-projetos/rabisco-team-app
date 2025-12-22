import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  const handleSignUp = () => {
    router.push("/(auth)/register");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Logo */}
        <Text style={styles.logo}>Rabisco</Text>
        <Text style={styles.brand}>Team</Text>

        {/* Slogan */}
        <Text style={styles.slogan}>
          Treinos inteligentes. Resultados reais.
        </Text>

        {/* Ações */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignUp}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
  },
  brand: {
    fontSize: 20,
    color: "#888",
    marginBottom: 32,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  slogan: {
    fontSize: 15,
    color: "#BBB",
    textAlign: "center",
    marginBottom: 56,
    lineHeight: 22,
  },
  actions: {
    width: "100%",
    gap: 14,
  },
  primaryButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  secondaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
