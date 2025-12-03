import { useState, FC } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const LoginScreen: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Mengampus</Text>
      <Text style={styles.subtitle}>Aplikasi Manajemen Acara Kampus</Text>

      <Text style={styles.label}>Email / NIM</Text>
      <TextInput
        style={styles.input}
        placeholder="tes@gmail.com"
        // value={emailOrNim}
        autoCapitalize="none"
        // onChangeText={setEmailOrNim}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        // value={password}
        // onChangeText={setPassword}
      />

      <Text style={styles.label}>Role</Text>
      {/*<TouchableOpacity
            style={styles.input}
            onPress={() => setRole((prev) => (prev === "user" ? "admin" : "user"))}
          >
            <Text style={{ color: "#6B7280" }}>
              {role === "user" ? "User (Mahasiswa)" : "Admin (Panitia)"}
            </Text>
          </TouchableOpacity>*/}

      {/*<TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.bottomText}>Belum punya akun? Register</Text>
          </TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#2563EB",
    alignSelf: "center",
    marginBottom: 24,
  },
  title: { fontSize: 24, fontWeight: "600", textAlign: "center" },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 32,
  },
  label: { fontSize: 14, marginBottom: 4 },
  input: {
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
  bottomText: { textAlign: "center", marginTop: 16 },
});

export default LoginScreen;
