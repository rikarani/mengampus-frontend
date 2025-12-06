import * as SecureStore from "expo-secure-store";

import { expoClient } from "@better-auth/expo/client";
import { adminClient, inferAdditionalFields, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { API_HOST } from "@/constants";
import { accessControl, admin, user } from "./permission";

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
    usernameClient(),
    adminClient({
      ac: accessControl,
      roles: { admin, user },
    }),
  ],
});
