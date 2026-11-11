import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, profile, authError, signIn, signUp, signInWithGoogle, signOut } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setNotice('');
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        const signedIn = await signUp(email, password, displayName);
        if (!signedIn) {
          setNotice('Account created, but Supabase requires email confirmation. Confirm your email, or turn off Confirm email in Supabase Auth settings to sign in immediately after registration.');
          return;
        }
      } else {
        await signIn(email, password);
      }
      setDialogOpen(false);
      setPassword('');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not complete sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not sign in with Google.');
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not sign out.');
      setDialogOpen(true);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">img</div>
              <span className="text-xl font-serif font-bold text-gray-900">Aura Mode</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/community" className={`text-sm font-medium transition-colors ${isActive('/community') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Khám phá</Link>
              <Link to="/create" className={`text-sm font-medium transition-colors ${isActive('/create') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Ý tưởng mới</Link>
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Xu hướng tuần này</Link>
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Nhà thiết kế</Link>
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Tủ đồ của tôi</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search" className="input-search w-48" />
            <Link to="/create" className="btn-primary">+ Đăng ý tưởng</Link>
            <button type="button" className="btn-icon relative" aria-label="Notifications">
              Notifications
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  {profile?.display_name ?? user.email}
                </Link>
                <button type="button" className="btn-ghost text-sm py-2" onClick={() => void handleSignOut()}>Sign out</button>
              </div>
            ) : (
              <button type="button" className="btn-outline text-sm py-2" onClick={() => setDialogOpen(true)}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
      {authError && (
        <p role="status" className="px-4 pb-2 text-right text-xs text-red-600">{authError}</p>
      )}
      {dialogOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDialogOpen(false);
          }}
        >
          <section role="dialog" aria-modal="true" aria-labelledby="account-dialog-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 id="account-dialog-title" className="text-xl font-semibold text-gray-900">
                {mode === 'login' ? 'Sign in to Aura Mode' : 'Create your account'}
              </h2>
              <button type="button" className="btn-icon" aria-label="Close" onClick={() => setDialogOpen(false)}>×</button>
            </div>
            <form className="space-y-4" onSubmit={handleAuth}>
              {mode === 'signup' && (
                <label className="block text-sm font-medium text-gray-700">
                  Display name
                  <input
                    className="input-field mt-1"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    required
                    maxLength={80}
                  />
                </label>
              )}
              <label className="block text-sm font-medium text-gray-700">
                Email
                <input
                  className="input-field mt-1"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Password
                <input
                  className="input-field mt-1"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                />
              </label>
              {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
              {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}
              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </form>
            <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              OR
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <button
              type="button"
              className="btn-outline w-full"
              onClick={() => void handleGoogleSignIn()}
              disabled={submitting}
            >
              Continue with Google
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-700"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setFormError('');
                  setNotice('');
                }}
              >
                {mode === 'login' ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          </section>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
