import { useState } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: {
    email: string;
    name?: string;
  } | null;
}

export interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const createUseAuth = (
  loginImplementation: (email: string, password: string) => Promise<{ success: boolean; user?: any; error?: string }>
): (() => UseAuthReturn) => {
  return () => {
    const [authState, setAuthState] = useState<AuthState>({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      user: null,
    });

    const login = async (email: string, password: string): Promise<boolean> => {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await loginImplementation(email, password);
        
        if (result.success) {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            error: null,
            user: {
              email,
              name: result.user?.name,
            },
          });
          return true;
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
            error: result.error || 'Login failed',
          }));
          return false;
        }
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'An unexpected error occurred',
        }));
        return false;
      }
    };

    const logout = () => {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: null,
        user: null,
      });
    };

    return {
      ...authState,
      login,
      logout,
    };
  };
}; 