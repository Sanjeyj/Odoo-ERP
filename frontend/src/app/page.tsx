"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Lock, Eye, EyeOff, Mail, ArrowLeft, CheckCircle2, Sun, Moon } from "lucide-react";
import Link from 'next/link';

// Credentials map: email -> { password, role, redirect }
const CREDENTIALS: Record<string, { password: string; role: string; redirect: string }> = {
  'admin@smarterp.com':     { password: 'admin',          role: 'admin',         redirect: '/dashboard' },
  'customer@smarterp.com':  { password: 'customer123',    role: 'customer',      redirect: '/customer-dashboard' },
  'purchase@smarterp.com':  { password: 'purchase@123',   role: 'purchasing',    redirect: '/purchasing-dashboard' },
  'sales@smarterp.com':     { password: 'sales@456',      role: 'sales',         redirect: '/sales-dashboard' },
  'inventory@smarterp.com': { password: 'inventory@789',  role: 'inventory',     redirect: '/inventory-dashboard' },
  'mfg@smarterp.com':       { password: 'mfg@321',        role: 'manufacturing', redirect: '/mfg-dashboard' },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(true);

  // Forgot password states
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const cred = CREDENTIALS[email.toLowerCase().trim()];
      if (!cred) {
        setError('No account found with this email address.');
        return;
      }
      if (cred.password !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }
      localStorage.setItem('token', 'simulated_jwt_token');
      localStorage.setItem('role', cred.role);
      window.location.href = cred.redirect;
    }, 800);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setForgotSuccess(`We have sent a password reset link to ${forgotEmail}. Please check your inbox (simulated).`);
      } else {
        setForgotError(data.detail || 'Failed to request password reset.');
      }
    } catch (err) {
      setForgotSuccess(`We have sent a password reset link to ${forgotEmail}. Please check your inbox (simulated).`);
    } finally {
      setForgotLoading(false);
    }
  };

  const inputCls = `w-full rounded-xl px-4 py-3 text-sm outline-none border focus:ring-2 focus:ring-indigo-500 transition-all ${dark ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-white/80 border-slate-300 text-slate-900 placeholder-slate-400'}`;
  const labelCls = `text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`;
  const glassCls = `rounded-2xl border p-8 shadow-2xl backdrop-blur-xl ${dark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/60'}`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${dark ? 'bg-slate-950' : 'bg-slate-100'}`}>
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[25%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[130px] ${dark ? 'bg-indigo-500/10' : 'bg-indigo-400/20'}`} />
        <div className={`absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[130px] ${dark ? 'bg-emerald-500/10' : 'bg-emerald-400/20'}`} />
      </div>

      {/* Theme toggle */}
      <button
        id="theme-toggle-login"
        onClick={() => setDark(!dark)}
        className={`fixed top-5 right-5 z-50 p-2.5 rounded-full border backdrop-blur-sm transition-all ${dark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-slate-800 hover:bg-black/20'}`}
        title="Toggle theme"
      >
        {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <h1 className={`text-4xl font-bold tracking-wider ${dark ? 'text-white' : 'text-slate-900'}`}>
            Smart<span className="text-indigo-500">ERP</span>
          </h1>
        </div>

        {mode === 'login' ? (
          <div className={glassCls}>
            <h2 className={`text-2xl font-bold text-center mb-1 ${dark ? 'text-white' : 'text-slate-900'}`}>Welcome back</h2>
            <p className={`text-sm text-center mb-6 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Sign in with your role credentials to access your portal.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-400 text-center">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className={labelCls}>Email address</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="yourname@smarterp.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className={labelCls}>Password</label>
                  <button
                    type="button"
                    onClick={() => { setForgotEmail(email); setMode('forgot'); setForgotSuccess(''); setForgotError(''); }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls + ' pr-10'}
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-200">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl text-sm font-medium transition-all group mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>

              <div className={`flex items-center justify-center p-3 rounded-xl border mt-2 ${dark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200'}`}>
                <Sparkles className="h-4 w-4 text-indigo-400 mr-2" />
                <span className="text-xs text-indigo-400">Multi-Role Enterprise Access Control</span>
              </div>

              <p className={`text-sm text-center ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Don't have an account?{' '}
                <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        ) : (
          <div className={glassCls}>
            <div className="flex items-center space-x-2 text-indigo-400 mb-3">
              <Lock className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Security Portal</span>
            </div>
            <h2 className={`text-2xl font-bold mb-1 ${dark ? 'text-white' : 'text-slate-900'}`}>Reset Password</h2>
            <p className={`text-sm mb-6 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Enter your registered email and we'll send a reset link.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              {forgotError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-400 text-center">
                  {forgotError}
                </div>
              )}
              {forgotSuccess ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-400 flex flex-col items-center text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  <p className="font-semibold">Reset Link Dispatched</p>
                  <p className="text-xs text-slate-400">{forgotSuccess}</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className={labelCls}>Email address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className={inputCls + ' pl-10'}
                      placeholder="yourname@smarterp.com"
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                  </div>
                </div>
              )}

              {!forgotSuccess && (
                <Button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl text-sm font-medium transition-all"
                >
                  {forgotLoading ? 'Processing...' : 'Send Reset Link'}
                </Button>
              )}
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex items-center justify-center w-full text-sm transition-colors ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
