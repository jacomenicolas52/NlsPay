import React, { useState } from 'react';
import { NlsPayLogo } from './NlsPayLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import type { User } from '../types';
import { 
  Home,
  Search,
  LayoutGrid,
  MessageSquare,
  Bell,
  Settings,
  Moon,
  Sun,
  ArrowRight, 
  ArrowLeft, 
  ArrowUpRight,
  TrendingUp, 
  Zap, 
  Target, 
  ShieldCheck, 
  BrainCircuit, 
  Sparkles, 
  Heart, 
  Bookmark, 
  Share2, 
  CreditCard,
  Lock,
  ChevronRight
} from 'lucide-react';

interface OnboardingScreenProps {
  user: User;
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ user, onFinish }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center p-3 sm:p-6 md:p-8 font-sans overflow-x-hidden select-none selection:bg-[#C8D9E6] selection:text-[#2F4156]">
      
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC SCENIC BACKGROUND (NON-FLAT DUAL TONE WITH DEPTH & TEXTURE) */}
      {/* ========================================================================= */}
      {/* Scenic Photographic Backdrop with mountains & mist like reference image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 filter blur-[0.5px]"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2600&q=85")`
        }}
      />
      
      {/* Harmonizing Vignette & Palette Filters (Navy #2F4156, Teal #567C8D, Sky Blue #C8D9E6, Beige #F5EFEB) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#2F4156]/85 via-[#2F4156]/70 to-[#1b2633]/92" />
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-[#567C8D]/40 via-transparent to-[#F5EFEB]/20 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C8D9E6]/30 via-transparent to-[#2F4156]/50 pointer-events-none" />

      {/* Subtle Constellation / Precision Dot Grid */}
      <div 
        className="fixed inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#C8D9E6 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* ========================================================================= */}
      {/* 2. OUTER TOP HEADER (Reference Style: "ORIZON DESIGN" / "BEST SHOTS")     */}
      {/* ========================================================================= */}
      <header className="w-full max-w-6xl flex items-center justify-between z-20 py-2 px-2 sm:px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-sm">
            <NlsPayLogo className="w-6 h-6 drop-shadow" isDark={false} />
          </div>
          <div>
            <span className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-white drop-shadow-sm">
              NLSPAY ECOSYSTEM
            </span>
            <span className="hidden sm:inline-block ml-3 text-[11px] font-semibold text-[#C8D9E6] tracking-wider uppercase">
              • Institutional Fintech Suite
            </span>
          </div>
        </div>

        {/* Outer Right: Language Dropdown with circular flag icons + step indicator */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C8D9E6] text-xs font-mono font-bold tracking-wider uppercase">
            <span>PASO {currentStep} DE 3</span>
          </div>
          <LanguageSelector variant="glass" />
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. CENTRAL "RECUADRO" (FLOATING LUXURY WINDOW MATCHING REFERENCE IMAGE)     */}
      {/* ========================================================================= */}
      <main className="w-full max-w-6xl my-auto py-2 sm:py-4 z-20 flex justify-center">
        <div className="w-full rounded-[38px] sm:rounded-[48px] md:rounded-[56px] border-[4px] sm:border-[6px] border-white/80 shadow-[0_35px_100px_rgba(47,65,86,0.55)] overflow-hidden relative flex flex-col justify-between min-h-[580px] sm:min-h-[630px] md:min-h-[670px] bg-[#2F4156]/90 transition-all duration-300">
          
          {/* Internal Modern Curved Architecture Imagery (Twilight Glass Pavilion) */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100 hover:scale-105"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85")`
            }}
          />
          
          {/* Tint overlay preserving clarity, readability, and corporate palette (#2F4156 / #567C8D / #C8D9E6) */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#2F4156] via-[#2F4156]/65 to-[#2F4156]/40" />
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C8D9E6]/30 via-transparent to-transparent pointer-events-none" />

          {/* ----------------------------------------------------------------------- */}
          {/* 3.A. TOP BAR INSIDE RECUADRO (Pills Navigation & Filter Controls)       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="relative z-30 p-4 sm:p-6 md:p-8 flex items-center justify-between gap-3">
            
            {/* Left Pill: Step Indicator Button */}
            <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#2F4156] text-xs sm:text-sm font-extrabold shadow-lg hover:shadow-xl transition-all">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#567C8D] animate-pulse" />
              <span>{t.onboardingStepBadge} {currentStep} / 3</span>
            </div>

            {/* Center Pill Menu: 3 Steps Interactive Tabs matching the Arizona / Villa / $300k reference */}
            <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 shadow-lg text-white text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  currentStep === 1 
                    ? 'bg-white text-[#2F4156] font-bold shadow-md' 
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                01 • Mando Central
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  currentStep === 2 
                    ? 'bg-white text-[#2F4156] font-bold shadow-md' 
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                02 • IA Predictiva
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  currentStep === 3 
                    ? 'bg-white text-[#2F4156] font-bold shadow-md' 
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                03 • Mi Ecosistema
              </button>
            </div>

            {/* Right Pill: Quick Forward / Skip Action */}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-[#F5EFEB] text-[#2F4156] text-xs sm:text-sm font-extrabold shadow-lg transition-all transform active:scale-95 cursor-pointer"
              >
                <span>{t.onboardingNext}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinish}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#567C8D] to-[#2F4156] text-white text-xs sm:text-sm font-black shadow-lg border border-white/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t.onboardingCta}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3.B. LEFT VERTICAL DOCK (Floating Pill Bar matching reference image)    */}
          {/* ----------------------------------------------------------------------- */}
          <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/80 text-[#2F4156]">
            <button 
              type="button"
              onClick={() => setCurrentStep(1)} 
              title="Centro de Mando" 
              className={`p-2 rounded-full transition-all ${currentStep === 1 ? 'bg-[#2F4156] text-white shadow-sm' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <Home className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={() => setCurrentStep(2)} 
              title="Análisis IA" 
              className={`p-2 rounded-full transition-all ${currentStep === 2 ? 'bg-[#2F4156] text-white shadow-sm' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={() => setCurrentStep(3)} 
              title="Ecosistema" 
              className={`p-2 rounded-full transition-all ${currentStep === 3 ? 'bg-[#2F4156] text-white shadow-sm' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <div className="w-4 h-px bg-slate-200 my-0.5" />
            <div className="relative p-1">
              <img 
                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'} 
                alt={user.name} 
                className="w-6 h-6 rounded-full object-cover ring-2 ring-[#567C8D]"
              />
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
            </div>
            <button type="button" title="Mensajes" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button type="button" title="Notificaciones" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button type="button" title="Configuraciones" className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-4 h-px bg-slate-200 my-0.5" />
            <button type="button" title="Tema" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Moon className="w-4 h-4" />
            </button>
            <button type="button" title="Luminosidad" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Sun className="w-4 h-4" />
            </button>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3.C. HERO TYPOGRAPHY CENTER/TOP (MUCH LARGER AS EXPLICITLY REQUESTED)   */}
          {/* ----------------------------------------------------------------------- */}
          <div className="relative z-20 px-6 sm:px-16 md:px-24 pt-2 sm:pt-4 text-left max-w-4xl">
            
            {/* Step 1 Headline & Subtitle */}
            {currentStep === 1 && (
              <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#C8D9E6] text-xs font-mono font-bold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8D9E6]" />
                  <span>LA PROMESA DE VALOR • NLSPAY</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-lg">
                  Bienvenido a NlsPay. <br />
                  <span className="bg-gradient-to-r from-white via-[#C8D9E6] to-[#567C8D] bg-clip-text text-transparent">
                    Tu centro de mando financiero.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#F5EFEB]/90 font-medium max-w-2xl leading-relaxed drop-shadow">
                  {t.onboardingStep1Desc}
                </p>
              </div>
            )}

            {/* Step 2 Headline & Subtitle */}
            {currentStep === 2 && (
              <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#C8D9E6] text-xs font-mono font-bold tracking-wider uppercase">
                  <BrainCircuit className="w-3.5 h-3.5 text-[#C8D9E6]" />
                  <span>DIFERENCIADOR TECNOLÓGICO • IA INTEGRADA</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-lg">
                  Decisiones respaldadas <br />
                  <span className="bg-gradient-to-r from-white via-[#C8D9E6] to-[#567C8D] bg-clip-text text-transparent">
                    por inteligencia artificial.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#F5EFEB]/90 font-medium max-w-2xl leading-relaxed drop-shadow">
                  {t.onboardingStep2Desc}
                </p>
              </div>
            )}

            {/* Step 3 Headline & Subtitle */}
            {currentStep === 3 && (
              <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#C8D9E6] text-xs font-mono font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8D9E6]" />
                  <span>PUENTE AL DASHBOARD • LISTO PARA DESPEGAR</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-lg">
                  Tu ecosistema <br />
                  <span className="bg-gradient-to-r from-white via-[#C8D9E6] to-[#567C8D] bg-clip-text text-transparent">
                    está completamente listo.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#F5EFEB]/90 font-medium max-w-2xl leading-relaxed drop-shadow">
                  {t.onboardingStep3Desc}
                </p>
              </div>
            )}

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3.D. BOTTOM SECTION: FLOATING CARDS & LOGO BADGE (Matching Image)       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="relative z-30 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-end justify-between gap-4 mt-6">
            
            {/* Bottom-Left Crisp Solid White Card (Like "Find The Perfect Place") */}
            <div className="w-full md:w-auto md:max-w-sm rounded-[28px] sm:rounded-[34px] p-5 sm:p-6 bg-white text-[#2F4156] shadow-2xl border border-white/80 transition-all hover:shadow-3xl">
              
              {currentStep === 1 && (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-[#567C8D] tracking-wider block">
                    CONTROL TOTAL DE LIQUIDEZ
                  </span>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                    Rastreo de Flujo Continuo
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Monitorea y proyecta tus ahorros en tiempo real con auditoría de liquidez institucional.
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-5 h-5 text-[#567C8D]" />
                        <span className="text-2xl sm:text-3xl font-black text-[#2F4156] tracking-tight block">
                          +28.4%
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Flujo de Caja Neto</span>
                    </div>
                    {/* Badge Circles & Arrow */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-[#2F4156] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                          COP
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#567C8D] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                          USD
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#2F4156] text-white flex items-center justify-center shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-600 tracking-wider block flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    MOTOR PREDICTIVO ACTIVO
                  </span>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                    Score de Salud Financiera
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Detección proactiva de gastos hormiga y aviso oportuno para preservar tu capital.
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-2xl sm:text-3xl font-black text-[#2F4156] tracking-tight block">
                        885 <span className="text-sm font-semibold text-slate-400">/ 1000</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Nivel Excelente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                        IA 98.4%
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#2F4156] text-white flex items-center justify-center shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-[#567C8D] tracking-wider block">
                    CAPITAL INSTITUCIONAL
                  </span>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                    Saldo Inicial Listo
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Todo listo para organizar tu flujo de caja con tus tarjetas institucionales activas.
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-2xl sm:text-3xl font-black text-[#2F4156] tracking-tight block">
                        $34.820.000
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">COP • Disponible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-black italic">
                          V
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#567C8D] text-white flex items-center justify-center text-[9px] font-bold">
                          MC
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#2F4156] text-white flex items-center justify-center shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Central Floating Circular Logo Badge (Exact replica of Reference Image) */}
            <div className="hidden lg:flex items-center justify-center my-auto">
              <div 
                onClick={() => setCurrentStep((prev) => (prev % 3 + 1) as 1 | 2 | 3)}
                className="w-16 h-16 rounded-full bg-[#2F4156] border-[3px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group"
                title="Cambiar paso"
              >
                <NlsPayLogo className="w-8 h-8 drop-shadow-md group-hover:rotate-12 transition-transform" isDark={false} />
              </div>
            </div>

            {/* Bottom-Right Frosted Glass Card (Like "Lunar Oasis Villa") */}
            <div className="w-full md:w-auto md:max-w-sm rounded-[28px] sm:rounded-[34px] p-5 sm:p-6 bg-white/25 backdrop-blur-xl border border-white/50 text-white shadow-2xl transition-all hover:bg-white/30">
              
              {currentStep === 1 && (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold leading-tight drop-shadow-sm">
                        Analista NlsPay Core
                      </h4>
                      <span className="text-[11px] text-[#C8D9E6] block">
                        📍 Bóveda Central • Bogotá / Miami
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-sm">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-light">
                    Sincronización de tesorería y analítica financiera continua sin depender de hojas de cálculo obsoletas.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-semibold text-white/95">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <Zap className="w-3 h-3 text-[#C8D9E6]" /> En Tiempo Real
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <Target className="w-3 h-3 text-[#C8D9E6]" /> Metas 100%
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <ShieldCheck className="w-3 h-3 text-[#C8D9E6]" /> Bóveda
                    </span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold leading-tight drop-shadow-sm">
                        Copiloto IA Preventivo
                      </h4>
                      <span className="text-[11px] text-[#C8D9E6] block">
                        ⚡ Machine Learning • NlsPay v2.4
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-sm">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-light">
                    Te alertamos proactivamente sobre consumos atípicos para que ahorres hasta $180.000 COP al mes.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-semibold text-white/95">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <BrainCircuit className="w-3 h-3 text-[#C8D9E6]" /> Red Neural
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <Sparkles className="w-3 h-3 text-[#C8D9E6]" /> -15% Gastos
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <Lock className="w-3 h-3 text-[#C8D9E6]" /> Blindaje
                    </span>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold leading-tight drop-shadow-sm">
                        Bóveda Institucional Activa
                      </h4>
                      <span className="text-[11px] text-[#C8D9E6] block">
                        🔒 Cifrado TLS 1.3 / AES-256
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-sm">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-light">
                    Tu portal está preparado para darte el control total sobre tus finanzas personales y empresariales.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-semibold text-white/95">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <CreditCard className="w-3 h-3 text-[#C8D9E6]" /> 2 Tarjetas
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <ShieldCheck className="w-3 h-3 text-[#C8D9E6]" /> 100% Blindado
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20">
                      <Zap className="w-3 h-3 text-[#C8D9E6]" /> En Vivo
                    </span>
                  </div>
                </div>
              )}

              {/* Action row with Heart, Bookmark, Share icons matching reference */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/20">
                <div className="flex items-center gap-4 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setLiked(!liked)} 
                    className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{liked ? '4.5K' : '4.4K'}</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSaved(!saved)} 
                    className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white text-white' : ''}`} />
                    <span>{saved ? '158' : '157'}</span>
                  </button>
                  <button type="button" className="text-white/80 hover:text-white transition-colors">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#C8D9E6] uppercase tracking-wider">
                  NlsPay v2.6
                </span>
              </div>

            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3.E. STEP CONTROLS & THE GRAND FINALE CTA ("Entrar a mi portal")        */}
          {/* ----------------------------------------------------------------------- */}
          <div className="relative z-30 px-6 sm:px-8 py-4 bg-gradient-to-t from-[#2F4156] to-transparent flex items-center justify-between gap-4">
            
            {/* Step Indicator Dots */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step as 1 | 2 | 3)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentStep === step
                      ? 'w-10 bg-white shadow-lg'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Ir al paso ${step}`}
                />
              ))}
            </div>

            {/* Back Button */}
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-all border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.onboardingBack}</span>
              </button>
            )}

            {/* Next Button or Grand Finale CTA */}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-white hover:bg-[#F5EFEB] text-[#2F4156] text-xs sm:text-sm font-black shadow-2xl transition-all transform hover:scale-105 active:scale-95 ml-auto"
              >
                <span>{t.onboardingNext}</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              /* Grand Finale Big Standout Button destapa el dashboard */
              <button
                type="button"
                onClick={onFinish}
                className="flex items-center justify-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#567C8D] via-[#45697a] to-[#2F4156] hover:from-white hover:to-[#C8D9E6] hover:text-[#2F4156] text-white text-sm sm:text-base font-black shadow-2xl border-2 border-white transition-all transform hover:scale-105 active:scale-95 ml-auto group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#C8D9E6] group-hover:text-[#2F4156] transition-colors" />
                <span>{t.onboardingCta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            )}

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. OUTER BOTTOM FOOTER (Like & Follow ♡ / Swipe >> style)                  */}
      {/* ========================================================================= */}
      <footer className="w-full max-w-6xl flex items-center justify-between z-20 py-2 px-2 sm:px-4 text-white/80 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span>NlsPay Intelligence Engine</span>
          <span className="text-[#C8D9E6]">• © 2026</span>
        </div>
        <div className="flex items-center gap-2">
          {currentStep < 3 ? (
            <button 
              type="button"
              onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)} 
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all"
            >
              <span>Swipe</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={onFinish} 
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold transition-all"
            >
              <span>{t.onboardingCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </footer>

    </div>
  );
};

export default OnboardingScreen;
