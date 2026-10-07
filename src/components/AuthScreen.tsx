import React, { useState } from 'react';
import { Mail, Eye, EyeOff, User as UserIcon, ArrowRight } from 'lucide-react';
import type { User } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
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
      setError('Por favor completa todos los campos.');
      return;
    }

    if (isRegistering && !name.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      return;
    }

    // Retrieve or create stored users in localStorage
    const storedUsersJson = localStorage.getItem('nlspay_users');
    const storedUsers: Record<string, { name: string; password: string; avatar: string }> = storedUsersJson 
      ? JSON.parse(storedUsersJson) 
      : {};

    if (isRegistering) {
      if (storedUsers[email.toLowerCase()]) {
        setError('Ya existe una cuenta con este correo electrónico.');
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
      // Login mode
      // Default initial mock user check
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
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
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
    <div className="min-h-screen w-full bg-[#1e3fe4] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans">
      {/* Background radial highlights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Rounded Modal Container (Matching Image 2) */}
      <div className="w-full max-w-[1040px] bg-white rounded-[36px] sm:rounded-[44px] shadow-2xl p-4 sm:p-7 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Form */}
        <div className="px-3 sm:px-8 py-4 sm:py-6 flex flex-col justify-center">
          {/* Header House Emoji / Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <span className="text-3xl mb-2 select-none" role="img" aria-label="home">
              🏡
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              {isRegistering ? 'Crea tu cuenta' : 'Welcome home'}
            </h1>
            <p className="text-xs sm:text-sm text-[#6b7280] font-normal mt-1">
              {isRegistering 
                ? 'Ingresa tus datos para registrarte en NlsPay.' 
                : 'Please enter your details.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fafafa] border border-[#e5e7eb] focus:border-[#1e3fe4] text-[#111827] text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3fe4]/20 transition-all placeholder:text-[#9ca3af]"
                  />
                  <UserIcon className="w-4 h-4 text-[#9ca3af] absolute right-4 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fafafa] border border-[#e5e7eb] focus:border-[#1e3fe4] text-[#111827] text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3fe4]/20 transition-all placeholder:text-[#9ca3af]"
                />
                <Mail className="w-4 h-4 text-[#9ca3af] absolute right-4 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#fafafa] border border-[#e5e7eb] focus:border-[#1e3fe4] text-[#111827] text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3fe4]/20 transition-all placeholder:text-[#9ca3af]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#9ca3af] hover:text-[#4b5563] absolute right-4 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#6b7280] pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#d1d5db] text-[#1e3fe4] focus:ring-[#1e3fe4] w-3.5 h-3.5"
                />
                <span>Remember for 30 days</span>
              </label>

              <button
                type="button"
                className="text-[#6b7280] hover:text-[#1e3fe4] font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Main Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#1b3ee3] hover:bg-[#1634c4] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>{isRegistering ? 'Crear Cuenta' : 'Login'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* "or" Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-[#e5e7eb] w-full" />
            <span className="bg-white px-3 text-[11px] text-[#9ca3af] font-medium">
              or
            </span>
            <div className="border-t border-[#e5e7eb] w-full" />
          </div>

          {/* Social Icons (Apple, Google, Facebook) */}
          <div className="flex items-center justify-center gap-3.5 mb-5">
            {/* Apple */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-10 h-10 rounded-full border border-[#e5e7eb] hover:border-[#1e3fe4] hover:bg-slate-50 flex items-center justify-center transition-all group"
              title="Continuar con Apple"
            >
              <svg className="w-4 h-4 fill-[#111827]" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.14-.54 2.77-1.28z"/>
              </svg>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-10 h-10 rounded-full border border-[#e5e7eb] hover:border-[#1e3fe4] hover:bg-slate-50 flex items-center justify-center transition-all group"
              title="Continuar con Google"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                <path fill="#FBBC05" d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7 0-1.2.2-2 .4-2.7L1.9 6.4C.7 8.8 0 10.4 0 12s.7 3.2 1.9 5.6l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16C3.7 19.8 7.5 23 12 23z" />
              </svg>
            </button>

            {/* Facebook / Social */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-10 h-10 rounded-full border border-[#e5e7eb] hover:border-[#1e3fe4] hover:bg-slate-50 flex items-center justify-center transition-all group"
              title="Continuar con Facebook"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>

          {/* Toggle between Login and Register */}
          <div className="text-center text-xs text-[#6b7280]">
            <span>{isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}</span>
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(null);
              }}
              className="text-[#1e3fe4] hover:underline font-semibold"
            >
              {isRegistering ? 'Inicia sesión' : 'Regístrate aquí'}
            </button>
          </div>
        </div>

        {/* Right Column: 3D Fluid Organic Blue/Violet Artwork (Exact match of Image 2) */}
        <div className="hidden lg:block h-full min-h-[520px] rounded-[32px] overflow-hidden relative shadow-inner bg-gradient-to-tr from-[#080d2c] via-[#10247a] to-[#2545d9]">
          {/* Layered smooth organic waves */}
          <div className="absolute inset-0 opacity-90 mix-blend-screen">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 600 750"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f6cf7" />
                  <stop offset="50%" stopColor="#2a45ca" />
                  <stop offset="100%" stopColor="#0a1548" />
                </linearGradient>
                <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#3730a3" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#090d29" />
                </linearGradient>
                <linearGradient id="waveGlow" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Large organic curves */}
              <path
                d="M100 -50 C 350 100, 500 300, 420 520 C 350 700, 100 800, -50 800 L -50 -50 Z"
                fill="url(#waveGrad1)"
              />
              <path
                d="M650 100 C 450 250, 200 450, 280 620 C 350 780, 550 850, 700 850 L 700 100 Z"
                fill="url(#waveGrad2)"
              />
              <path
                d="M300 180 C 420 280, 480 460, 400 580 C 320 700, 180 750, 80 700 C 220 550, 180 320, 300 180 Z"
                fill="url(#waveGlow)"
              />
            </svg>
          </div>

          {/* Ambient velvety lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b24]/90 via-transparent to-[#1a38cf]/30 pointer-events-none" />

          {/* Subtle brand tag in bottom right */}
          <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-wider font-semibold">
            NlsPay System 2.0
          </div>
        </div>

      </div>
    </div>
  );
};
