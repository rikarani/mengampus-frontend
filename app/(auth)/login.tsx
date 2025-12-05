import { Pressable, Text, TextInput, View } from "react-native";

import { Link } from "expo-router";
import { API_HOST } from "@/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Picker } from "@react-native-picker/picker";
import { loginSchema } from "@/schemas/auth/login";

import { StyledSafeAreaView } from "@/components/styled/StyledSafeAreaView";

export default function LoginScreen(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nim: "",
      password: "",
      role: "user",
    },
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    const response = await fetch(`${API_HOST}`);

    const result = await response.json();
    console.log({ result });
  };

  return (
    <StyledSafeAreaView className="flex-1 p-6 justify-center bg-white">
      <View className="size-[90px] border-2 rounded-[45px] mb-6 border-blue-500 self-center" />
      <Text className="text-2xl font-semibold text-center">Mengampus</Text>
      <Text className="text-sm text-center mb-8 text-slate-500">Aplikasi Manajemen Acara Kampus</Text>
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
                className={`px-3 py-2.5 border rounded-lg ${errors.nim ? " border-red-400 bg-red-300" : " border-slate-400 bg-slate-200"}`}
              />
              {errors.nim && <Text className="text-red-500 mt-1 text-sm">{errors.nim.message}</Text>}
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
                className={`px-3 py-2.5 border rounded-lg ${errors.password ? " border-red-400 bg-red-300" : " border-slate-400 bg-slate-200"}`}
              />
              {errors.password && <Text className="text-red-500 mt-1 text-sm">{errors.password.message}</Text>}
            </>
          )}
        />
      </View>
      <View className="mb-4">
        <Text className="text-base font-semibold mb-1">Role</Text>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <>
              <View
                className={`border rounded-lg ${errors.role ? "border-red-500 bg-red-50" : "border-slate-400 bg-slate-200"}`}
              >
                <Picker
                  mode="dialog"
                  selectedValue={value}
                  onValueChange={onChange}
                  dropdownIconColor={errors.role ? "#ef4444" : "#000"}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    height: 56, // biar sama tinggi dengan TextInput
                  }}
                >
                  <Picker.Item label="Mahasiswa" value="user" />
                  <Picker.Item label="Admin" value="admin" />
                </Picker>
              </View>
              {errors.role && <Text className="text-red-500 mt-1 text-sm">{errors.role.message}</Text>}
            </>
          )}
        />
      </View>
      <Pressable onPress={handleSubmit(handleLogin)} className="bg-slate-900 rounded-lg py-3 items-center">
        <Text className="text-white font-semibold text-base">Login</Text>
      </Pressable>
      <Link href="/(auth)/register" asChild>
        <Pressable>
          <Text className="text-center text-sm mt-3 text-blue-600 font-medium">
            Belum punya akun? <Text className="font-semibold">Register</Text>
          </Text>
        </Pressable>
      </Link>
      <Link href="/(events)" asChild>
        <Pressable>
          <Text className="text-center text-sm mt-1 text-slate-600">gas liat list event</Text>
        </Pressable>
      </Link>
    </StyledSafeAreaView>
  );
}
