import React, { createContext, useContext, useState, useEffect } from 'react';

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
  register: (name: string, email: string) => Promise<void>;
  verify: (code: string) => Promise<void>;
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
    const saved = localStorage.getItem('lidex_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setIsGuest(false);
      } catch (e) {
        console.error('Session restoration failed', e);
      }
    }
  }, []);

  const login = async (email: string) => {
    // Simulate API call
    const isAdmin = email === 'admin@lidex.io';
    const newUser: User = { 
      id: '1', 
      name: isAdmin ? 'System Admin' : 'John Doe', 
      email, 
      plan: isAdmin ? 'Enterprise' : 'Pro Plan',
      role: isAdmin ? 'admin' : 'user',
      isVerified: true
    };
    setUser(newUser);
    setIsGuest(false);
    localStorage.setItem('lidex_auth', JSON.stringify(newUser));
    setAuthModalOpen(false);
    
    if (redirectAfterAuth) {
      // In a real app with react-router, we'd navigate here
      setRedirectAfterAuth(null);
    }
  };

  const register = async (name: string, email: string) => {
    console.log(`Simulating registration for ${name} (${email})`);
    // After verification simulation, they could login
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
    localStorage.removeItem('lidex_auth');
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
