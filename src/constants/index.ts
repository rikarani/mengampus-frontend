import { Platform } from "react-native";

export const API_HOST = Platform.select({
  android: `http://${process.env.EXPO_PUBLIC_API_HOST}:4000`,
});
