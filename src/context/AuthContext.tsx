import { createContext, useContext, useEffect, useState } from "react";
import { deleteToken, getToken } from "../utils/token";

type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider = ({ children }: any) => {
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

  const login = (token: string) => {
    setUserToken(token);
  };

  const logout = async () => {
    await deleteToken();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
