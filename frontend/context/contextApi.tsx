import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserType = {
  id: string;
  email: string;
  // aur bhi fields agar backend bhejta hai to add kar sakta h
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  Login: (userData: UserType, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // App start hone pe AsyncStorage se user aur token load karna
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (err) {
        console.log("Error loading auth data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const Login = async (userData: UserType, authToken: string) => {
    setUser(userData);
    setToken(authToken);

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("token", authToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, Login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
