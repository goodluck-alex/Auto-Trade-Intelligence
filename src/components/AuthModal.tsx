import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { authModalOpen, closeAuthModal, login, register, loginWithProvider } = useAuth();
  const [view, setView] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === 'login') {
        await login(email, password);
      } else if (view === 'register') {
        await register(name, email, password);
      }
    } catch (e) {
      alert('Authentication failed: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeAuthModal} />
      
      <div className="relative w-full max-w-md panel-base overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button onClick={closeAuthModal} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black dark:text-white text-gray-900">
              {view === 'login' && 'Welcome Back'}
              {view === 'register' && 'Create Account'}
              {view === 'forgot' && 'Reset Password'}
              {view === 'verify' && 'Verify Email'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {view === 'login' && 'Sign in to access your trading fleet.'}
              {view === 'register' && 'Start your automated trading journey.'}
              {view === 'forgot' && 'Enter your email to receive a reset link.'}
              {view === 'verify' && 'We sent a code to your email.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name" 
                    className="w-full pl-12 pr-5 py-4 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-black/20 focus:outline-none focus:border-emerald-500 transition-all dark:text-white text-gray-900" 
                  />
                </div>
              </div>
            )}

            {(view === 'login' || view === 'register' || view === 'forgot') && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com" 
                    className="w-full pl-12 pr-5 py-4 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-black/20 focus:outline-none focus:border-emerald-500 transition-all dark:text-white text-gray-900" 
                  />
                </div>
              </div>
            )}

            {(view === 'login' || view === 'register') && (
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Password</label>
                  {view === 'login' && (
                    <button type="button" onClick={() => setView('forgot')} className="text-[10px] font-bold text-emerald-600 hover:underline">Forgot?</button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-5 py-4 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-black/20 focus:outline-none focus:border-emerald-500 transition-all dark:text-white text-gray-900" 
                  />
                </div>
              </div>
            )}

            {view === 'verify' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Verification Code</label>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit code" 
                  maxLength={6}
                  className="w-full px-5 py-4 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-black/20 focus:outline-none focus:border-emerald-500 transition-all dark:text-white text-gray-900 text-center tracking-[1em] font-black text-xl" 
                />
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Processing...' : (
                <>
                  {view === 'login' && 'Sign In'}
                  {view === 'register' && 'Get Started'}
                  {view === 'forgot' && 'Send Reset Link'}
                  {view === 'verify' && 'Verify & Login'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {(view === 'login' || view === 'register') && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t dark:border-white/10 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-[#161723] px-4 text-gray-500 font-bold">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => loginWithProvider('github')} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border dark:border-white/10 border-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-sm font-bold dark:text-white text-gray-900">
                   GitHub
                </button>
                <button onClick={() => loginWithProvider('google')} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border dark:border-white/10 border-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-sm font-bold dark:text-white text-gray-900">
                  Google
                </button>
              </div>
            </>
          )}

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">
              {view === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
              className="ml-2 text-emerald-600 font-black hover:underline"
            >
              {view === 'login' ? 'Register' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
