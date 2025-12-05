import "../global.css";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function RootLayout() {
  const { token, loading } = useAuth();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/register" />

            <Stack.Protected guard={!!token}>
              <Stack.Screen name="(events)" />
            </Stack.Protected>
          </Stack>
        </GestureHandlerRootView>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
