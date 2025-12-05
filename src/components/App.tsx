import { Stack } from "expo-router";
import { FC } from "react";

import { useAuth } from "@/hooks/useAuth";

export const App: FC = () => {
  const { token } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!token}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
      </Stack.Protected>

      <Stack.Protected guard={!!token}>
        <Stack.Screen name="dashboard/index" />
      </Stack.Protected>
    </Stack>
  );
};
