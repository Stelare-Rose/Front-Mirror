import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ user: null, accessToken: null, refreshToken: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Context must be used within AuthContext");
  return ctx;
}
