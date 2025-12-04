import "../global.css";
import { useState } from "react";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(events)" />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  );
}
