import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.profileCard}>
          <Text style={styles.profileName}>João Silva</Text>
          <Text style={styles.profileLabel}>Objetivo</Text>
          <Text style={styles.profileValue}>Ganho de massa muscular</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
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
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 24,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF0000",
    marginBottom: 20,
  },
  profileLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
  },
  logoutButton: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  logoutText: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "600",
  },
});
