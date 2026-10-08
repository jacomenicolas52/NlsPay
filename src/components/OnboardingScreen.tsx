import React, { useState } from 'react';
import { NlsPayLogo } from './NlsPayLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import type { User } from '../types';
import { 
  BrainCircuit, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Zap, 
  Target, 
  PieChart, 
  Lock,
  Maximize
} from 'lucide-react';

interface OnboardingScreenProps {
  user: User;
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ user: _user, onFinish }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showRestoredToast, setShowRestoredToast] = useState(false);

  // Restore onboarding state to Step 1 with smooth animation and notification
  const handleRestore = () => {
    setIsRestoring(true);
    setCurrentStep(1);
    setShowRestoredToast(true);
    setTimeout(() => setIsRestoring(false), 700);
    setTimeout(() => setShowRestoredToast(false), 2400);
  };

  return (
    <div className="min-h-screen w-full bg-[#17202a] flex flex-col justify-between items-center py-5 sm:py-7 px-4 font-sans relative overflow-x-hidden select-none selection:bg-[#C8D9E6] selection:text-[#2F4156]">
      
      {/* Floating Toast Notification when Restoring */}
      {showRestoredToast && (
        <div className="fixed top-20 z-50 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-[#1e2d3d]/95 text-cyan-300 border border-cyan-400/40 shadow-2xl backdrop-blur-md text-xs font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Página restaurada al inicio</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. FUTURISTIC FINTECH VECTOR GRAPHICS & AMBIENT GLOW                       */}
      {/* ========================================================================= */}
      {/* Soft Ambient Teal & Navy Glows */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none bg-[#567C8D]/30" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none bg-[#C8D9E6]/20" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#567C8D]/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Blueprint Grid Matrix */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fintechGridMatrix" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8D9E6" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="1.5" fill="#C8D9E6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fintechGridMatrix)" />
      </svg>

      {/* Financial Trendline & Candlestick Bars */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 900">
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

      {/* ========================================================================= */}
      {/* 2. TOP HEADER BAR: MÁS LARGA QUE LA UNIDAD CENTRAL (MAX-W-7XL)            */}
      {/* ========================================================================= */}
      <header className="w-[96%] max-w-6xl xl:max-w-7xl px-4 sm:px-8 py-3.5 rounded-2xl bg-[#1e2d3d]/90 backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-between z-30 transition-all mb-4 sm:mb-6">
        {/* NlsPay Brand with Interactive Icon (Hover to Restore, Click to Reload) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            onMouseEnter={handleRestore}
            title="Acerca el mouse para restaurar al inicio • Clic para recargar la página"
            className="group relative w-10 h-10 rounded-xl bg-[#2F4156] hover:bg-[#3d546f] active:scale-95 border border-white/10 hover:border-cyan-400/50 shadow-md hover:shadow-cyan-500/25 flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer"
          >
            <div className={`transition-all duration-500 ${isRestoring ? 'rotate-360 scale-110' : 'group-hover:rotate-12 group-hover:scale-105'}`}>
              {/* EXACT OFFICIAL LOGO COLORS: Left #C8D9E6, Diagonal #567C8D, Right #FFFFFF */}
              <NlsPayLogo className="w-5 h-5 drop-shadow-sm" isDark={false} />
            </div>
            {/* Animated glow ping when restoring */}
            {isRestoring && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>
          <div>
            <button
              type="button"
              onClick={handleRestore}
              onMouseEnter={handleRestore}
              className="flex items-center gap-1.5 leading-none text-left cursor-pointer group"
              title="Restaurar al inicio"
            >
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                NlsPay
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </button>
            <span className="text-[9px] sm:text-[10px] text-[#C8D9E6] font-bold tracking-widest uppercase mt-0.5 block">
              Financial Intelligence Hub
            </span>
          </div>
        </div>

        {/* Labeled Language Selector: [ 🌐 ES Español (ES) ∨ ] */}
        <LanguageSelector variant="labeled" />
      </header>

      {/* ========================================================================= */}
      {/* 3. CENTRAL "CONTAINER" (UNIDAD CENTRAL TOTALMENTE DESPEJADA DEL DROPDOWN) */}
      {/* ========================================================================= */}
      <main className="w-full max-w-xl sm:max-w-2xl lg:max-w-[760px] my-auto py-2 z-20 flex justify-center">
        <div className="w-full rounded-[36px] sm:rounded-[44px] bg-white p-7 sm:p-12 lg:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.45)] border border-slate-100 flex flex-col items-center text-center relative transition-all duration-300">
          
          {/* ----------------------------------------------------------------------- */}
          {/* 3.A. STEP BADGE PILL (• PASO 1 / 3)                                     */}
          {/* ----------------------------------------------------------------------- */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 text-slate-600 text-xs sm:text-sm font-mono font-bold uppercase shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.onboardingStepBadge} {currentStep} / 3</span>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3.B. PASO 1: LA PROMESA DE VALOR (¿Qué es NlsPay?)                      */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
              
              {/* Visual Showcase: Dark Squircle Card with Original Logo + Satellites */}
              <div className="relative w-full max-w-md h-48 sm:h-56 flex items-center justify-center mb-6">
                
                {/* Central Dark Squircle Card with Hover Restore Interaction */}
                <div 
                  onMouseEnter={handleRestore}
                  className="w-40 h-40 sm:w-44 sm:h-44 rounded-[28px] bg-[#1e2d3d] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-4 relative z-10 transform transition-transform hover:scale-105 cursor-pointer group"
                  title="Acerca el mouse para restaurar al inicio"
                >
                  <div className="relative mb-2 flex items-center justify-center">
                    <div className={`absolute -inset-2 bg-[#567C8D]/40 rounded-full blur-md ${isRestoring ? 'animate-ping bg-cyan-400/60' : 'animate-pulse'}`} />
                    {/* RESTORED VECTOR LOGO: Centered SVG with exact original colors (#C8D9E6, #567C8D, #FFFFFF) */}
                    <div className={`transition-transform duration-500 ${isRestoring ? 'rotate-360 scale-110' : 'group-hover:scale-105'}`}>
                      <NlsPayLogo className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-xl shrink-0" isDark={false} />
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold text-[#C8D9E6] tracking-wider mt-1 block">
                    NLSPAY CORE
                  </span>
                </div>

                {/* Left Satellite: Flujo de Caja */}
                <div className="absolute -left-1 sm:left-4 md:left-8 top-3 sm:top-4 z-20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center gap-2.5 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#567C8D] text-white flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#567C8D] block leading-none">
                      Flujo de Caja
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#2F4156]">+28.4% Neto</span>
                  </div>
                </div>

                {/* Right Satellite: Bóveda Segura */}
                <div className="absolute -right-1 sm:right-4 md:right-8 bottom-3 sm:bottom-4 z-20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#1e2d3d] border border-white/10 shadow-xl flex items-center gap-2.5 transform rotate-3 hover:rotate-0 transition-transform text-white">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C8D9E6] text-[#2F4156] flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#C8D9E6] block leading-none">
                      Bóveda Segura
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">Analista 24/7</span>
                  </div>
                </div>

              </div>

              {/* Main Headline (Larger typography) */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1e2d3d] tracking-tight leading-[1.15] mb-4">
                Bienvenido a NlsPay. <br />
                <span className="text-[#0ea5e9]">Tu centro de mando financiero.</span>
              </h1>

              {/* Description (Enhanced scale & readability) */}
              <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto mb-7 font-normal px-2">
                {t.onboardingStep1Desc}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-7">
                <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs">
                  <Zap className="w-4 h-4 text-[#0ea5e9]" />
                  <span>Rastreo en tiempo real</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs">
                  <Target className="w-4 h-4 text-[#567C8D]" />
                  <span>Metas de ahorro</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs">
                  <PieChart className="w-4 h-4 text-[#0ea5e9]" />
                  <span>Control total</span>
                </div>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 3.C. PASO 2: EL DIFERENCIADOR TECNOLÓGICO (¿Qué esperar?)               */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
              
              {/* Visual Showcase: Neural Brain in Cyan with Glow (Exact match to Reference) */}
              <div className="relative w-full max-w-md h-48 sm:h-56 flex items-center justify-center mb-6">
                
                {/* Central Dark Squircle Card */}
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-[28px] bg-[#1e2d3d] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-4 relative z-10 transform transition-transform hover:scale-105">
                  <div className="relative mb-2 flex items-center justify-center">
                    <div className="absolute -inset-3 bg-cyan-500/30 rounded-full blur-md animate-pulse" />
                    <BrainCircuit className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-300 relative z-10" strokeWidth={1.8} />
                    <Sparkles className="w-5 h-5 text-white absolute -top-1 -right-1 z-20 animate-bounce" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold text-[#C8D9E6] tracking-widest uppercase mt-1 block">
                    NEURAL V2
                  </span>
                </div>

                {/* Left Satellite: Health Score (as in reference image) */}
                <div className="absolute -left-1 sm:left-4 md:left-8 top-3 sm:top-4 z-20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center gap-2.5 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block leading-none">
                      HEALTH SCORE
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#1e2d3d]">
                      885 / 1000 <span className="text-emerald-600 font-bold">(Excelente)</span>
                    </span>
                  </div>
                </div>

                {/* Right Satellite: Alerta Preventiva (as in reference image) */}
                <div className="absolute -right-1 sm:right-4 md:right-8 bottom-3 sm:bottom-4 z-20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#1e2d3d] border border-white/10 shadow-xl flex items-center gap-2.5 transform rotate-3 hover:rotate-0 transition-transform text-white">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-900/60 text-cyan-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-cyan-300 block leading-none">
                      ALERTA PREVENTIVA
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">Ahorro: $180k/mes</span>
                  </div>
                </div>

              </div>

              {/* Main Headline (Larger typography) */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1e2d3d] tracking-tight leading-[1.15] mb-4">
                Decisiones respaldadas por <br />
                <span className="text-[#0ea5e9]">inteligencia.</span>
              </h1>

              {/* Description (Enhanced scale & readability) */}
              <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto mb-7 font-normal px-2">
                {t.onboardingStep2Desc}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-7">
                <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs">
                  <Maximize className="w-4 h-4 text-[#0ea5e9]" />
                  <span>Auditoría de gastos hormiga</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#0ea5e9]" />
                  <span>Conciliación fiscal</span>
                </div>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 3.D. PASO 3: EL PUENTE AL DASHBOARD (Llamado a la acción)               */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 3 && (
            <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
              
              {/* Visual Showcase: Capital Disponible + Tarjetas */}
              <div className="relative w-full max-w-md h-48 sm:h-56 flex items-center justify-center mb-6">
                
                {/* Central Dark Squircle Card */}
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-[28px] bg-[#1e2d3d] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-4 relative z-10 transform transition-transform hover:scale-105">
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-[#C8D9E6] mb-1">
                    CAPITAL DISPONIBLE
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">$34.820.000</span>
                  <span className="text-[10px] sm:text-xs text-[#C8D9E6]/80 font-mono mt-1">
                    COP • 2 Tarjetas Activas
                  </span>
                  <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>100% CONECTADO</span>
                  </div>
                </div>

                {/* Left Satellite: Visa Card */}
                <div className="absolute -left-1 sm:left-4 md:left-8 top-3 sm:top-4 z-20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#1b1c21] border border-slate-700 shadow-xl flex items-center gap-2.5 transform -rotate-3 hover:rotate-0 transition-transform text-white">
                  <span className="text-xs sm:text-sm font-black tracking-tighter italic">VISA</span>
                  <span className="text-xs sm:text-sm font-mono text-[#C8D9E6]">•••• 1810</span>
                </div>

                {/* Right Satellite: Mastercard */}
                <div className="absolute -right-1 sm:right-4 md:right-8 bottom-3 sm:bottom-4 z-20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center gap-2.5 transform rotate-3 hover:rotate-0 transition-transform text-[#2F4156]">
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-[#2F4156]" />
                    <div className="w-4 h-4 rounded-full bg-[#567C8D]" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-bold">•••• 1423</span>
                </div>

              </div>

              {/* Main Headline (Larger typography) */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1e2d3d] tracking-tight leading-[1.15] mb-4">
                Tu ecosistema <br />
                <span className="text-[#0ea5e9]">está listo.</span>
              </h1>

              {/* Description (Enhanced scale & readability) */}
              <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto mb-7 font-normal px-2">
                {t.onboardingStep3Desc}
              </p>

              {/* Feature Pill */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-7">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#0ea5e9]" />
                  <span>Cifrado de grado bancario activo</span>
                </div>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 3.E. SUBTLE DIVIDER, STEP DOTS & NAVIGATION BUTTONS                     */}
          {/* ----------------------------------------------------------------------- */}
          <div className="w-44 h-px bg-slate-100 mb-5" />

          {/* Step Indicator Dots */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(step as 1 | 2 | 3)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentStep === step
                    ? 'w-8 bg-[#1e2d3d]'
                    : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Ir al paso ${step}`}
              />
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-4 w-full max-w-sm">
            {/* Back Button */}
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                className="flex-1 py-3 px-6 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm sm:text-base font-bold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.onboardingBack}</span>
              </button>
            )}

            {/* Next Button or Grand Finale CTA Button */}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)}
                className={`${
                  currentStep === 1 ? 'w-full max-w-[240px]' : 'flex-1'
                } py-3 px-7 rounded-full bg-[#1e2d3d] hover:bg-[#2F4156] text-white text-sm sm:text-base font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer`}
              >
                <span>{t.onboardingNext}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              /* Grand Finale CTA ("Entrar a mi portal") Destapa el dashboard */
              <button
                type="button"
                onClick={onFinish}
                className="flex-1 py-3 px-7 rounded-full bg-[#1e2d3d] hover:bg-[#2F4156] text-white text-sm sm:text-base font-bold shadow-lg shadow-sky-950/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.onboardingCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. CLEAN MINIMAL FOOTER (NO DESIGN OPTIONS BUTTON)                         */}
      {/* ========================================================================= */}
      <footer className="w-[96%] max-w-6xl xl:max-w-7xl flex items-center justify-between text-slate-400 text-xs sm:text-sm py-2 px-4 z-20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
          <span>NlsPay Ecosystem • Finanzas & Control de Gastos</span>
        </div>
        <span>© 2026 NlsPay Institutional</span>
      </footer>

    </div>
  );
};

export default OnboardingScreen;
