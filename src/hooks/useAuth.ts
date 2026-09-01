import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signInAnonymously, signOut, type User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInAnon: () => Promise<void>;
  logout: () => Promise<void>;
  isLocalhost: boolean;
}

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      setError(msg);
    }
  }, []);

  const signInAnon = useCallback(async () => {
    try {
      setError(null);
      await signInAnonymously(auth);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Anonymous login failed';
      setError(msg);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Logout failed';
      setError(msg);
    }
  }, []);

  return { user, loading, error, signInWithGoogle, signInAnon, logout, isLocalhost };
}
