"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@/types/user";
import * as authMock from "@/lib/auth-mock";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // localStorage is only readable client-side; hydrate session post-mount to avoid SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(authMock.getSession());
    setHydrated(true);
  }, []);

  const login = useCallback((email: string, senha: string) => {
    const result = authMock.login(email, senha);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const register = useCallback((data: Omit<User, "id"> & { senha: string }) => {
    const result = authMock.register(data);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const logout = useCallback(() => {
    authMock.logout();
    setUser(null);
  }, []);

  return { user, hydrated, login, register, logout };
}
