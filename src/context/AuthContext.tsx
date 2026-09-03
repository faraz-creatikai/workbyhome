// authcontext.tsx
"use client";

import { checkAuthAdmin, loginAdmin, logoutAdmin } from "@/store/auth/auth";
import { Admin, LoginCredentials } from "@/store/auth/auth.interface";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

interface AuthContextType {
  admin: Admin | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
        const data = await checkAuthAdmin(); // backend verifies token
        if (data?.success && data?.admin) {
          setAdmin(data.admin);
        } else {
          console.log("check problem : ", data)
        }
      
      setIsLoading(false);
    };
    initAuth();
  }, []);

  // ❌ REMOVE THIS LINE:
  // if (isLoading) return null;

  const login = async (credentials: LoginCredentials) => {
    const data = await loginAdmin(credentials);
    if (data.success && data.adminData) {
      setAdmin(data.adminData);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const logout = async () => {
    const data = await logoutAdmin();
    if (data.success) {
      setAdmin(null);
      console.log(" done ")
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  // ✅ ALWAYS RETURN CHILDREN
  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};