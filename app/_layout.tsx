import "../global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

import { App } from "@/components/App";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <App />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
