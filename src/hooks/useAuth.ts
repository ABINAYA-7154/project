import { useState, useCallback } from 'react';
import { dummyDb } from '../lib/dummyDb';
import type { Student, Management } from '../types';

interface AuthState {
  user: Student | Management | null;
  userType: 'student' | 'management' | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : {
      user: null,
      userType: null,
      isAuthenticated: false
    };
  });

  const login = useCallback(async (
    type: 'student' | 'management',
    data: Partial<Student | Management>
  ) => {
    try {
      await dummyDb.login(type, data);

      const authData = {
        user: data,
        userType: type,
        isAuthenticated: true
      };
      
      setAuthState(authData);
      localStorage.setItem('auth', JSON.stringify(authData));
      window.location.href = `/${type}-dashboard`;
    } catch (error) {
      console.error('Login error:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await dummyDb.logout();
      localStorage.removeItem('auth');
      setAuthState({
        user: null,
        userType: null,
        isAuthenticated: false
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  return {
    ...authState,
    login,
    logout
  };
}