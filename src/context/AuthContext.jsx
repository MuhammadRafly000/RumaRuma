import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import { storage } from '@/utils/storage';
import * as authService from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.auth);
    return stored?.user || null;
  });
  const [token, setToken] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.auth);
    return stored?.token || null;
  });
  const [status, setStatus] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.auth);
    return stored?.token ? 'authenticated' : 'idle';
  });

  const persist = useCallback((next) => {
    if (next) storage.set(STORAGE_KEYS.auth, next);
    else storage.remove(STORAGE_KEYS.auth);
  }, []);

  const login = useCallback(
    async (credentials) => {
      setStatus('loading');
      try {
        const data = await authService.loginWithEmail(credentials);
        setUser(data.user);
        setToken(data.token);
        setStatus('authenticated');
        persist(data);
        return data;
      } catch (err) {
        setStatus('error');
        throw err;
      }
    },
    [persist],
  );

  const register = useCallback(
    async (payload) => {
      setStatus('loading');
      try {
        const data = await authService.registerWithEmail(payload);
        setUser(data.user);
        setToken(data.token);
        setStatus('authenticated');
        persist(data);
        return data;
      } catch (err) {
        setStatus('error');
        throw err;
      }
    },
    [persist],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    setStatus('idle');
    persist(null);
  }, [persist]);

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      isAuthenticated: !!token,
      login,
      register,
      logout,
    }),
    [user, token, status, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
