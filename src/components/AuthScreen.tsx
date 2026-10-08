import React, { useState } from 'react';
import { Mail, Eye, EyeOff, User as UserIcon, Sparkles, ArrowRight } from 'lucide-react';
import { NlsPayLogo } from './NlsPayLogo';
import { LanguageSelector } from './LanguageSelector';
import type { User } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const { language, t } = useLanguage();

  // Form state
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('nikitin@nlspay.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError(
        language === 'es' 
          ? 'Por favor completa todos los campos.' 
          : language === 'en' 
          ? 'Please fill in all fields.' 
          : 'Por favor preencha todos os campos.'
      );
      return;
    }

    if (isRegistering && !name.trim()) {
      setError(
        language === 'es' 
          ? 'Por favor ingresa tu nombre completo.' 
          : language === 'en' 
          ? 'Please enter your full name.' 
          : 'Por favor insira seu nome completo.'
      );
      return;
    }

    const storedUsersJson = localStorage.getItem('nlspay_users');
    const storedUsers: Record<string, { name: string; password: string; avatar: string }> = storedUsersJson 
      ? JSON.parse(storedUsersJson) 
      : {};

    if (isRegistering) {
      if (storedUsers[email.toLowerCase()]) {
        setError(
          language === 'es' 
            ? 'Ya existe una cuenta con este correo electrónico.' 
            : language === 'en' 
            ? 'An account with this email already exists.' 
            : 'Já existe uma conta com este e-mail.'
        );
        return;
      }

      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };

      storedUsers[email.toLowerCase()] = {
        name: newUser.name,
        password: password,
        avatar: newUser.avatar!
      };

      localStorage.setItem('nlspay_users', JSON.stringify(storedUsers));
      localStorage.setItem('nlspay_session', JSON.stringify(newUser));
      onLoginSuccess(newUser);
    } else {
      // Default demo login check
      if (email.toLowerCase() === 'nikitin@nlspay.com' && password === 'password123') {
        const defaultUser: User = {
          id: 'usr-default',
          name: 'NIKITIN',
          email: 'nikitin@nlspay.com',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
        };
        localStorage.setItem('nlspay_session', JSON.stringify(defaultUser));
        onLoginSuccess(defaultUser);
        return;
      }

      const userRecord = storedUsers[email.toLowerCase()];
      if (!userRecord || userRecord.password !== password) {
        setError(
          language === 'es' 
            ? 'Credenciales incorrectas. Verifica tu correo y contraseña.' 
            : language === 'en' 
            ? 'Invalid credentials. Please verify your email and password.' 
            : 'Credenciais inválidas. Verifique seu e-mail e senha.'
        );
        return;
      }

      const loggedUser: User = {
        id: `usr-${email}`,
        name: userRecord.name,
        email: email.toLowerCase(),
        avatar: userRecord.avatar
      };

      localStorage.setItem('nlspay_session', JSON.stringify(loggedUser));
      onLoginSuccess(loggedUser);
    }
  };

  const handleQuickDemoLogin = () => {
    const demoUser: User = {
      id: 'usr-default',
      name: 'NIKITIN',
      email: 'nikitin@nlspay.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    localStorage.setItem('nlspay_session', JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 font-sans selection:bg-[#C8D9E6] selection:text-[#2F4156] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* FONDO ELEGANTE MARINA CON PROFUNDIDAD ATMOSFÉRICA (SIN CUADRÍCULA REPETIDA) */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#1b2242] via-[#222B52] to-[#141930]" />
      
      {/* Soft Ambient Warm Rust & Slate Gray Luxury Glows */}
      <div className="fixed -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none bg-[#B25640]/15" />
      <div className="fixed top-1/2 -right-32 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none bg-[#7F858D]/20" />
      <div className="fixed -bottom-24 left-1/3 w-[700px] h-[400px] bg-[#222B52]/50 rounded-full blur-[170px] pointer-events-none" />

      {/* Top Floating Language Menu Matching Onboarding Standard */}
      <header className="w-full max-w-5xl xl:max-w-6xl flex items-center justify-between mb-5 z-20 px-2 sm:px-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#222B52] border border-white/10 shadow-md flex items-center justify-center shrink-0">
            <NlsPayLogo className="w-5 h-5 drop-shadow-sm" isDark={false} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                NlsPay
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B25640]" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#F8F7F0]/80 font-bold tracking-widest uppercase mt-0.5 block">
              Financial Intelligence Hub
            </span>
          </div>
        </div>

        {/* Labeled Language Selector */}
        <LanguageSelector variant="labeled" />
      </header>

      {/* ========================================================================= */}
      {/* CONTENEDOR PRINCIPAL: COMBINACIÓN MARINA (#222B52) & IVORY (#F8F7F0)       */}
      {/* ========================================================================= */}
      <main className="w-full max-w-5xl xl:max-w-6xl min-h-[660px] sm:min-h-[720px] bg-[#F8F7F0] rounded-[36px] sm:rounded-[44px] shadow-[0_25px_80px_rgba(0,0,0,0.55)] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10 transition-all">
        
        {/* Left Column: Deep Marina Panel with Seamless 3D Coin Medallion */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#222B52] via-[#222B52] to-[#1a2140] p-6 sm:p-9 lg:p-10 flex flex-col justify-between text-white relative overflow-hidden">
          
          {/* Subtle atmospheric ambient glow */}
          <div className="absolute -top-16 -left-16 w-60 h-60 bg-[#B25640]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo and Tagline */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1b2242] border border-white/10 shadow-md flex items-center justify-center shrink-0">
                <NlsPayLogo className="w-6 h-6 drop-shadow" isDark={false} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-2xl font-black tracking-tight text-white">NlsPay</span>
                  <span className="w-2 h-2 rounded-full bg-[#B25640]" />
                </div>
                <span className="text-[10px] text-[#F8F7F0]/80 font-bold tracking-widest uppercase mt-0.5 block">
                  FINANCIAL INTELLIGENCE HUB
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-3 leading-relaxed">
              Tu centro de mando financiero con analítica inteligente de capital.
            </p>
          </div>

          {/* Center: Seamless 3D NlsPay Coin Medallion (Pure Logo, No Box, No Background Artifacts) */}
          <div className="relative z-10 py-6 sm:py-8 flex flex-col items-center justify-center my-auto">
            <div className="relative group flex flex-col items-center justify-center">
              {/* Soft subtle ambient glow behind the floating coin */}
              <div className="absolute w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <img 
                src="/nlspay-coin-solo.png" 
                alt="NlsPay 3D Coin" 
                className="w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 object-contain relative z-10 drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)] transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
              />
              <div className="flex items-center gap-2 mt-4 relative z-10">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                  NlsPay
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Bottom: Feature Callouts matching Marina styling */}
          <div className="relative z-10 pt-4 border-t border-white/10">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-2 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.quantumTitle}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-[#F8F7F0]/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B25640]" />
                <span>{t.quantumBullet1}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{t.quantumBullet2}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Clean Warm Ivory (#F8F7F0) Form Panel with Rust (#B25640) Accents */}
        <div className="lg:col-span-7 p-7 sm:p-12 lg:p-14 flex flex-col justify-center bg-[#F8F7F0]">
          <div className="w-full max-w-md mx-auto flex flex-col justify-center">
            
            {/* Title in Marina (#222B52) */}
            <div className="text-center mb-7">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#222B52] leading-tight">
                {isRegistering ? t.registerTitle : t.loginTitle}
              </h2>
              <p className="text-sm sm:text-base mt-2 text-[#7F858D] font-normal leading-relaxed">
                {isRegistering ? t.registerSubtitle : t.loginSubtitle}
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs sm:text-sm text-center font-semibold animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field (Registering only) */}
              {isRegistering && (
                <div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      required
                      placeholder={t.fullNamePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm sm:text-base rounded-full pl-6 pr-12 py-3.5 sm:py-4 focus:outline-none transition-all placeholder:text-[#7F858D]/60 bg-white border border-[#7F858D]/30 text-[#222B52] focus:border-[#B25640] focus:ring-4 focus:ring-[#B25640]/15"
                    />
                    <UserIcon className="w-4 h-4 absolute right-5 pointer-events-none text-[#7F858D]" />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm sm:text-base rounded-full pl-6 pr-12 py-3.5 sm:py-4 focus:outline-none transition-all placeholder:text-[#7F858D]/60 bg-white border border-[#7F858D]/30 text-[#222B52] focus:border-[#B25640] focus:ring-4 focus:ring-[#B25640]/15"
                  />
                  <Mail className="w-4 h-4 absolute right-5 pointer-events-none text-[#7F858D]" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm sm:text-base rounded-full pl-6 pr-12 py-3.5 sm:py-4 focus:outline-none transition-all placeholder:text-[#7F858D]/60 bg-white border border-[#7F858D]/30 text-[#222B52] focus:border-[#B25640] focus:ring-4 focus:ring-[#B25640]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 transition-colors text-[#7F858D] hover:text-[#222B52] cursor-pointer"
                    title={showPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5 text-[#7F858D]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#7F858D]/40 text-[#B25640] focus:ring-[#B25640] w-4 h-4 cursor-pointer"
                  />
                  <span>{t.remember30Days}</span>
                </label>
                <button
                  type="button"
                  className="font-semibold hover:underline transition-colors text-[#B25640] hover:text-[#222B52] cursor-pointer"
                >
                  {t.forgotPassword}
                </button>
              </div>

              {/* Submit Button in Rust (#B25640) */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-[#B25640] hover:bg-[#9c4531] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#B25640]/30 hover:shadow-xl transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isRegistering ? t.createAccountBtn : t.signInBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle between Login and Register */}
            <div className="mt-6 text-center text-xs sm:text-sm">
              <span className="text-[#7F858D]">
                {isRegistering ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError(null);
                }}
                className="font-bold hover:underline transition-colors text-[#B25640] hover:text-[#222B52] cursor-pointer"
              >
                {isRegistering ? t.signInBtn : t.createAccountBtn}
              </button>
            </div>

            {/* Social / Demo Quick Login */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {/* Apple */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                title="Apple Login"
                className="w-10 h-10 rounded-full border border-[#7F858D]/30 bg-white hover:bg-slate-50 text-[#222B52] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.14-.54 2.77-1.28z"/>
                </svg>
              </button>

              {/* Google */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                title="Google Login"
                className="w-10 h-10 rounded-full border border-[#7F858D]/30 bg-white hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                  <path fill="#FBBC05" d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7 0-1.2.2-2 .4-2.7L1.9 6.4C.7 8.8 0 10.4 0 12s.7 3.2 1.9 5.6l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16C3.7 19.8 7.5 23 12 23z" />
                </svg>
              </button>

              {/* Quick Demo Login */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                title="Entrar con Modo Demo"
                className="px-4 py-2 rounded-full border border-[#7F858D]/30 bg-white text-[#222B52] hover:bg-slate-50 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B25640]" />
                <span>{t.demoAccess}</span>
              </button>
            </div>

            {/* Footer info */}
            <div className="mt-8 text-center text-xs flex items-center justify-center gap-3 text-[#7F858D]">
              <a href="#terminos" className="hover:text-[#222B52] transition-colors">{t.terms}</a>
              <span>•</span>
              <a href="#soporte" className="hover:text-[#222B52] transition-colors">{t.support}</a>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
};

export default AuthScreen;
