'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  username: string;
  fullName: string;
  role: 'ADMIN' | 'CUSTOMER';
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user session is saved in localStorage
    const savedUser = localStorage.getItem('bmg_crm_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('bmg_crm_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      // Attempt to hit the Spring Boot Auth Controller
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser: User = {
          username: data.username,
          fullName: data.fullName,
          role: data.role as 'ADMIN' | 'CUSTOMER',
          token: data.token,
        };
        setUser(loggedInUser);
        localStorage.setItem('bmg_crm_user', JSON.stringify(loggedInUser));
        return true;
      } else {
        const errorText = await response.text();
        let errMsg = 'Invalid username or password';
        try {
          const errObj = JSON.parse(errorText);
          if (errObj.error) errMsg = errObj.error;
        } catch (e) {}
        setError(errMsg);
        return false;
      }
    } catch (err) {
      console.warn('Backend connection failed, falling back to local fallback authentication:', err);
      // Resilient local fallback in case the local database / backend is not active
      if (username === 'admin' && password === 'admin123') {
        const fallbackUser: User = {
          username: 'admin',
          fullName: 'John Doe',
          role: 'ADMIN',
          token: 'fallback-jwt-admin-token-12345',
        };
        setUser(fallbackUser);
        localStorage.setItem('bmg_crm_user', JSON.stringify(fallbackUser));
        return true;
      } else if (username === 'customer' && password === 'customer123') {
        const fallbackUser: User = {
          username: 'customer',
          fullName: 'Rajesh Mehta',
          role: 'CUSTOMER',
          token: 'fallback-jwt-customer-token-12345',
        };
        setUser(fallbackUser);
        localStorage.setItem('bmg_crm_user', JSON.stringify(fallbackUser));
        return true;
      } else {
        setError('Invalid username or password (Fallback Mode)');
        return false;
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bmg_crm_user');
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
