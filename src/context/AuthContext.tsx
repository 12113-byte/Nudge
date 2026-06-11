import { createContext, useContext, useEffect, useState } from "react";
import { deleteToken, getToken } from "../utils/token";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

type AuthContextType = {
  user: User | null;
  userToken: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      setUserToken(token);
      setIsLoading(false);
    };

    loadToken();
  }, []);

  const login = async (token: string, user: User) => {
    await deleteToken();  // persist to SecureStore
    setUserToken(token);  // updated token state
    setUser(user);  // updates user state
  };

  const logout = async () => {
    await deleteToken();
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
