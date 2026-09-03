// context/AuthContextLanding.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContextLanding = createContext<AuthContextType | undefined>(undefined);

export function AuthProviderLanding({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  

  // Defensive sync: keeps context in step whenever the server recomputes
  // initialUser (e.g. after router.refresh()). Doesn't fire fast enough to
  // rely on alone for logout, but matters for other navigation paths.
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  // Clears the cookie AND the in-memory user synchronously, so any page
  // reading `user` right after this — like seo-login's redirect effect —
  // sees null immediately instead of waiting on a server round trip.
const logout = useCallback(async () => {
  try {
    await fetch('/api/seo-auth', { method: 'DELETE' });
  } catch {
    // even if the request fails, don't leave the UI stuck showing a logged-in state
  }
  setUser(null);
}, []);

  return (
    <AuthContextLanding.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContextLanding.Provider>
  );
}

export function useAuthLanding() {
  const context = useContext(AuthContextLanding);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}