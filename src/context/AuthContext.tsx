import * as SecureStore from "expo-secure-store";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { decodeJWT } from "@/lib/helper/decodeJWT";

/* ---------- Types ---------- */

type User = {
  id: string;
  name: string;
  email: string;
  nim: string;
  prodi: string;
  role: string | null;
  image: string | null;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

/* ---------- Default Context ---------- */

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

/* ---------- Provider ---------- */

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* --- Load auth state on startup --- */
  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync("authToken"),
          SecureStore.getItemAsync("authUser"),
        ]);

        // If no token → directly set loading false
        if (!storedToken) {
          setLoading(false);
          return;
        }

        // Check token expired
        const payload = decodeJWT(storedToken);

        const now = Math.floor(Date.now() / 1000);
        if (!payload || payload.exp < now) {
          // Token expired → full logout
          await logout();
          setLoading(false);
          return;
        }

        setToken(storedToken);

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            // corrupted data → force logout
            await logout();
          }
        }
      } catch (err) {
        console.error("Auth load error:", err);
        await logout();
      }

      setLoading(false);
    })();
  }, []);

  /* ---------- Login Implementation ---------- */
  const login = async (token: string, user: User) => {
    await SecureStore.setItemAsync("authToken", token);
    await SecureStore.setItemAsync("authUser", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  /* ---------- Logout Implementation ---------- */
  const logout = async () => {
    await Promise.all([SecureStore.deleteItemAsync("authToken"), SecureStore.deleteItemAsync("authUser")]);

    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ token, user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
