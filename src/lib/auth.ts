import * as SecureStore from "expo-secure-store";

import { API_HOST } from "@/constants";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

import { expoClient } from "@better-auth/expo/client";

export const auth = createAuthClient({
  baseURL: API_HOST,
  plugins: [
    expoClient({
      scheme: "mengampus",
      storagePrefix: "mengampus-auth-",
      storage: SecureStore,
    }),
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
