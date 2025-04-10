import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import { MeQuery, useMeQuery } from '../generated/graphql';

interface AuthContextType {
  isAuthenticated: boolean;
  user: MeQuery['me'] | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [user, setUser] = useState<MeQuery['me'] | null>(null);
  const apolloClient = useApolloClient();
  
  const { data, loading } = useMeQuery({
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    await apolloClient.resetStore();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};