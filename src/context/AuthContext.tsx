import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";
import * as SecureStore from "expo-secure-store";

/* ---------- Types ---------- */

export type User = {
  id: string;
  name: string;
  email: string;
  nim: string;
  prodi: string;
  image: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

/* ---------- Default Context ---------- */

const AuthContext = createContext<AuthContextType>({
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

  // Load token & user on app startup
  useEffect(() => {
    (async () => {
      const storedToken = await SecureStore.getItemAsync("authToken");
      const storedUser = await SecureStore.getItemAsync("authUser");

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));

      setLoading(false);
    })();
  }, []);

  /* ---------- Login Implementation ---------- */
  const login = async (newToken: string, userData: User) => {
    // Simpan ke secure store
    await SecureStore.setItemAsync("authToken", newToken);
    await SecureStore.setItemAsync("authUser", JSON.stringify(userData));

    // Simpan ke state
    setToken(newToken);
    setUser(userData);
  };

  /* ---------- Logout Implementation ---------- */
  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("authUser");

    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ token, user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

/* ---------- Hook ---------- */

export const useAuth = () => useContext(AuthContext);
