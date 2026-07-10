import React, { createContext, useContext, useState, useEffect } from 'react';
import { startAuthPopup, exchangeCodeForToken } from '../api/oauth';
import { login as backendLogin, register as backendRegister, fetchMe, saveAuthToken, removeAuthToken, getAuthToken } from '../api/backend';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  verify: (code: string) => Promise<void>;
  loginWithProvider: (provider: 'github' | 'google') => Promise<void>;
  upgradePlan: (plan: string) => void;
  logout: () => void;
  openAuthModal: (redirect?: string) => void;
  authModalOpen: boolean;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    fetchMe()
      .then((response) => {
        const fetchedUser = response.user;
        setUser({
          id: fetchedUser.id,
          name: fetchedUser.name,
          email: fetchedUser.email,
          plan: fetchedUser.plan,
          role: fetchedUser.role,
          isVerified: fetchedUser.isVerified ?? fetchedUser.verified ?? true,
        });
        setIsGuest(false);
      })
      .catch((error) => {
        console.warn('Failed to restore session', error);
        removeAuthToken();
      });
  }, []);

  const login = async (email: string, password?: string) => {
    const response = await backendLogin(email, password);
    saveAuthToken(response.token);

    const newUser: User = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      plan: response.user.plan,
      role: response.user.role,
      isVerified: response.user.isVerified ?? response.user.verified ?? true,
    };

    setUser(newUser);
    setIsGuest(false);
    setAuthModalOpen(false);
    if (redirectAfterAuth) {
      setRedirectAfterAuth(null);
    }
  };

  const loginWithProvider = async (provider: 'github' | 'google') => {
    try {
      const { code, verifier } = await startAuthPopup(provider);
      const tokenRes = await exchangeCodeForToken(provider, code, verifier);
      const profile = tokenRes.user || tokenRes;

      saveAuthToken(tokenRes.access_token);

      const mapped: User = {
        id: profile.id || profile.sub || `${provider}-${profile.email}`,
        name: profile.name || profile.login || `${provider} user`,
        email: profile.email,
        plan: profile.plan || 'Starter',
        role: profile.role || 'user',
        isVerified: profile.isVerified ?? profile.verified ?? true,
      };

      setUser(mapped);
      setIsGuest(false);
      setAuthModalOpen(false);
    } catch (e) {
      console.error('OAuth login failed', e);
      alert('OAuth login failed: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  const register = async (name: string, email: string, password?: string) => {
    const response = await backendRegister(name, email, password);
    saveAuthToken(response.token);

    const newUser: User = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      plan: response.user.plan,
      role: response.user.role,
      isVerified: response.user.isVerified ?? response.user.verified ?? true,
    };

    setUser(newUser);
    setIsGuest(false);
    setAuthModalOpen(false);
    if (redirectAfterAuth) {
      setRedirectAfterAuth(null);
    }
  };

  const verify = async (code: string) => {
    console.log(`Simulating code verification: ${code}`);
  };

  const upgradePlan = (plan: string) => {
    if (!user) return;
    const updatedUser = { ...user, plan };
    setUser(updatedUser);
    localStorage.setItem('lidex_auth', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsGuest(true);
    removeAuthToken();
  };

  const openAuthModal = (redirect?: string) => {
    if (redirect) setRedirectAfterAuth(redirect);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setRedirectAfterAuth(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isGuest, 
      login, 
      register, 
      verify, 
      loginWithProvider,
      upgradePlan,
      logout,
      openAuthModal,
      authModalOpen,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
