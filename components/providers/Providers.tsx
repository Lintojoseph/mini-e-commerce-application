'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/lib/store';

export function Providers({ children }: { children: ReactNode }) {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  // Initialize auth state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      const userData = localStorage.getItem('auth-user');
      
      if (token) {
        setToken(token);
      }
      
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }
  }, [setToken, setUser]);

  return <>{children}</>;
}