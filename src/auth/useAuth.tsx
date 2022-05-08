import React, { useContext, useEffect, useState } from 'react';

import { User, login as apiLogin, UserPayload } from '../api/auth';

type AuthContextType = {
  user: User | null,
  isAuthenticated: boolean,

  login: (payload: UserPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const isAuthenticated = Boolean(user);

  const login = async (user: UserPayload) => {
    try {
      await apiLogin(user)
        .then(setUser);
    } catch (e) {
      setUser(null);
      throw e;
    }
  }

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
      login(user).finally(() => {
        setIsAuthenticating(false);
      })
    } else {
      setIsAuthenticating(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
    }}>
      {isAuthenticating ? null : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}