import React, { useState } from 'react';
import { Mail, Eye, EyeOff, User as UserIcon, Sparkles, ArrowRight } from 'lucide-react';
import { NlsPayLogo } from './NlsPayLogo';
import type { User } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

type DesignProposal = 'split' | 'floating' | 'portal';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  // Proposal switcher: 'split' (Propuesta 1), 'floating' (Propuesta 2), 'portal' (Propuesta 3)
  const [selectedProposal, setSelectedProposal] = useState<DesignProposal>('split');

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
      setError('Por favor completa todos los campos.');
      return;
    }

    if (isRegistering && !name.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      return;
    }

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

  // Reusable Form Inputs Component matching strict corporate palette (#2F4156, #567C8D, #C8D9E6, #F5EFEB, #FFFFFF)
  const renderAuthForm = (isDarkTheme = false) => {
    return (
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkTheme ? 'text-white' : 'text-[#2F4156]'}`}>
            {isRegistering ? 'Crea tu Cuenta' : 'Inicia Sesión en NlsPay'}
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 ${isDarkTheme ? 'text-[#C8D9E6]' : 'text-[#567C8D]'}`}>
            {isRegistering
              ? 'Regístrate para gestionar tus finanzas con precisión'
              : 'Tu ecosistema financiero inteligente y seguro'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs text-center font-semibold animate-pulse">
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
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none transition-all placeholder:text-[#567C8D]/60 ${
                    isDarkTheme
                      ? 'bg-[#2F4156]/60 border border-[#567C8D] text-white focus:border-[#C8D9E6] focus:ring-2 focus:ring-[#C8D9E6]/20'
                      : 'bg-[#F5EFEB]/50 border border-[#C8D9E6] text-[#2F4156] focus:border-[#567C8D] focus:ring-2 focus:ring-[#567C8D]/15'
                  }`}
                />
                <UserIcon className={`w-4 h-4 absolute right-4 pointer-events-none ${isDarkTheme ? 'text-[#C8D9E6]' : 'text-[#567C8D]'}`} />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <div className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Email o usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none transition-all placeholder:text-[#567C8D]/60 ${
                  isDarkTheme
                    ? 'bg-[#2F4156]/60 border border-[#567C8D] text-white focus:border-[#C8D9E6] focus:ring-2 focus:ring-[#C8D9E6]/20'
                    : 'bg-[#F5EFEB]/50 border border-[#C8D9E6] text-[#2F4156] focus:border-[#567C8D] focus:ring-2 focus:ring-[#567C8D]/15'
                }`}
              />
              <Mail className={`w-4 h-4 absolute right-4 pointer-events-none ${isDarkTheme ? 'text-[#C8D9E6]' : 'text-[#567C8D]'}`} />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full text-xs sm:text-sm rounded-full pl-5 pr-11 py-3 focus:outline-none transition-all placeholder:text-[#567C8D]/60 ${
                  isDarkTheme
                    ? 'bg-[#2F4156]/60 border border-[#567C8D] text-white focus:border-[#C8D9E6] focus:ring-2 focus:ring-[#C8D9E6]/20'
                    : 'bg-[#F5EFEB]/50 border border-[#C8D9E6] text-[#2F4156] focus:border-[#567C8D] focus:ring-2 focus:ring-[#567C8D]/15'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 transition-colors ${isDarkTheme ? 'text-[#C8D9E6] hover:text-white' : 'text-[#567C8D] hover:text-[#2F4156]'}`}
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className={`flex items-center justify-between text-[11px] sm:text-xs pt-0.5 ${isDarkTheme ? 'text-[#C8D9E6]' : 'text-[#567C8D]'}`}>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#567C8D] text-[#567C8D] focus:ring-[#567C8D] w-3.5 h-3.5"
              />
              <span>Recordar 30 días</span>
            </label>
            <button
              type="button"
              className={`font-semibold hover:underline transition-colors ${isDarkTheme ? 'text-[#C8D9E6] hover:text-white' : 'text-[#567C8D] hover:text-[#2F4156]'}`}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#567C8D] hover:bg-[#2F4156] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>{isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="mt-5 text-center text-xs">
          <span className={isDarkTheme ? 'text-[#C8D9E6]' : 'text-[#567C8D]'}>
            {isRegistering ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
            }}
            className={`font-bold hover:underline transition-colors ${isDarkTheme ? 'text-white' : 'text-[#2F4156]'}`}
          >
            {isRegistering ? 'Inicia Sesión' : 'Regístrate'}
          </button>
        </div>

        {/* Social / Demo Quick Login */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {/* Apple */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            title="Acceso rápido con Apple"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              isDarkTheme
                ? 'border-[#567C8D] bg-[#2F4156] hover:bg-[#567C8D] text-white'
                : 'border-[#C8D9E6] bg-white hover:bg-[#F5EFEB] text-[#2F4156]'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.14-.54 2.77-1.28z"/>
            </svg>
          </button>

          {/* Google */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            title="Acceso rápido con Google"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              isDarkTheme
                ? 'border-[#567C8D] bg-[#2F4156] hover:bg-[#567C8D]'
                : 'border-[#C8D9E6] bg-white hover:bg-[#F5EFEB]'
            }`}
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
            className={`px-3 py-1.5 rounded-full border text-[11px] font-bold flex items-center gap-1.5 transition-all ${
              isDarkTheme
                ? 'border-[#567C8D] bg-[#2F4156] text-[#C8D9E6] hover:bg-[#567C8D] hover:text-white'
                : 'border-[#C8D9E6] bg-white text-[#2F4156] hover:bg-[#F5EFEB]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#567C8D]" />
            <span>Acceso Demo</span>
          </button>
        </div>

        {/* Footer info */}
        <div className={`mt-8 text-center text-[11px] flex items-center justify-center gap-3 ${isDarkTheme ? 'text-[#C8D9E6]/70' : 'text-[#567C8D]'}`}>
          <a href="#terminos" className="hover:underline">Términos</a>
          <span>•</span>
          <a href="#soporte" className="hover:underline">Soporte</a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#F5EFEB] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 font-sans selection:bg-[#C8D9E6] selection:text-[#2F4156] relative">
      
      {/* Top Floating Proposal Switcher (Allows viewing Proposal 1, 2, and 3 from user images) */}
      <div className="mb-4 z-30 flex items-center bg-white/90 backdrop-blur-md rounded-full p-1 border border-[#C8D9E6] shadow-sm">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F4156] px-3 hidden sm:inline">
          Propuestas:
        </span>
        <button
          type="button"
          onClick={() => setSelectedProposal('split')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedProposal === 'split'
              ? 'bg-[#2F4156] text-white shadow'
              : 'text-[#567C8D] hover:text-[#2F4156]'
          }`}
        >
          Opción 1: Split Screen
        </button>
        <button
          type="button"
          onClick={() => setSelectedProposal('floating')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedProposal === 'floating'
              ? 'bg-[#2F4156] text-white shadow'
              : 'text-[#567C8D] hover:text-[#2F4156]'
          }`}
        >
          Opción 2: Floating Card
        </button>
        <button
          type="button"
          onClick={() => setSelectedProposal('portal')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedProposal === 'portal'
              ? 'bg-[#2F4156] text-white shadow'
              : 'text-[#567C8D] hover:text-[#2F4156]'
          }`}
        >
          Opción 3: Dark Portal
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PROPUESTA 1: SPLIT SCREEN WITH INNOVATION (Exact representation of Opción 1) */}
      {/* ========================================================================= */}
      {selectedProposal === 'split' && (
        <div className="w-full max-w-[1020px] min-h-[600px] bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl border border-[#C8D9E6]/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
          
          {/* Left Column: Navy Dark Split Screen with Logo & Quantum Mesh */}
          <div className="lg:col-span-5 bg-[#2F4156] p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden">
            
            {/* Subtle background mesh points */}
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
                {/* Ambient glow behind geometry */}
                <div className="absolute w-40 h-40 bg-[#567C8D]/40 rounded-full blur-2xl" />
                <div className="absolute w-24 h-24 bg-[#C8D9E6]/30 rounded-full blur-xl" />

                {/* SVG Geometric Constellation Polyhedron */}
                <svg viewBox="0 0 200 200" className="w-full h-full relative z-10" fill="none">
                  {/* Concentric subtle rings */}
                  <circle cx="100" cy="100" r="75" stroke="#567C8D" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx="100" cy="100" r="50" stroke="#C8D9E6" strokeWidth="1" opacity="0.3" />

                  {/* Wireframe edges */}
                  <g stroke="#C8D9E6" strokeWidth="1.2" opacity="0.85">
                    <line x1="100" y1="35" x2="155" y2="65" />
                    <line x1="155" y1="65" x2="165" y2="125" />
                    <line x1="165" y1="125" x2="125" y2="165" />
                    <line x1="125" y1="165" x2="75" y2="165" />
                    <line x1="75" y1="165" x2="35" y2="125" />
                    <line x1="35" y1="125" x2="45" y2="65" />
                    <line x1="45" y1="65" x2="100" y2="35" />

                    {/* Inner polygon connections */}
                    <line x1="100" y1="35" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                    <line x1="155" y1="65" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                    <line x1="165" y1="125" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                    <line x1="125" y1="165" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                    <line x1="75" y1="165" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                    <line x1="35" y1="125" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />
                    <line x1="45" y1="65" x2="100" y2="100" stroke="#567C8D" strokeWidth="1.5" />

                    {/* Cross chords */}
                    <line x1="45" y1="65" x2="155" y2="65" stroke="#567C8D" strokeWidth="0.8" opacity="0.6" />
                    <line x1="35" y1="125" x2="165" y2="125" stroke="#567C8D" strokeWidth="0.8" opacity="0.6" />
                    <line x1="45" y1="65" x2="125" y2="165" stroke="#C8D9E6" strokeWidth="0.8" opacity="0.5" />
                    <line x1="155" y1="65" x2="75" y2="165" stroke="#C8D9E6" strokeWidth="0.8" opacity="0.5" />
                  </g>

                  {/* Luminous Vertex Nodes */}
                  <g fill="#FFFFFF">
                    <circle cx="100" cy="35" r="3.5" fill="#C8D9E6" />
                    <circle cx="155" cy="65" r="3.5" fill="#C8D9E6" />
                    <circle cx="165" cy="125" r="3.5" fill="#C8D9E6" />
                    <circle cx="125" cy="165" r="3.5" fill="#C8D9E6" />
                    <circle cx="75" cy="165" r="3.5" fill="#C8D9E6" />
                    <circle cx="35" cy="125" r="3.5" fill="#C8D9E6" />
                    <circle cx="45" cy="65" r="3.5" fill="#C8D9E6" />
                    {/* Central glowing core node */}
                    <circle cx="100" cy="100" r="5" fill="#FFFFFF" />
                    <circle cx="100" cy="100" r="9" stroke="#C8D9E6" strokeWidth="1.5" opacity="0.75" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Bottom: Feature Callouts */}
            <div className="relative z-10 pt-4 border-t border-[#567C8D]/40">
              <h3 className="text-sm font-bold text-white mb-2 tracking-wide">
                Cifrado Cuántico y Conectividad Analítica
              </h3>
              <ul className="space-y-1.5 text-xs text-[#C8D9E6]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8D9E6]" />
                  <span>Cifrado Cuántico y Conectividad Analítica</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#567C8D]" />
                  <span>Innovación y Seguridad en un ecosistema premium</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Clean White Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
            {renderAuthForm(false)}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PROPUESTA 2: FLOATING INNOVATIVE CARD (Opción 2) */}
      {/* ========================================================================= */}
      {selectedProposal === 'floating' && (
        <div className="w-full max-w-[480px] bg-white rounded-[36px] shadow-2xl border border-[#C8D9E6]/70 p-8 sm:p-10 flex flex-col items-center transition-all relative">
          
          {/* Top 3D Isometric "N" Architecture Graphic in Navy & Teal */}
          <div className="w-40 h-40 mb-3 flex items-center justify-center relative">
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none">
              {/* Isometric blocks composing the 3D N */}
              {/* Block 1 (Left Tall Pillar) */}
              <polygon points="40,90 60,80 60,130 40,140" fill="#2F4156" />
              <polygon points="60,80 80,90 80,140 60,130" fill="#567C8D" />
              <polygon points="40,90 60,80 80,90 60,100" fill="#C8D9E6" />

              {/* Block 2 (Central N Tower) */}
              <polygon points="70,50 90,40 90,110 70,120" fill="#2F4156" />
              <polygon points="90,40 110,50 110,120 90,110" fill="#567C8D" />
              <polygon points="70,50 90,40 110,50 90,60" fill="#C8D9E6" />

              {/* Block 3 (Diagonal Connector) */}
              <polygon points="50,110 70,100 100,120 80,130" fill="#567C8D" />
              <polygon points="70,100 90,110 80,130 60,120" fill="#C8D9E6" />

              {/* Block 4 (Right Tower) */}
              <polygon points="100,70 120,60 120,130 100,140" fill="#2F4156" />
              <polygon points="120,60 140,70 140,140 120,130" fill="#567C8D" />
              <polygon points="100,70 120,60 140,70 120,80" fill="#C8D9E6" />
            </svg>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <NlsPayLogo className="w-7 h-7" isDark={true} />
            <span className="text-xl font-extrabold text-[#2F4156]">NlsPay</span>
          </div>

          <p className="text-xs text-[#567C8D] font-semibold text-center mb-6">
            Tu control financiero inteligente
          </p>

          <div className="w-full">
            {renderAuthForm(false)}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PROPUESTA 3: INTERACTIVE DARK PORTAL (Opción 3) */}
      {/* ========================================================================= */}
      {selectedProposal === 'portal' && (
        <div className="w-full max-w-[500px] bg-[#2F4156] rounded-[36px] shadow-2xl border border-[#567C8D]/40 p-8 sm:p-10 flex flex-col items-center relative overflow-hidden transition-all text-white">
          
          {/* Cosmic Portal Swirl Background in Sky Blue & Teal */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
              <ellipse cx="200" cy="200" rx="160" ry="160" stroke="#C8D9E6" strokeWidth="1.5" strokeDasharray="10 15" opacity="0.3" />
              <ellipse cx="200" cy="200" rx="120" ry="120" stroke="#567C8D" strokeWidth="2" strokeDasharray="8 12" opacity="0.5" />
              <ellipse cx="200" cy="200" rx="80" ry="80" stroke="#C8D9E6" strokeWidth="2.5" opacity="0.6" />
            </svg>
          </div>

          {/* Frosted Glassmorphism Card */}
          <div className="relative z-10 w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col items-center mb-6 text-center">
              <NlsPayLogo className="w-12 h-12 mb-3 drop-shadow" isDark={false} />
              <h2 className="text-2xl font-extrabold text-white tracking-tight">NlsPay</h2>
              <p className="text-xs text-[#C8D9E6] font-medium mt-1">
                Seguridad Total y Acceso Institucional
              </p>
            </div>

            {renderAuthForm(true)}
          </div>

          <div className="relative z-10 mt-6 text-[10px] text-[#C8D9E6]/60 text-center">
            © 2026 NlsPay. Todos los derechos reservados.
          </div>
        </div>
      )}

    </div>
  );
};

export default AuthScreen;
