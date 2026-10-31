import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, ArrowLeft, KeyRound, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setCurrentView, data } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = adminLogin(password);
      if (!success) {
        setError('Invalid passcode. Please enter the correct admin password.');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-beige-light dark:bg-navy flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back button */}
        <button
          onClick={() => {
            setCurrentView('public');
            try {
              window.history.pushState(null, '', '/');
            } catch {
              window.location.hash = '';
            }
          }}
          className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-terracotta dark:text-beige dark:hover:text-terracotta transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portfolio</span>
        </button>

        {/* Brand Icon */}
        <div className="w-12 h-12 rounded-2xl bg-terracotta text-white flex items-center justify-center mx-auto shadow-lg shadow-terracotta/20">
          <Lock className="w-6 h-6" />
        </div>

        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-navy dark:text-beige-light">
          Portfolio CMS Portal
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-600 dark:text-beige">
          Administrative dashboard for {data.profile.name}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-navy-surface py-8 px-6 sm:px-8 shadow-xl rounded-2xl border border-beige-border dark:border-navy-border">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-navy dark:text-beige-light mb-2"
              >
                Admin Passcode
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-olive">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-beige-border dark:border-navy-border bg-white dark:bg-navy text-navy dark:text-beige-light placeholder-slate-400 focus:outline-hidden focus:border-terracotta"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-navy dark:hover:text-beige cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-terracotta hover:bg-terracotta-dark transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Enter CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Preset hint box for immediate testing ease */}
          <div className="mt-6 pt-5 border-t border-beige-border dark:border-navy-border text-center">
            <p className="text-xs text-slate-500 dark:text-beige">
              Default password:{' '}
              <button
                type="button"
                onClick={() => setPassword('admin')}
                className="font-mono font-bold text-terracotta hover:underline px-1 py-0.5 rounded bg-terracotta/10 cursor-pointer"
              >
                admin
              </button>{' '}
              or{' '}
              <button
                type="button"
                onClick={() => setPassword('jayaprakash2026')}
                className="font-mono font-bold text-terracotta hover:underline px-1 py-0.5 rounded bg-terracotta/10 cursor-pointer"
              >
                jayaprakash2026
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
