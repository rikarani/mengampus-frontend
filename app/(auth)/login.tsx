import { Pressable, Text, TextInput, View } from "react-native";

import { Link } from "expo-router";

import { loginSchema, LoginSchema } from "@/schemas/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useToast } from "heroui-native";

import { StyledSafeAreaView } from "@/components/styled/StyledSafeAreaView";

import { auth } from "@/lib/auth";

export default function LoginScreen(): React.JSX.Element {
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nim: "",
      password: "",
      role: "user",
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    const response = await auth.signIn.username({
      username: data.nim,
      password: data.password,
    });

    if (response.error) {
      toast.show({
        variant: "danger",
        label: "Gagal login",
        description: response.error.message,
      });
      return;
    }

    toast.show({
      variant: "success",
      label: "Berhasil login",
      description: `Welcome Back, ${response.data.user.name}!`,
    });
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
    </StyledSafeAreaView>
  );
}
