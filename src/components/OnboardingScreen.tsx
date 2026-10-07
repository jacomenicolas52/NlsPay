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
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

interface OnboardingScreenProps {
  user: User;
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ user: _user, onFinish }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  // Scheme toggle between 2-color contrasts:
  // 'navy-teal': Fondo Navy (#2F4156) + Recuadro Teal (#567C8D)
  // 'teal-navy': Fondo Teal (#567C8D) + Recuadro Navy (#2F4156)
  const [colorScheme, setColorScheme] = useState<'navy-teal' | 'teal-navy'>('navy-teal');

  const isNavyBg = colorScheme === 'navy-teal';

  return (
    <div 
      className={`min-h-screen w-full flex flex-col justify-between items-center p-3 sm:p-6 md:p-8 font-sans relative overflow-x-hidden select-none selection:bg-[#C8D9E6] selection:text-[#2F4156] transition-colors duration-500 ${
        isNavyBg ? 'bg-[#2F4156]' : 'bg-[#567C8D]'
      }`}
    >
      
      {/* ========================================================================= */}
      {/* 1. FUTURISTIC FINTECH VECTOR GRAPHICS (NO PHOTOS, STRICT PALETTE ONLY)     */}
      {/* ========================================================================= */}
      {/* Glowing Ambient Orbs in Palette Colors */}
      <div 
        className={`absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
          isNavyBg ? 'bg-[#567C8D]/40' : 'bg-[#C8D9E6]/30'
        }`} 
      />
      <div 
        className={`absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
          isNavyBg ? 'bg-[#C8D9E6]/25' : 'bg-[#2F4156]/45'
        }`} 
      />
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
        {/* Cashflow Growth Trendline in Sky Blue */}
        <path 
          d="M 0 650 Q 240 520 480 580 T 960 380 T 1440 180" 
          fill="none" 
          stroke="#C8D9E6" 
          strokeWidth="2.5" 
          strokeDasharray="8 8" 
        />
        {/* Financial Flow Line in Teal / White */}
        <path 
          d="M 0 780 Q 360 620 720 670 T 1200 420 T 1440 290" 
          fill="none" 
          stroke={isNavyBg ? '#567C8D' : '#FFFFFF'} 
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

        {/* Right Controls: Scheme Toggle & Clean Language Popover */}
        <div className="flex items-center gap-3">
          {/* Subtle Scheme Switcher (Navy/Teal vs Teal/Navy) */}
          <button
            type="button"
            onClick={() => setColorScheme(isNavyBg ? 'teal-navy' : 'navy-teal')}
            title="Alternar combinación de 2 colores"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-[#C8D9E6] hover:text-white border border-white/15 text-xs font-semibold transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isNavyBg ? 'Fondo: Navy • Recuadro: Teal' : 'Fondo: Teal • Recuadro: Navy'}
            </span>
          </button>
          
          <LanguageSelector variant="glass" />
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. CENTRAL "RECUADRO" (COLOR 2: DISTINCTIVE FLOATING CONTAINER)             */}
      {/* ========================================================================= */}
      <main className="w-full max-w-3xl my-auto py-4 z-20 flex justify-center">
        <div 
          className={`w-full rounded-[36px] sm:rounded-[44px] border-2 sm:border-3 border-[#C8D9E6]/40 shadow-[0_30px_90px_rgba(0,0,0,0.4)] p-6 sm:p-10 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 ${
            isNavyBg 
              ? 'bg-[#567C8D]/95 border-[#C8D9E6]/50 shadow-[#2F4156]/80' 
              : 'bg-[#2F4156]/95 border-[#C8D9E6]/40 shadow-black/50'
          }`}
        >
          
          {/* Internal Subtle Vector Texture for the Recuadro */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#FFFFFF 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Internal Radial Glow Highlight */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C8D9E6]/20 rounded-full blur-[90px] pointer-events-none" />

          {/* ----------------------------------------------------------------------- */}
          {/* 3.A. STEP BADGE PILL (Restored: • PASO 1 / 3 with Pulse Dot)           */}
          {/* ----------------------------------------------------------------------- */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-mono font-bold tracking-widest uppercase shadow-sm relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#C8D9E6] animate-pulse" />
            <span className="text-[#C8D9E6]">{t.onboardingStepBadge}</span>
            <span className="text-white font-extrabold">{currentStep} / 3</span>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3.B. PASO 1: LA PROMESA DE VALOR (¿Qué es NlsPay?)                      */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="w-full flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-200 relative z-10">
              
              {/* Visual Showcase: Layered Animated NlsPay Core Card + Floating Satellites */}
              <div className="relative w-full max-w-md h-52 sm:h-56 flex items-center justify-center">
                
                {/* Back Glowing Aura in Sky Blue & Teal */}
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/30 via-white/20 to-[#567C8D]/40 rounded-[32px] blur-xl" />

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

                {/* Left Floating Satellite Card in Beige & Navy (#F5EFEB) */}
                <div className="absolute left-0 sm:-left-4 top-4 z-20 px-3.5 py-2 rounded-2xl bg-[#F5EFEB] border border-white shadow-xl flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
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

              {/* Large Bold Typography */}
              <div className="space-y-3 max-w-xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  <span>Bienvenido a NlsPay. </span>
                  <span className="bg-gradient-to-r from-[#C8D9E6] via-white to-[#F5EFEB] bg-clip-text text-transparent block sm:inline">
                    Tu centro de mando financiero.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-[#F5EFEB]/90 leading-relaxed font-normal px-2">
                  {t.onboardingStep1Desc}
                </p>
              </div>

              {/* 3 Interactive Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-[#C8D9E6]" />
                  <span>Rastreo en tiempo real</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                  <Target className="w-3.5 h-3.5 text-[#F5EFEB]" />
                  <span>Metas de ahorro</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                  <PieChart className="w-3.5 h-3.5 text-[#C8D9E6]" />
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
                
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/30 via-white/20 to-[#567C8D]/40 rounded-[32px] blur-xl" />

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

              {/* Large Bold Typography */}
              <div className="space-y-3 max-w-xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  <span>Decisiones respaldadas </span>
                  <span className="bg-gradient-to-r from-[#C8D9E6] via-white to-[#F5EFEB] bg-clip-text text-transparent block sm:inline">
                    por inteligencia.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-[#F5EFEB]/90 leading-relaxed font-normal px-2">
                  {t.onboardingStep2Desc}
                </p>
              </div>

              {/* AI Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                  <BrainCircuit className="w-3.5 h-3.5 text-[#C8D9E6]" />
                  <span>Auditoría de gastos hormiga</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5EFEB]" />
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
                
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/30 via-white/20 to-[#567C8D]/40 rounded-[32px] blur-xl" />

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

              {/* Large Bold Typography */}
              <div className="space-y-3 max-w-xl">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  <span>Tu ecosistema </span>
                  <span className="bg-gradient-to-r from-[#C8D9E6] via-white to-[#F5EFEB] bg-clip-text text-transparent block sm:inline">
                    está listo.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-[#F5EFEB]/90 leading-relaxed font-normal px-2">
                  {t.onboardingStep3Desc}
                </p>
              </div>

              {/* Ready Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#C8D9E6]" />
                <span>Cifrado de grado bancario activo</span>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 3.E. STEP INDICATORS & NAVIGATION BUTTONS                               */}
          {/* ----------------------------------------------------------------------- */}
          <div className="w-full max-w-md flex flex-col items-center gap-5 mt-8 pt-4 border-t border-white/15 relative z-10">
            
            {/* Step Indicator Dots */}
            <div className="flex items-center gap-2.5">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step as 1 | 2 | 3)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentStep === step
                      ? 'w-9 bg-white shadow-md shadow-white/40'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
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
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#C8D9E6] hover:text-white text-xs sm:text-sm font-bold transition-all border border-white/15"
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
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-[#F5EFEB] text-[#2F4156] text-xs sm:text-sm font-black shadow-xl border border-white transition-all transform active:scale-95 ml-auto"
                >
                  <span>{t.onboardingNext}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : (
                /* Big Standout CTA Button ("Entrar a mi portal") Destapa el dashboard */
                <button
                  type="button"
                  onClick={onFinish}
                  className="flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#2F4156] via-[#3a526c] to-[#2F4156] hover:from-white hover:to-[#C8D9E6] hover:text-[#2F4156] text-white text-sm sm:text-base font-black shadow-2xl border-2 border-white transition-all transform hover:scale-105 active:scale-95 ml-auto group cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#C8D9E6] group-hover:text-[#2F4156] transition-colors" />
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
