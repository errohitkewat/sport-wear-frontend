import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (token: string, user: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = "sportswear_token";
const AUTH_USER_KEY = "sportswear_user";
const BASE_URL = "http://localhost:8000";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const login = (newToken: string, newUser: UserType) => {
    setToken(newToken);
    setUser(newUser);

    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
  };

  useEffect(() => {
    const verifyUser = async () => {
      const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!savedToken) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        setToken(savedToken);
        setUser(data.user);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      } catch (error) {
        logout();
      } finally {
        setIsAuthLoading(false);
      }
    };

    verifyUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token && !!user,
      isAuthLoading,
      login,
      logout,
    }),
    [user, token, isAuthLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
