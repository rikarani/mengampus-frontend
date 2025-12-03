import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/client";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://192.168.1.9:4000",
  plugins: [
    expoClient({
      scheme: "mengampus",
      storagePrefix: "mengampus-auth-",
      storage: SecureStore,
    }),
    adminClient(),
    inferAdditionalFields({
      user: {
        nim: {
          type: "string",
        },
        prodi: {
          type: "string",
        },
      },
    }),
  ],
});
