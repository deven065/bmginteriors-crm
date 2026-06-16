'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { requireSupabaseBrowserClient, SupabaseConfigError } from '../lib/supabase';
import type { AppRole } from '../lib/supabaseTypes';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: AppRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

interface ProfileRecord {
  id: string;
  username: string | null;
  full_name: string;
  role: AppRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function resolveLoginEmail(usernameOrEmail: string) {
  const value = usernameOrEmail.trim();
  if (value.includes('@')) return value;

  const authDomain = process.env.NEXT_PUBLIC_AUTH_EMAIL_DOMAIN || 'bmginteriors.com';
  return `${value}@${authDomain}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (userId: string, email: string | undefined): Promise<User> => {
    const supabase = requireSupabaseBrowserClient();
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, full_name, role')
      .eq('id', userId)
      .single();

    if (profileError) {
      throw profileError;
    }

    const profile = data as ProfileRecord;

    return {
      id: profile.id,
      username: profile.username || email?.split('@')[0] || 'user',
      email: email || '',
      fullName: profile.full_name,
      role: profile.role,
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const supabase = (() => {
      try {
        return requireSupabaseBrowserClient();
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Supabase is not configured.');
          setUser(null);
          setLoading(false);
        }
        return null;
      }
    })();

    if (!supabase) return;

    void supabase.auth.getSession().then(async ({ data, error: sessionError }) => {
      if (cancelled) return;

      if (sessionError) {
        setError(sessionError.message);
        setUser(null);
        setLoading(false);
        return;
      }

      if (!data.session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setUser(await loadProfile(data.session.user.id, data.session.user.email));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load your profile.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void Promise.resolve().then(async () => {
        if (cancelled) return;

        if (!session?.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        try {
          setUser(await loadProfile(session.user.id, session.user.email));
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to load your profile.');
          setUser(null);
        } finally {
          setLoading(false);
        }
      });
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const login = async (username: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const supabase = requireSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: resolveLoginEmail(username),
        password,
      });

      if (signInError) {
        throw signInError;
      }

      if (!data.user) {
        throw new Error('Unable to start a Supabase session.');
      }

      const loggedInUser: User = {
        ...(await loadProfile(data.user.id, data.user.email)),
      };
      setUser(loggedInUser);
      return true;
    } catch (err) {
      setError(
        err instanceof SupabaseConfigError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Unable to sign in with Supabase.'
      );
      return false;
    }
  };

  const logout = async () => {
    try {
      const supabase = requireSupabaseBrowserClient();
      await supabase.auth.signOut();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
