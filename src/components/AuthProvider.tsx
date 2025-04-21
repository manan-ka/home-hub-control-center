
import { createContext, useContext, useEffect, useState } from 'react';
import { apiLogin, apiRegister } from '@/api/backend';

// User shape as returned from backend
type User = {
  userId: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

function getUserFromStorage() {
  const data = localStorage.getItem("authUser");
  const token = localStorage.getItem("authToken");
  if (data && token) {
    try {
      return { user: JSON.parse(data), token };
    } catch {
      return { user: null, token: null };
    }
  }
  return { user: null, token: null };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const { user, token } = getUserFromStorage();
    setUser(user);
    setToken(token);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiLogin({ email, password });
    setUser({
      userId: data.userId,
      email: data.email,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl,
    });
    setToken(data.token);
    localStorage.setItem("authUser", JSON.stringify(data));
    localStorage.setItem("authToken", data.token);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const data = await apiRegister({ email, password, displayName });
    setUser({
      userId: data.userId,
      email: data.email,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl,
    });
    setToken(data.token);
    localStorage.setItem("authUser", JSON.stringify(data));
    localStorage.setItem("authToken", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
