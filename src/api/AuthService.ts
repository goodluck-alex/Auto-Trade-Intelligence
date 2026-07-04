import { mockApi } from '../services/mockApi';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  country?: string;
  timezone?: string;
  language?: string;
  role: 'user' | 'admin';
  plan: string;
  mfaEnabled: boolean;
  verified: boolean;
}

const USERS_KEY = 'lidex_db_users';
const CURRENT_USER_KEY = 'lidex_auth';

export const AuthService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  register: async (data: any): Promise<User> => {
    const users = AuthService.getUsers();
    if (users.find(u => u.email === data.email)) throw new Error('Email already registered');
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
      role: data.email === 'admin@lidex.io' ? 'admin' : 'user',
      plan: 'Starter',
      mfaEnabled: false,
      verified: false,
      ...data
    };
    
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return newUser;
  },

  login: async (email: string, password?: string): Promise<User> => {
    const users = AuthService.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      // Create a default one for first-time use of the app in this env
      return AuthService.register({ email, name: email.split('@')[0], password });
    }
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  // Simulate OAuth login/register with external providers (GitHub, Google)
  loginWithProvider: async (provider: 'github' | 'google', profile?: { email?: string; name?: string }): Promise<User> => {
    const users = AuthService.getUsers();
    const email = profile?.email || `${provider}_user@local.${provider}.local`;
    let user = users.find(u => u.email === email);

    if (!user) {
      // create a new user from provider profile
      user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: profile?.name || `${provider} user`,
        role: email === 'admin@lidex.io' ? 'admin' : 'user',
        plan: 'Starter',
        mfaEnabled: false,
        verified: true,
        ...(profile || {})
      } as User;
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  updateProfile: async (data: Partial<User>) => {
    const current = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}');
    const updated = { ...current, ...data };
    
    const users = AuthService.getUsers().map(u => u.id === current.id ? updated : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
    return updated;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  verifyEmail: async () => {
    return AuthService.updateProfile({ verified: true });
  },

  toggleMFA: async (enabled: boolean) => {
    return AuthService.updateProfile({ mfaEnabled: enabled });
  }
};
