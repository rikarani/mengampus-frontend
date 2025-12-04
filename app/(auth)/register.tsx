import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authClient } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z.email("Email tidak valid"),
  nim: z.string().min(1, "NIM wajib diisi"),
  prodi: z.string().min(1, "Program studi wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
});

export default function RegisterScreen(): React.JSX.Element {
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      nim: "",
      prodi: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: z.infer<typeof schema>) => {
    const response = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      nim: data.nim,
      prodi: data.prodi,
    });

    if (response.error) {
      console.log("hore error", response.error);
      return;
    }

    console.log("hore tidak ada error");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Buat Akun Baru</Text>

      <View>
        <Text style={styles.label}>Nama Lengkap</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap Anda"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="email@student.ac.id"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>NIM</Text>
        <Controller
          control={control}
          name="nim"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="123456789"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>Program Studi</Text>
        <Controller
          control={control}
          name="prodi"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Informatika"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>Konfirmasi Password</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={handleSubmit(handleRegister)}
      >
        <Text style={styles.primaryButtonText}>REGISTER</Text>
      </Pressable>

      <Link href="/(auth)/login">
        <Text style={styles.bottomText}>Sudah punya akun? Login</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#2563EB",
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  label: { fontSize: 14, marginBottom: 4 },
  input: {
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
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
