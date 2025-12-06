import "../global.css";

import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

import { router, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { HeroUINativeProvider } from "heroui-native";

import { auth } from "@/lib/auth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { data: session, isPending } = auth.useSession();

  useEffect(() => {
    if (!isPending) {
      SplashScreen.hideAsync();

      if (!session) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/dashboard/profile");
      }
    }
  }, [isPending, session]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HeroUINativeProvider>
          <Slot />
        </HeroUINativeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
