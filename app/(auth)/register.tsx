import { Link, router } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, ToastAndroid, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { StyledSafeAreaView } from "@/components/styled/StyledSafeAreaView";
import { Picker } from "@react-native-picker/picker";

import { registerSchema, RegisterSchema } from "@/schemas/auth/register";

import { auth } from "@/lib/auth";

type Prodi = {
  label: string;
  value: string;
};

export default function RegisterScreen(): React.JSX.Element {
  const prodis: Prodi[] = [
    { label: "Informatika", value: "Informatika" },
    { label: "Sistem Informasi", value: "Sistem Informasi" },
    { label: "Teknik Komputer", value: "Teknik Komputer" },
    { label: "Teknologi Informasi", value: "Teknologi Informasi" },
    { label: "Rekayasa Perangkat Lunak", value: "Rekayasa Perangkat Lunak" },
    { label: "Komputerisasi Akuntansi", value: "Komputerisasi Akuntansi" },
    { label: "Manajemen Informatika", value: "Manajemen Informatika" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      nim: "",
      prodi: "Informatika",
      password: "",
      password_confirmation: "",
    },
  });

  const register = async (data: RegisterSchema) => {
    const response = await auth.signUp.email({
      name: data.name,
      email: data.email,
      nim: data.nim,
      prodi: data.prodi,
      password: data.password,
    });

    if (response.error) {
      ToastAndroid.show(`Gagal daftar: ${response.error.message}`, ToastAndroid.LONG);
      return;
    }

    ToastAndroid.show("Berhasil Registrasi! Silakan Login", ToastAndroid.LONG);
    router.replace("/(auth)/login");
  };

  return (
    <StyledSafeAreaView className="flex-1 p-6 pt-[60px] bg-white">
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View className="size-20 rounded-[40px] border-2 mb-4 self-center border-blue-500" />
        <Text className="text-[22px] font-semibold text-center mb-4">Buat Akun Baru</Text>
        <View className="mb-4">
          <Text className="text-base font-medium mb-1">Nama Lengkap</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Masukkan Nama Lengkap"
                  className={`px-3 py-2.5 border rounded-lg ${
                    errors.name ? " border-red-400 bg-red-300" : " border-slate-400 bg-slate-200"
                  }`}
                />
                {errors.name && <Text className="text-red-500 mt-1 text-sm">{errors.name.message}</Text>}
              </>
            )}
          />
        </View>
        <View className="mb-4">
          <Text className="text-base font-medium mb-1">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="pake email kampus"
                  className={`px-3 py-2.5 border rounded-lg ${
                    errors.email ? " border-red-400 bg-red-300" : " border-slate-400 bg-slate-200"
                  }`}
                />
                {errors.email && <Text className="text-red-500 mt-1 text-sm">{errors.email.message}</Text>}
              </>
            )}
          />
        </View>
        <View className="mb-4">
          <Text className="text-base font-medium mb-1">NIM</Text>
          <Controller
            control={control}
            name="nim"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Masukkan NIM"
                  autoCapitalize="none"
                  className={`px-3 py-2.5 border rounded-lg ${
                    errors.nim ? " border-red-400 bg-red-300" : " border-slate-400 bg-slate-200"
                  }`}
                />
                {errors.nim && <Text className="text-red-500 mt-1 text-sm">{errors.nim.message}</Text>}
              </>
            )}
          />
        </View>
        <View className="mb-4">
          <Text className="text-base font-semibold mb-1">Program Studi</Text>
          <Controller
            control={control}
            name="prodi"
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  className={`border rounded-lg ${
                    errors.prodi ? "border-red-500 bg-red-50" : "border-slate-400 bg-slate-200"
                  }`}
                >
                  <Picker
                    mode="dialog"
                    selectedValue={value}
                    onValueChange={onChange}
                    dropdownIconColor={errors.prodi ? "#ef4444" : "#000"}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      height: 56, // biar sama tinggi dengan TextInput
                    }}
                  >
                    {prodis.map((prodi) => (
                      <Picker.Item key={prodi.value} label={prodi.label} value={prodi.value} />
                    ))}
                  </Picker>
                </View>
                {errors.prodi && <Text className="text-red-500 mt-1 text-sm">{errors.prodi.message}</Text>}
              </>
            )}
          />
        </View>
        <View className="mb-4">
          <Text className="text-base font-medium mb-1">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="********"
                  secureTextEntry
                  className={`px-3 py-2.5 border rounded-lg ${
                    errors.password ? " border-red-400 bg-red-300" : " border-slate-400 bg-slate-200"
                  }`}
                />
                {errors.password && <Text className="text-red-500 mt-1 text-sm">{errors.password.message}</Text>}
              </>
            )}
          />
        </View>
        <View className="mb-4">
          <Text className="text-base font-medium mb-1">Konfirmasi Password</Text>
          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="********"
                  secureTextEntry
                  className={`px-3 py-2.5 border rounded-lg ${
                    errors.password_confirmation ? " border-red-400 bg-red-300" : " border-slate-400 bg-slate-200"
                  }`}
                />
                {errors.password_confirmation && (
                  <Text className="text-red-500 mt-1 text-sm">{errors.password_confirmation.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <Pressable className="rounded-lg  mt-2 py-3 bg-slate-900" onPress={handleSubmit(register)}>
          <Text className="text-white text-center font-semibold text-base">Daftar</Text>
        </Pressable>
        <Link href="/(auth)/login" asChild>
          <Pressable>
            <Text className="text-center text-sm mt-3 text-blue-600 font-medium">
              Sudah Punya Akun? <Text className="font-semibold">Login</Text>
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    </StyledSafeAreaView>
  );
}
