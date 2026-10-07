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
  ChevronRight
} from 'lucide-react';

interface OnboardingScreenProps {
  user: User;
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ user: _user, onFinish }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen w-full bg-[#2F4156] flex flex-col justify-between items-center p-3 sm:p-6 md:p-8 font-sans relative overflow-x-hidden select-none selection:bg-[#C8D9E6] selection:text-[#2F4156]">
      
      {/* ========================================================================= */}
      {/* 1. FUTURISTIC FINTECH VECTOR GRAPHICS (NAVY #2F4156 OUTER BACKGROUND)      */}
      {/* ========================================================================= */}
      {/* Glowing Ambient Orbs in Palette Colors */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none bg-[#567C8D]/40" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none bg-[#C8D9E6]/25" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#567C8D]/25 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyber Fintech Grid (Financial Ledger Matrix) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fintechGridMatrix" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8D9E6" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="1.5" fill="#C8D9E6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fintechGridMatrix)" />
      </svg>

      {/* Futuristic Financial Candlestick & Waveform Vector Lines */}
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
        {/* Subtle Candlestick bars in the background */}
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
      {/* 2. TOP HEADER (BRANDING & LANGUAGE SELECTOR)                               */}
      {/* ========================================================================= */}
      <header className="w-full max-w-4xl flex items-center justify-between relative z-20 py-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <NlsPayLogo className="w-7 h-7 drop-shadow" isDark={false} />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white block leading-none">
              NlsPay
            </span>
            <span className="text-[10px] text-[#C8D9E6] font-semibold tracking-wider uppercase">
              Financial Intelligence Hub
            </span>
          </div>
        </div>

        {/* Clean Language Popover */}
        <LanguageSelector variant="glass" />
      </header>

      {/* ========================================================================= */}
      {/* 3. CENTRAL "RECUADRO" (BEIGE #F5EFEB / BLANCO + LETRAS AZUL #2F4156)        */}
      {/* ========================================================================= */}
      <main className="w-full max-w-3xl my-auto py-4 z-20 flex justify-center">
        <div className="w-full rounded-[36px] sm:rounded-[44px] border-2 sm:border-3 border-white/90 shadow-[0_30px_90px_rgba(0,0,0,0.45)] p-6 sm:p-10 flex flex-col items-center text-center relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F5EFEB] to-[#F5EFEB] transition-all duration-300">
          
          {/* Subtle Ledger Micro-Grid Texture */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#2F4156 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* ----------------------------------------------------------------------- */}
          {/* 3.A. STEP BADGE PILL (• PASO 1 / 3)                                     */}
          {/* ----------------------------------------------------------------------- */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-mono font-bold tracking-widest uppercase shadow-sm relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#567C8D] animate-pulse" />
            <span className="text-[#567C8D]">{t.onboardingStepBadge}</span>
            <span className="text-[#2F4156] font-extrabold">{currentStep} / 3</span>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3.B. PASO 1: LA PROMESA DE VALOR (¿Qué es NlsPay?)                      */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="w-full flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-200 relative z-10">
              
              {/* Visual Showcase: Layered Animated NlsPay Core Card + Floating Satellites */}
              <div className="relative w-full max-w-md h-52 sm:h-56 flex items-center justify-center">
                
                {/* Back Glowing Aura in Sky Blue & Teal */}
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/40 via-[#567C8D]/25 to-[#2F4156]/20 rounded-[32px] blur-xl" />

                {/* Central Showcase Card with Animated Glowing NlsPay Logo */}
                <div className="relative z-10 w-44 h-44 rounded-[32px] bg-gradient-to-b from-[#2F4156] via-[#2F4156]/95 to-[#1c2937] border-2 border-[#C8D9E6]/50 shadow-2xl flex flex-col items-center justify-center p-5 transform transition-transform hover:scale-105">
                  <div className="relative mb-2">
                    <div className="absolute -inset-2 bg-[#567C8D]/70 rounded-full blur-md animate-pulse" />
                    <NlsPayLogo className="w-16 h-16 relative z-10 drop-shadow-xl" isDark={false} />
                  </div>
                  <span className="text-xs font-mono font-extrabold text-[#C8D9E6] tracking-wider">
                    NLSPAY CORE
                  </span>
                </div>

                {/* Left Floating Satellite Card in White with Shadow */}
                <div className="absolute left-0 sm:-left-4 top-4 z-20 px-3.5 py-2 rounded-2xl bg-white border border-[#C8D9E6] shadow-xl flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-7 h-7 rounded-xl bg-[#567C8D] text-white flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-bold text-[#567C8D] block leading-none">
                      Flujo de Caja
                    </span>
                    <span className="text-xs font-black text-[#2F4156]">+28.4% Neto</span>
                  </div>
                </div>

                {/* Right Floating Satellite Card in Navy & Sky Blue (#2F4156) */}
                <div className="absolute right-0 sm:-right-4 bottom-4 z-20 px-3.5 py-2 rounded-2xl bg-[#2F4156] border border-[#C8D9E6]/50 shadow-xl flex items-center gap-2 transform rotate-3 hover:rotate-0 transition-transform text-white">
                  <div className="w-7 h-7 rounded-xl bg-[#C8D9E6] text-[#2F4156] flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-bold text-[#C8D9E6] block leading-none">
                      Bóveda Segura
                    </span>
                    <span className="text-xs font-extrabold text-white">Analista 24/7</span>
                  </div>
                </div>

              </div>

              {/* Large Bold Typography in Blue (#2F4156 & #567C8D) */}
              <div className="space-y-3 max-w-xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2F4156] tracking-tight leading-tight">
                  <span>Bienvenido a NlsPay. </span>
                  <span className="text-[#567C8D] block sm:inline">
                    Tu centro de mando financiero.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-[#2F4156]/80 leading-relaxed font-normal px-2">
                  {t.onboardingStep1Desc}
                </p>
              </div>

              {/* 3 Feature Pills with White background and Blue text */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-semibold shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-[#567C8D]" />
                  <span>Rastreo en tiempo real</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-semibold shadow-xs">
                  <Target className="w-3.5 h-3.5 text-[#567C8D]" />
                  <span>Metas de ahorro</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-semibold shadow-xs">
                  <PieChart className="w-3.5 h-3.5 text-[#567C8D]" />
                  <span>Control total</span>
                </div>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 3.C. PASO 2: EL DIFERENCIADOR TECNOLÓGICO (¿Qué esperar?)               */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="w-full flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-200 relative z-10">
              
              {/* Visual Showcase: AI Intelligence Hub with Live Score Gauge */}
              <div className="relative w-full max-w-md h-52 sm:h-56 flex items-center justify-center">
                
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/40 via-[#567C8D]/25 to-[#2F4156]/20 rounded-[32px] blur-xl" />

                {/* Center Neural Engine Card with Animated Pulsing Brain */}
                <div className="relative z-10 w-44 h-44 rounded-[32px] bg-gradient-to-b from-[#2F4156] via-[#2F4156]/95 to-[#1c2937] border-2 border-[#C8D9E6]/50 shadow-2xl flex flex-col items-center justify-center p-5 transform transition-transform hover:scale-105">
                  <div className="relative mb-2">
                    <div className="absolute -inset-3 bg-[#567C8D]/60 rounded-full blur-md animate-pulse" />
                    <BrainCircuit className="w-14 h-14 text-[#C8D9E6] relative z-10" strokeWidth={1.8} />
                    <Sparkles className="w-5 h-5 text-white absolute -top-1 -right-1 z-20 animate-bounce" />
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-[#C8D9E6] tracking-widest uppercase">
                    NEURAL V2
                  </span>
                </div>

                {/* Left Floating Health Score Gauge Badge */}
                <div className="absolute left-0 sm:-left-4 top-4 z-20 px-3.5 py-2 rounded-2xl bg-white border border-[#C8D9E6] shadow-xl flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-bold text-[#567C8D] block leading-none">
                      Health Score
                    </span>
                    <span className="text-xs font-black text-[#2F4156]">885 / 1000 (Excelente)</span>
                  </div>
                </div>

                {/* Right Floating Spending Anomaly Alert Card */}
                <div className="absolute right-0 sm:-right-4 bottom-4 z-20 px-3.5 py-2 rounded-2xl bg-[#2F4156] border border-[#C8D9E6]/50 shadow-xl flex items-center gap-2 transform rotate-3 hover:rotate-0 transition-transform text-white">
                  <div className="w-7 h-7 rounded-xl bg-[#567C8D] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-bold text-[#C8D9E6] block leading-none">
                      Alerta Preventiva
                    </span>
                    <span className="text-xs font-extrabold text-white">Ahorro: $180k/mes</span>
                  </div>
                </div>

              </div>

              {/* Large Bold Typography in Blue (#2F4156 & #567C8D) */}
              <div className="space-y-3 max-w-xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2F4156] tracking-tight leading-tight">
                  <span>Decisiones respaldadas </span>
                  <span className="text-[#567C8D] block sm:inline">
                    por inteligencia.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-[#2F4156]/80 leading-relaxed font-normal px-2">
                  {t.onboardingStep2Desc}
                </p>
              </div>

              {/* AI Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-semibold shadow-xs">
                  <BrainCircuit className="w-3.5 h-3.5 text-[#567C8D]" />
                  <span>Auditoría de gastos hormiga</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-semibold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#567C8D]" />
                  <span>Conciliación fiscal</span>
                </div>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 3.D. PASO 3: EL PUENTE AL DASHBOARD (Llamado a la acción)               */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 3 && (
            <div className="w-full flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-200 relative z-10">
              
              {/* Visual Showcase: Mini Institutional Dashboard Preview */}
              <div className="relative w-full max-w-md h-52 sm:h-56 flex items-center justify-center">
                
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/40 via-[#567C8D]/25 to-[#2F4156]/20 rounded-[32px] blur-xl" />

                {/* Center Institutional Shield Card */}
                <div className="relative z-10 w-48 h-44 rounded-[32px] bg-gradient-to-b from-[#2F4156] via-[#2F4156]/95 to-[#1c2937] border-2 border-[#C8D9E6]/50 shadow-2xl flex flex-col items-center justify-center p-5 transform transition-transform hover:scale-105">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8D9E6] mb-1">
                    CAPITAL DISPONIBLE
                  </span>
                  <span className="text-xl font-black text-white font-sans">$34.820.000</span>
                  <span className="text-[10px] text-[#C8D9E6]/90 font-mono mt-1">
                    COP • 2 Tarjetas Activas
                  </span>
                  <div className="mt-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>100% CONECTADO</span>
                  </div>
                </div>

                {/* Left Mini Visa Card Floating */}
                <div className="absolute left-0 sm:-left-4 top-4 z-20 px-3.5 py-2.5 rounded-2xl bg-[#1b1c21] border border-[#567C8D] shadow-xl flex items-center gap-2 transform -rotate-6 hover:rotate-0 transition-transform text-white">
                  <span className="text-xs font-black tracking-tighter italic">VISA</span>
                  <span className="text-[11px] font-mono text-[#C8D9E6]">•••• 1810</span>
                </div>

                {/* Right Mini Mastercard Card Floating in White */}
                <div className="absolute right-0 sm:-right-4 bottom-4 z-20 px-3.5 py-2.5 rounded-2xl bg-white border border-[#C8D9E6] shadow-xl flex items-center gap-2 transform rotate-6 hover:rotate-0 transition-transform text-[#2F4156]">
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#2F4156]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#567C8D]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold">•••• 1423</span>
                </div>

              </div>

              {/* Large Bold Typography in Blue (#2F4156 & #567C8D) */}
              <div className="space-y-3 max-w-xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2F4156] tracking-tight leading-tight">
                  <span>Tu ecosistema </span>
                  <span className="text-[#567C8D] block sm:inline">
                    está listo.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-[#2F4156]/80 leading-relaxed font-normal px-2">
                  {t.onboardingStep3Desc}
                </p>
              </div>

              {/* Ready Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-semibold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#567C8D]" />
                <span>Cifrado de grado bancario activo</span>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 3.E. STEP INDICATORS & NAVIGATION BUTTONS                               */}
          {/* ----------------------------------------------------------------------- */}
          <div className="w-full max-w-md flex flex-col items-center gap-5 mt-8 pt-4 border-t border-[#C8D9E6] relative z-10">
            
            {/* Step Indicator Dots */}
            <div className="flex items-center gap-2.5">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step as 1 | 2 | 3)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentStep === step
                      ? 'w-9 bg-[#2F4156] shadow-sm'
                      : 'w-2.5 bg-[#C8D9E6] hover:bg-[#567C8D]'
                  }`}
                  aria-label={`Ir al paso ${step}`}
                />
              ))}
            </div>

            {/* Action Buttons Row */}
            <div className="w-full flex items-center justify-between gap-4">
              {/* Back Button */}
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#2F4156] text-xs sm:text-sm font-bold transition-all border border-[#C8D9E6] shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.onboardingBack}</span>
                </button>
              ) : (
                <div className="w-20" />
              )}

              {/* Next Button or Grand Finale CTA Button */}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#2F4156] hover:bg-[#1f2b38] text-white text-xs sm:text-sm font-black shadow-lg transition-all transform active:scale-95 ml-auto cursor-pointer"
                >
                  <span>{t.onboardingNext}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : (
                /* Big Standout CTA Button ("Entrar a mi portal") Destapa el dashboard */
                <button
                  type="button"
                  onClick={onFinish}
                  className="flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#2F4156] via-[#3a526c] to-[#2F4156] hover:from-[#567C8D] hover:to-[#2F4156] text-white text-sm sm:text-base font-black shadow-xl border border-[#C8D9E6] transition-all transform hover:scale-105 active:scale-95 ml-auto group cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#C8D9E6] group-hover:text-white transition-colors" />
                  <span>{t.onboardingCta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER (ECOSYSTEM DETAILS & COPYRIGHT)                                  */}
      {/* ========================================================================= */}
      <footer className="w-full max-w-4xl flex items-center justify-between text-[#C8D9E6]/70 text-xs py-2 px-2 z-20">
        <span>NlsPay Ecosystem • Finanzas & Control de Gastos</span>
        <span>© 2026 NlsPay Institutional</span>
      </footer>

    </div>
  );
};

export default OnboardingScreen;
