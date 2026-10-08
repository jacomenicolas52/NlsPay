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
      {/* FONDO AZUL OSCURO EXACTO (CUADRÍCULA DE PUNTOS & GRÁFICOS SUTILES)       */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 bg-[#17202a]" />
      
      {/* Soft Ambient Teal & Navy Glows */}
      <div className="fixed -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none bg-[#567C8D]/30" />
      <div className="fixed top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none bg-[#C8D9E6]/20" />
      <div className="fixed -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#567C8D]/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Blueprint Grid Matrix */}
      <svg className="fixed inset-0 w-full h-full opacity-10 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fintechGridMatrixAuth" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8D9E6" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="1.5" fill="#C8D9E6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fintechGridMatrixAuth)" />
      </svg>

      {/* Financial Trendline & Candlestick Bars */}
      <svg className="fixed inset-0 w-full h-full opacity-20 pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 1440 900">
        <path 
          d="M 0 650 Q 240 520 480 580 T 960 380 T 1440 180" 
          fill="none" 
          stroke="#C8D9E6" 
          strokeWidth="2.5" 
          strokeDasharray="8 8" 
        />
        <path 
          d="M 0 780 Q 360 620 720 670 T 1200 420 T 1440 290" 
          fill="none" 
          stroke="#567C8D" 
          strokeWidth="3" 
        />
        <g stroke="#C8D9E6" strokeWidth="1" fill="#C8D9E6" opacity="0.6">
          <line x1="120" y1="580" x2="120" y2="670" />
          <rect x="114" y="600" width="12" height="45" rx="2" />
          <line x1="280" y1="480" x2="280" y2="590" />
          <rect x="274" y="500" width="12" height="60" rx="2" />
          <line x1="840" y1="320" x2="840" y2="420" />
          <rect x="834" y="340" width="12" height="50" rx="2" />
          <line x1="1300" y1="180" x2="1300" y2="300" />
          <rect x="1294" y="210" width="12" height="65" rx="2" />
        </g>
      </svg>

      {/* Top Floating Language Menu Matching the Exact Reference Popover Style */}
      <header className="w-full max-w-[1020px] flex items-center justify-between mb-4 z-20 px-2 sm:px-0">
        <div className="flex items-center gap-2.5">
          <NlsPayLogo className="w-8 h-8 drop-shadow" isDark={false} />
          <span className="text-xl font-extrabold text-white tracking-tight">NlsPay</span>
        </div>

        {/* Popover Language Selector */}
        <LanguageSelector variant="glass" />
      </header>

      {/* ========================================================================= */}
      {/* PROPUESTA 1 ÚNICA: SPLIT SCREEN WITH INNOVATION */}
      {/* ========================================================================= */}
      <main className="w-full max-w-[1020px] min-h-[600px] bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-black/40 border border-white/20 overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10 transition-all">
        
        {/* Left Column: Navy Dark Split Screen with Logo & Quantum Neural Mesh */}
        <div className="lg:col-span-5 bg-[#2F4156] p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden">
          
          {/* Subtle background points */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#C8D9E6 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Top Logo and Tagline */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <NlsPayLogo className="w-9 h-9 drop-shadow" isDark={false} />
              <span className="text-2xl font-extrabold tracking-tight text-white">NlsPay</span>
            </div>
            <p className="text-xs text-[#C8D9E6] font-medium mt-1">
              Tu dinero. Tu control.
            </p>
          </div>

          {/* Center: Glowing 3D Quantum Neural / Geometric Polyhedron Mesh */}
          <div className="relative z-10 py-8 flex items-center justify-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Radial glow aura in Teal & Sky Blue */}
              <div className="absolute w-40 h-40 bg-[#567C8D]/45 rounded-full blur-2xl animate-pulse" />
              <div className="absolute w-24 h-24 bg-[#C8D9E6]/30 rounded-full blur-xl" />

              {/* Quantum Analytical Polyhedron SVG */}
              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10" fill="none">
                <circle cx="100" cy="100" r="75" stroke="#567C8D" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="100" cy="100" r="50" stroke="#C8D9E6" strokeWidth="1" opacity="0.3" />

                <g stroke="#C8D9E6" strokeWidth="1.2" opacity="0.85">
                  <line x1="100" y1="35" x2="155" y2="65" />
                  <line x1="155" y1="65" x2="165" y2="125" />
                  <line x1="165" y1="125" x2="125" y2="165" />
                  <line x1="125" y1="165" x2="75" y2="165" />
                  <line x1="75" y1="165" x2="35" y2="125" />
                  <line x1="35" y1="125" x2="45" y2="65" />
                  <line x1="45" y1="65" x2="100" y2="35" />

                  <line x1="100" y1="35" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                  <line x1="155" y1="65" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                  <line x1="165" y1="125" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                  <line x1="125" y1="165" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                  <line x1="75" y1="165" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                  <line x1="35" y1="125" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                  <line x1="45" y1="65" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />

                  <line x1="45" y1="65" x2="155" y2="65" stroke="#567C8D" strokeWidth="0.8" opacity="0.6" />
                  <line x1="35" y1="125" x2="165" y2="125" stroke="#567C8D" strokeWidth="0.8" opacity="0.6" />
                  <line x1="45" y1="65" x2="125" y2="165" stroke="#C8D9E6" strokeWidth="0.8" opacity="0.5" />
                  <line x1="155" y1="65" x2="75" y2="165" stroke="#C8D9E6" strokeWidth="0.8" opacity="0.5" />
                </g>

                <g fill="#FFFFFF">
                  <circle cx="100" cy="35" r="3.5" fill="#C8D9E6" />
                  <circle cx="155" cy="65" r="3.5" fill="#C8D9E6" />
                  <circle cx="165" cy="125" r="3.5" fill="#C8D9E6" />
                  <circle cx="125" cy="165" r="3.5" fill="#C8D9E6" />
                  <circle cx="75" cy="165" r="3.5" fill="#C8D9E6" />
                  <circle cx="35" cy="125" r="3.5" fill="#C8D9E6" />
                  <circle cx="45" cy="65" r="3.5" fill="#C8D9E6" />
                  <circle cx="100" cy="100" r="5" fill="#FFFFFF" />
                  <circle cx="100" cy="100" r="9" stroke="#C8D9E6" strokeWidth="1.5" opacity="0.75" />
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom: Feature Callouts */}
          <div className="relative z-10 pt-4 border-t border-[#567C8D]/40">
            <h3 className="text-sm font-bold text-white mb-2 tracking-wide">
              {t.quantumTitle}
            </h3>
            <ul className="space-y-1.5 text-xs text-[#C8D9E6]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8D9E6]" />
                <span>{t.quantumBullet1}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#567C8D]" />
                <span>{t.quantumBullet2}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Clean White Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto flex flex-col justify-center">
            
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2F4156]">
                {isRegistering ? t.registerTitle : t.loginTitle}
              </h2>
              <p className="text-xs sm:text-sm mt-1.5 text-[#567C8D]">
                {isRegistering ? t.registerSubtitle : t.loginSubtitle}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs text-center font-semibold animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none transition-all placeholder:text-[#567C8D]/60 bg-[#F5EFEB]/50 border border-[#C8D9E6] text-[#2F4156] focus:border-[#567C8D] focus:ring-2 focus:ring-[#567C8D]/15"
                    />
                    <UserIcon className="w-4 h-4 absolute right-4 pointer-events-none text-[#567C8D]" />
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
                    className="w-full text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none transition-all placeholder:text-[#567C8D]/60 bg-[#F5EFEB]/50 border border-[#C8D9E6] text-[#2F4156] focus:border-[#567C8D] focus:ring-2 focus:ring-[#567C8D]/15"
                  />
                  <Mail className="w-4 h-4 absolute right-4 pointer-events-none text-[#567C8D]" />
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
                    className="w-full text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none transition-all placeholder:text-[#567C8D]/60 bg-[#F5EFEB]/50 border border-[#C8D9E6] text-[#2F4156] focus:border-[#567C8D] focus:ring-2 focus:ring-[#567C8D]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 transition-colors text-[#567C8D] hover:text-[#2F4156]"
                    title={showPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs pt-0.5 text-[#567C8D]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#567C8D] text-[#567C8D] focus:ring-[#567C8D] w-3.5 h-3.5"
                  />
                  <span>{t.remember30Days}</span>
                </label>
                <button
                  type="button"
                  className="font-semibold hover:underline transition-colors text-[#567C8D] hover:text-[#2F4156]"
                >
                  {t.forgotPassword}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#567C8D] hover:bg-[#2F4156] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>{isRegistering ? t.createAccountBtn : t.signInBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle between Login and Register */}
            <div className="mt-5 text-center text-xs">
              <span className="text-[#567C8D]">
                {isRegistering ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError(null);
                }}
                className="font-bold hover:underline transition-colors text-[#2F4156]"
              >
                {isRegistering ? t.signInBtn : t.createAccountBtn}
              </button>
            </div>

            {/* Social / Demo Quick Login */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {/* Apple */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                title="Apple Login"
                className="w-9 h-9 rounded-full border border-[#C8D9E6] bg-white hover:bg-[#F5EFEB] text-[#2F4156] flex items-center justify-center transition-all"
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
                className="w-9 h-9 rounded-full border border-[#C8D9E6] bg-white hover:bg-[#F5EFEB] flex items-center justify-center transition-all"
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
                className="px-3 py-1.5 rounded-full border border-[#C8D9E6] bg-white text-[#2F4156] hover:bg-[#F5EFEB] text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#567C8D]" />
                <span>{t.demoAccess}</span>
              </button>
            </div>

            {/* Footer info */}
            <div className="mt-8 text-center text-[11px] flex items-center justify-center gap-3 text-[#567C8D]">
              <a href="#terminos" className="hover:underline">{t.terms}</a>
              <span>•</span>
              <a href="#soporte" className="hover:underline">{t.support}</a>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
};

export default AuthScreen;
