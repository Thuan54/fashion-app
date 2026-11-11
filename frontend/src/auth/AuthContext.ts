import { createContext } from 'react';
import type { Profile } from '../api';

export interface AuthUser {
  id: string;
  email: string | null;
}

export interface AuthContextValue {
  user: AuthUser | null;
  profile: Profile | null;
  accessToken: string | null;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (values: Pick<Profile, 'display_name' | 'username' | 'bio'>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
