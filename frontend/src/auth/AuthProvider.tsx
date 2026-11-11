import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { apiRequest, type Profile } from '../api';
import { AuthContext, type AuthContextValue, type AuthUser } from './AuthContext';
import { supabase } from './supabase';

interface LoadedProfile {
  userId: string;
  profile: Profile;
}

function mapUser(session: Session | null): AuthUser | null {
  if (!session) return null;
  return { id: session.user.id, email: session.user.email ?? null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loadedProfile, setLoadedProfile] = useState<LoadedProfile | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const user = mapUser(session);
  const accessToken = session?.access_token ?? null;
  const profile = session && loadedProfile?.userId === session.user.id
    ? loadedProfile.profile
    : null;
  const visibleAuthError = authError ?? (!supabase
    ? 'Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to enable account sign-in.'
    : null);

  useEffect(() => {
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthError(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    let active = true;
    apiRequest<Profile>('/me', { accessToken: session.access_token })
      .then((nextProfile) => {
        if (active) setLoadedProfile({ userId: session.user.id, profile: nextProfile });
      })
      .catch((error: unknown) => {
        if (active) {
          setAuthError(error instanceof Error ? error.message : 'Could not load your account.');
        }
      });
    return () => {
      active = false;
    };
  }, [session]);

  const requireSupabase = useCallback(() => {
    if (!supabase) {
      throw new Error('Account sign-in is not configured. Set the Supabase URL and publishable key.');
    }
    return supabase;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await requireSupabase().auth.signInWithPassword({ email, password });
    if (error) throw error;
    setAuthError(null);
  }, [requireSupabase]);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    const { data, error } = await requireSupabase().auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName.trim() } },
    });
    if (error) throw error;
    setAuthError(null);
    if (data.session) setSession(data.session);
    return Boolean(data.session);
  }, [requireSupabase]);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await requireSupabase().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }, [requireSupabase]);

  const signOut = useCallback(async () => {
    const { error } = await requireSupabase().auth.signOut();
    if (error) throw error;
    setLoadedProfile(null);
    setAuthError(null);
  }, [requireSupabase]);

  const updateProfile = useCallback(async (
    values: Pick<Profile, 'display_name' | 'username' | 'bio'>,
  ) => {
    const updated = await apiRequest<Profile>('/me', {
      method: 'PATCH',
      body: values,
      accessToken,
    });
    if (user) setLoadedProfile({ userId: user.id, profile: updated });
  }, [accessToken, user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    profile,
    accessToken,
    authError: visibleAuthError,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
  }), [
    user, profile, accessToken, visibleAuthError, signIn, signUp, signInWithGoogle, signOut, updateProfile,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
