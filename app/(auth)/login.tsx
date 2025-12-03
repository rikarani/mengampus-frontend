import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Picker } from "@react-native-picker/picker";

const schema = z.object({
  identifier: z.string().min(1, "Email atau NIM wajib diisi"),
  role: z.enum(["admin", "user"], "Role wajib dipilih"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function LoginScreen(): React.JSX.Element {
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: "",
      role: "user",
      password: "",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Mengampus</Text>
      <Text style={styles.subtitle}>Aplikasi Manajemen Acara Kampus</Text>

      <View>
        <Text style={styles.label}>Email / NIM</Text>
        <Controller
          control={control}
          name="identifier"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
              placeholder="Masukkan Email atau NIM"
              autoCapitalize="none"
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
              placeholder="********"
              secureTextEntry
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>Role</Text>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Mahasiswa" value="user" />
              <Picker.Item label="Admin" value="admin" />
            </Picker>
          )}
        />
      </View>

      <Pressable style={styles.primaryButton} onPress={handleSubmit((data) => console.log(data))}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </Pressable>

      <Link href="/(auth)/register">
        <Text style={styles.bottomText}>Belum punya akun? Register</Text>
      </Link>
    </SafeAreaView>
  );
}

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
