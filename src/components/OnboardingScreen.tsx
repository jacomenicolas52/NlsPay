import React, { useState } from 'react';
import { NlsPayLogo } from './NlsPayLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage, type Language } from '../context/LanguageContext';
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
  SlidersHorizontal,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  X,
  Globe,
  CheckCircle2,
  Info,
  Check,
  RotateCcw
} from 'lucide-react';

interface OnboardingScreenProps {
  user: User;
  onFinish: () => void;
}

interface FeatureDetail {
  title: string;
  badge: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ user: _user, onFinish }) => {
  const { language, setLanguage, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  
  // 1. Device Simulator State ('fluid' | 'mobile' | 'tablet' | 'desktop')
  const [deviceMode, setDeviceMode] = useState<'fluid' | 'mobile' | 'tablet' | 'desktop'>('fluid');
  
  // 2. Navbar & Language Selector Integration Options
  const [navbarStyle, setNavbarStyle] = useState<'card-navbar' | 'segmented' | 'card-dropdown' | 'dock-minimal'>('card-navbar');
  
  // 3. UI Drawers & Modals
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeFeatureModal, setActiveFeatureModal] = useState<FeatureDetail | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLogoSpinning, setIsLogoSpinning] = useState(false);

  // Trigger smooth toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // 4. Logo click handler with micro-physics and smooth transition to Step 1
  const handleLogoClick = () => {
    setIsLogoSpinning(true);
    setCurrentStep(1);
    
    const toastText = 
      language === 'es'
        ? 'Reiniciando al Paso 1: Tu centro de mando financiero'
        : language === 'en'
        ? 'Resetting to Step 1: Financial Command Center'
        : 'Reiniciando ao Passo 1: Centro de Comando Financeiro';
    
    showToast(toastText);
    setTimeout(() => setIsLogoSpinning(false), 500);
  };

  // 5. Feature Detail Dictionary for Explanatory Modals
  const featureDetails: Record<string, FeatureDetail> = {
    realtime: {
      title: language === 'es' ? 'Rastreo en Tiempo Real de Liquidez' : language === 'en' ? 'Real-Time Liquidity Tracking' : 'Rastreamento em Tempo Real de Liquidez',
      badge: 'LATENCY < 120MS',
      description: language === 'es'
        ? 'NlsPay se conecta con tus cuentas bancarias y pasarelas institucionales mediante APIs seguras de latencia ultrabaja. Cada ingreso o egreso se refleja en milisegundos sin desfases.'
        : language === 'en'
        ? 'NlsPay connects with institutional bank accounts and gateways via ultra-low latency APIs. Every deposit or outflow reflects within milliseconds with zero delay.'
        : 'O NlsPay se conecta às suas contas bancárias e gateways institucionais por meio de APIs seguras de baixíssima latência. Cada movimentação é refletida em milissegundos.',
      metrics: [
        { label: 'Latencia', value: '< 120 ms' },
        { label: 'Sincronización', value: 'Instantánea' },
        { label: 'Monedas', value: 'COP • USD • EUR' }
      ]
    },
    savings: {
      title: language === 'es' ? 'Metas de Ahorro Inteligentes' : language === 'en' ? 'Smart Savings Goals' : 'Metas de Economia Inteligentes',
      badge: 'ALGORITHMIC ENGINE',
      description: language === 'es'
        ? 'Define objetivos de capital institucional o personal. NlsPay calcula automáticamente el porcentaje óptimo de retención mensual sin comprometer tu flujo de caja operativo.'
        : language === 'en'
        ? 'Set institutional or personal capital targets. NlsPay dynamically computes the optimal monthly retention percentage without compromising operating cashflow.'
        : 'Defina metas de capital institucional ou pessoal. O NlsPay calcula automaticamente a porcentagem ideal de retenção mensal sem comprometer seu fluxo de caixa operacional.',
      metrics: [
        { label: 'Proyección', value: '12 Meses' },
        { label: 'Rendimiento', value: '+14.2% Proyectado' },
        { label: 'Ajuste', value: 'Automático 24/7' }
      ]
    },
    control: {
      title: language === 'es' ? 'Control Total de Flujo y Tesorería' : language === 'en' ? 'Total Cashflow & Treasury Control' : 'Controle Total de Fluxo e Tesouraria',
      badge: '360° VISIBILITY',
      description: language === 'es'
        ? 'Visibilidad completa sobre todas tus fuentes de capital. Establece techos automáticos de gastos por categoría y concilia cuentas sin margen de error humano.'
        : language === 'en'
        ? 'Full 360-degree visibility across all capital sources. Establish automated category spending ceilings and reconcile accounts with zero human error.'
        : 'Visibilidade completa de 360° em todas as suas fontes de capital. Estabeleça tetos de gastos automáticos por categoria e reconcilie contas sem erros humanos.',
      metrics: [
        { label: 'Categorización', value: '99.4% IA' },
        { label: 'Auditoría', value: 'Continua' },
        { label: 'Alertas', value: 'Tiempo Real' }
      ]
    },
    antExpenses: {
      title: language === 'es' ? 'Auditoría de Gastos Hormiga' : language === 'en' ? 'Micro-Expense Audit AI' : 'Auditoria de Microgastos',
      badge: 'PREDICTIVE NEURAL',
      description: language === 'es'
        ? 'Nuestra red neuronal identifica micro-transacciones repetitivas (delivery, servicios no utilizados, tarifas bancarias ocultas) y te avisa antes de que reduzcan tu margen mensual.'
        : language === 'en'
        ? 'Our neural network identifies repetitive micro-transactions (deliveries, unused subscriptions, hidden bank fees) and warns you before they erode monthly margins.'
        : 'Nossa rede neural identifica microtransações repetitivas (delivery, serviços não utilizados, tarifas ocultas) e avisa você antes que diminuam sua margem mensal.',
      metrics: [
        { label: 'Ahorro Potencial', value: '$180.000 COP/mes' },
        { label: 'Precisión', value: '98.7%' },
        { label: 'Detección', value: 'Automática' }
      ]
    },
    taxReconciliation: {
      title: language === 'es' ? 'Conciliación Fiscal Automatizada' : language === 'en' ? 'Automated Tax Reconciliation' : 'Conciliação Fiscal Automatizada',
      badge: 'INSTITUTIONAL GRADE',
      description: language === 'es'
        ? 'Separación inteligente entre egresos deducibles y consumos ordinarios. Genera reportes contables con trazabilidad bancaria listos para declaración o auditoría.'
        : language === 'en'
        ? 'Intelligent distinction between tax-deductible expenses and routine outflows. Generates accounting reports with verified banking audit trails ready for filing.'
        : 'Separação inteligente entre despesas dedutíveis e saídas rotineiras. Gera relatórios contábeis com rastreabilidade bancária verificada pronta para auditoria.',
      metrics: [
        { label: 'Cumplimiento', value: '100% DIAN / IRS' },
        { label: 'Formatos', value: 'PDF, Excel, JSON' },
        { label: 'Trazabilidad', value: 'Bancaria' }
      ]
    },
    securityVault: {
      title: language === 'es' ? 'Cifrado de Grado Bancario' : language === 'en' ? 'Bank-Grade Encryption' : 'Criptografia de Nível Bancário',
      badge: 'TLS 1.3 • AES-256',
      description: language === 'es'
        ? 'Blindaje criptográfico de extremo a extremo con TLS 1.3 y AES-256. Tus credenciales bancarias y claves privadas nunca se almacenan en texto plano ni se comparten.'
        : language === 'en'
        ? 'End-to-end cryptographic shielding with TLS 1.3 and AES-256. Your bank credentials and private keys are never stored in plaintext or shared with third parties.'
        : 'Blindagem criptográfica de ponta a ponta com TLS 1.3 e AES-256. Suas credenciais bancárias e chaves privadas nunca são armazenadas em texto simples.',
      metrics: [
        { label: 'Estándar', value: 'AES-256-GCM' },
        { label: 'Protocolo', value: 'TLS 1.3' },
        { label: 'Auditoría', value: 'SOC 2 Type II' }
      ]
    }
  };

  // Device simulation wrapper class: significantly wider on fluid/desktop to fill space gracefully
  const deviceContainerClass = 
    deviceMode === 'mobile'
      ? 'max-w-[410px] ring-8 ring-slate-800/80 rounded-[48px] shadow-2xl my-auto'
      : deviceMode === 'tablet'
      ? 'max-w-[820px] ring-8 ring-slate-800/60 rounded-[46px] shadow-2xl my-auto'
      : deviceMode === 'desktop'
      ? 'max-w-5xl xl:max-w-6xl my-auto'
      : 'max-w-5xl xl:max-w-6xl my-auto';

  return (
    <div className="min-h-screen w-full bg-[#2F4156] flex flex-col justify-between items-center p-3 sm:p-6 md:p-8 font-sans relative overflow-x-hidden select-none selection:bg-[#C8D9E6] selection:text-[#2F4156]">
      
      {/* ========================================================================= */}
      {/* 1. TOAST NOTIFICATION (Micro-interaction feedback)                         */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed top-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-bold shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            type="button"
            onClick={() => setToastMessage(null)} 
            className="text-slate-400 hover:text-[#2F4156] ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FUTURISTIC FINTECH VECTOR GRAPHICS (BLUEPRINT GRID & CANDLESTICK WAVES) */}
      {/* ========================================================================= */}
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none bg-[#567C8D]/45" />
      <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none bg-[#C8D9E6]/30" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#567C8D]/30 rounded-full blur-[160px] pointer-events-none" />

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
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 900">
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
      {/* 3. WIDE RESPONSIVE HEADER WITH 4 INTEGRATION OPTIONS & INTERACTIVE LOGO    */}
      {/* ========================================================================= */}
      <header className="w-full max-w-5xl xl:max-w-6xl relative z-30 py-2.5">
        
        {/* OPastyle 1: Card Navbar Flotante (Recomendada) */}
        {navbarStyle === 'card-navbar' && (
          <div className="w-full px-5 sm:px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 flex items-center justify-between transition-all">
            {/* Interactive Logo with Spring Animation & Reset */}
            <button
              type="button"
              onClick={handleLogoClick}
              title={language === 'es' ? 'Volver al Paso 1' : 'Return to Step 1'}
              className="flex items-center gap-3 text-left group active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <div className={`p-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-lg shadow-black/40 ring-1 ring-white/15 group-hover:ring-[#C8D9E6]/60 transition-all ${isLogoSpinning ? 'rotate-12 scale-110' : ''}`}>
                <NlsPayLogo className="w-8 h-8 drop-shadow" isDark={false} />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-none group-hover:text-[#C8D9E6] transition-colors">
                  NlsPay
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#C8D9E6] font-bold tracking-widest uppercase">
                  Financial Intelligence Hub
                </span>
              </div>
            </button>

            {/* Language Selector embedded in unified navbar */}
            <div className="flex items-center gap-2">
              <LanguageSelector variant="glass" />
            </div>
          </div>
        )}

        {/* OPastyle 2: Selector Segmentado [ ES | EN | PT ] */}
        {navbarStyle === 'segmented' && (
          <div className="w-full flex items-center justify-between px-2">
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-left group active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md ring-1 ring-white/10 group-hover:ring-[#C8D9E6]/50 transition-all">
                <NlsPayLogo className="w-8 h-8 drop-shadow" isDark={false} />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-none">
                  NlsPay
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#C8D9E6] font-bold tracking-widest uppercase">
                  Financial Intelligence Hub
                </span>
              </div>
            </button>

            {/* Segmented Pill Selector with Sliding Active Highlight */}
            <div className="flex items-center p-1.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-md">
              {(['es', 'en', 'pt'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all uppercase ${
                    language === lang
                      ? 'bg-white text-[#2F4156] shadow-md font-black scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* OPastyle 3: Dropdown en Card con Localización */}
        {navbarStyle === 'card-dropdown' && (
          <div className="w-full flex items-center justify-between px-2">
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-left group active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md ring-1 ring-white/10 group-hover:ring-[#C8D9E6]/50 transition-all">
                <NlsPayLogo className="w-8 h-8 drop-shadow" isDark={false} />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-none">
                  NlsPay
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#C8D9E6] font-bold tracking-widest uppercase">
                  Financial Intelligence Hub
                </span>
              </div>
            </button>

            {/* Card with Flag and Region Currencies */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md">
              <span className="text-xs font-mono font-extrabold text-[#C8D9E6]">
                {language === 'es' ? 'ES • COP/USD' : language === 'en' ? 'UK • USD' : 'PT • BRL'}
              </span>
              <LanguageSelector variant="glass" />
            </div>
          </div>
        )}

        {/* OPastyle 4: Dock Flexbox Minimalista */}
        {navbarStyle === 'dock-minimal' && (
          <div className="w-full flex items-center justify-between px-2">
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-left group active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md ring-1 ring-white/10 group-hover:ring-[#C8D9E6]/50 transition-all">
                <NlsPayLogo className="w-8 h-8 drop-shadow" isDark={false} />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-none">
                  NlsPay
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#C8D9E6] font-bold tracking-widest uppercase">
                  Financial Intelligence Hub
                </span>
              </div>
            </button>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-[#C8D9E6]/30 ring-1 ring-[#C8D9E6]/20 shadow-sm text-white">
              <Globe className="w-4 h-4 text-[#C8D9E6]" />
              <LanguageSelector variant="glass" />
            </div>
          </div>
        )}

      </header>

      {/* ========================================================================= */}
      {/* 4. RECUADRO CENTRAL (MÁS LARGO HACIA LOS LADOS + COLOR LLAMATIVO + LETRAS GRANDES) */}
      {/* ========================================================================= */}
      <main className={`w-full z-20 flex justify-center transition-all duration-300 ${deviceContainerClass}`}>
        <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[56px] border-2 sm:border-3 border-white ring-2 ring-[#567C8D]/30 shadow-[0_35px_100px_rgba(86,124,141,0.4)] p-6 sm:p-11 md:p-14 flex flex-col items-center text-center relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5EFEB] to-[#C8D9E6]/65 transition-all duration-300">
          
          {/* Top High-Tech Ambient Highlight Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#567C8D] via-[#C8D9E6] to-[#567C8D]" />

          {/* Subtle Ledger Micro-Grid Texture */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#2F4156 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Luminous Ambient Interior Glow */}
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#C8D9E6]/35 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#567C8D]/20 rounded-full blur-[90px] pointer-events-none" />

          {/* ----------------------------------------------------------------------- */}
          {/* 4.A. STEP BADGE PILL (• PASO 1 / 3)                                     */}
          {/* ----------------------------------------------------------------------- */}
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-mono font-bold tracking-widest uppercase shadow-sm relative z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#567C8D] animate-pulse" />
            <span className="text-[#567C8D]">{t.onboardingStepBadge}</span>
            <span className="text-[#2F4156] font-black">{currentStep} / 3</span>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 4.B. PASO 1: LA PROMESA DE VALOR (¿Qué es NlsPay?)                      */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="w-full flex flex-col items-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-200 relative z-10">
              
              {/* Responsive Visual Showcase: Wider spread with larger dimensions */}
              <div className="relative w-full max-w-md sm:max-w-xl h-52 sm:h-64 flex items-center justify-center">
                
                {/* Back Glowing Aura in Sky Blue & Teal */}
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/50 via-[#567C8D]/30 to-[#2F4156]/25 rounded-[36px] blur-2xl" />

                {/* Central Showcase Card with Animated Glowing NlsPay Logo (Larger scale) */}
                <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#2F4156] via-[#2F4156]/95 to-[#1c2937] border-2 sm:border-3 border-[#C8D9E6]/60 shadow-2xl flex flex-col items-center justify-center p-5 sm:p-6 transform transition-transform hover:scale-105">
                  <div className="relative mb-2">
                    <div className="absolute -inset-3 bg-[#567C8D]/70 rounded-full blur-md animate-pulse" />
                    <NlsPayLogo className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 relative z-10 drop-shadow-xl" isDark={false} />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold text-[#C8D9E6] tracking-widest mt-1">
                    NLSPAY CORE
                  </span>
                </div>

                {/* Left Floating Satellite Card in White with Shadow (Generous width) */}
                <div className="absolute left-1 sm:-left-4 md:-left-6 top-3 sm:top-5 z-20 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-white border border-[#C8D9E6] shadow-2xl flex items-center gap-2.5 sm:gap-3 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#567C8D] text-white flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#567C8D] block leading-none">
                      Flujo de Caja
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#2F4156]">+28.4% Neto</span>
                  </div>
                </div>

                {/* Right Floating Satellite Card in Navy & Sky Blue (#2F4156) */}
                <div className="absolute right-1 sm:-right-4 md:-right-6 bottom-3 sm:bottom-5 z-20 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#2F4156] border border-[#C8D9E6]/50 shadow-2xl flex items-center gap-2.5 sm:gap-3 transform rotate-3 hover:rotate-0 transition-transform text-white">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C8D9E6] text-[#2F4156] flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#C8D9E6] block leading-none">
                      Bóveda Segura
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">Analista 24/7</span>
                  </div>
                </div>

              </div>

              {/* Large Bold Typography in Blue (#2F4156 & #567C8D) */}
              <div className="space-y-3 sm:space-y-4 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#2F4156] tracking-tight leading-[1.12]">
                  <span>Bienvenido a NlsPay. </span>
                  <span className="text-[#567C8D] block sm:inline">
                    Tu centro de mando financiero.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#2F4156]/90 font-medium leading-relaxed max-w-2xl mx-auto px-2">
                  {t.onboardingStep1Desc}
                </p>
              </div>

              {/* 3 Interactive Feature Pills with Generous Sizing */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveFeatureModal(featureDetails.realtime)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group"
                >
                  <Zap className="w-4 h-4 text-[#567C8D] group-hover:scale-110 transition-transform" />
                  <span>Rastreo en tiempo real</span>
                  <Info className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFeatureModal(featureDetails.savings)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group"
                >
                  <Target className="w-4 h-4 text-[#567C8D] group-hover:scale-110 transition-transform" />
                  <span>Metas de ahorro</span>
                  <Info className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFeatureModal(featureDetails.control)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group"
                >
                  <PieChart className="w-4 h-4 text-[#567C8D] group-hover:scale-110 transition-transform" />
                  <span>Control total</span>
                  <Info className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </button>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 4.C. PASO 2: EL DIFERENCIADOR TECNOLÓGICO (¿Qué esperar?)               */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="w-full flex flex-col items-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-200 relative z-10">
              
              {/* Visual Showcase: AI Intelligence Hub with Live Score Gauge (Larger scale) */}
              <div className="relative w-full max-w-md sm:max-w-xl h-52 sm:h-64 flex items-center justify-center">
                
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/50 via-[#567C8D]/30 to-[#2F4156]/25 rounded-[36px] blur-2xl" />

                {/* Center Neural Engine Card with Animated Pulsing Brain */}
                <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#2F4156] via-[#2F4156]/95 to-[#1c2937] border-2 sm:border-3 border-[#C8D9E6]/60 shadow-2xl flex flex-col items-center justify-center p-5 sm:p-6 transform transition-transform hover:scale-105">
                  <div className="relative mb-2">
                    <div className="absolute -inset-3 bg-[#567C8D]/60 rounded-full blur-md animate-pulse" />
                    <BrainCircuit className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 text-[#C8D9E6] relative z-10" strokeWidth={1.8} />
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white absolute -top-1 -right-1 z-20 animate-bounce" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-extrabold text-[#C8D9E6] tracking-widest uppercase mt-1">
                    NEURAL V2
                  </span>
                </div>

                {/* Left Floating Health Score Gauge Badge */}
                <div className="absolute left-1 sm:-left-4 md:-left-6 top-3 sm:top-5 z-20 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-white border border-[#C8D9E6] shadow-2xl flex items-center gap-2.5 sm:gap-3 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#567C8D] block leading-none">
                      Health Score
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#2F4156]">885 / 1000</span>
                  </div>
                </div>

                {/* Right Floating Spending Anomaly Alert Card */}
                <div className="absolute right-1 sm:-right-4 md:-right-6 bottom-3 sm:bottom-5 z-20 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#2F4156] border border-[#C8D9E6]/50 shadow-2xl flex items-center gap-2.5 sm:gap-3 transform rotate-3 hover:rotate-0 transition-transform text-white">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#567C8D] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#C8D9E6] block leading-none">
                      Alerta Preventiva
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">-$180k/mes</span>
                  </div>
                </div>

              </div>

              {/* Large Bold Typography in Blue (#2F4156 & #567C8D) */}
              <div className="space-y-3 sm:space-y-4 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#2F4156] tracking-tight leading-[1.12]">
                  <span>Decisiones respaldadas </span>
                  <span className="text-[#567C8D] block sm:inline">
                    por inteligencia.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#2F4156]/90 font-medium leading-relaxed max-w-2xl mx-auto px-2">
                  {t.onboardingStep2Desc}
                </p>
              </div>

              {/* AI Tags with Detail Trigger */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveFeatureModal(featureDetails.antExpenses)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group"
                >
                  <BrainCircuit className="w-4 h-4 text-[#567C8D] group-hover:scale-110 transition-transform" />
                  <span>Auditoría de gastos hormiga</span>
                  <Info className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFeatureModal(featureDetails.taxReconciliation)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group"
                >
                  <ShieldCheck className="w-4 h-4 text-[#567C8D] group-hover:scale-110 transition-transform" />
                  <span>Conciliación fiscal</span>
                  <Info className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </button>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 4.D. PASO 3: EL PUENTE AL DASHBOARD (Llamado a la acción)               */}
          {/* ----------------------------------------------------------------------- */}
          {currentStep === 3 && (
            <div className="w-full flex flex-col items-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-200 relative z-10">
              
              {/* Visual Showcase: Mini Institutional Dashboard Preview (Larger scale) */}
              <div className="relative w-full max-w-md sm:max-w-xl h-52 sm:h-64 flex items-center justify-center">
                
                <div className="absolute inset-4 bg-gradient-to-r from-[#C8D9E6]/50 via-[#567C8D]/30 to-[#2F4156]/25 rounded-[36px] blur-2xl" />

                {/* Center Institutional Shield Card */}
                <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-52 md:w-60 md:h-56 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#2F4156] via-[#2F4156]/95 to-[#1c2937] border-2 sm:border-3 border-[#C8D9E6]/60 shadow-2xl flex flex-col items-center justify-center p-5 sm:p-6 transform transition-transform hover:scale-105">
                  <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#C8D9E6] mb-1">
                    CAPITAL DISPONIBLE
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-white font-sans">$34.820.000</span>
                  <span className="text-[10px] sm:text-xs text-[#C8D9E6]/90 font-mono mt-1">
                    COP • 2 Tarjetas Activas
                  </span>
                  <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>100% CONECTADO</span>
                  </div>
                </div>

                {/* Left Mini Visa Card Floating */}
                <div className="absolute left-1 sm:-left-4 md:-left-6 top-3 sm:top-5 z-20 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#1b1c21] border border-[#567C8D] shadow-2xl flex items-center gap-2.5 sm:gap-3 transform -rotate-4 hover:rotate-0 transition-transform text-white">
                  <span className="text-xs sm:text-sm font-black tracking-tighter italic">VISA</span>
                  <span className="text-xs sm:text-sm font-mono text-[#C8D9E6]">•••• 1810</span>
                </div>

                {/* Right Mini Mastercard Card Floating in White */}
                <div className="absolute right-1 sm:-right-4 md:-right-6 bottom-3 sm:bottom-5 z-20 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-white border border-[#C8D9E6] shadow-2xl flex items-center gap-2.5 sm:gap-3 transform rotate-4 hover:rotate-0 transition-transform text-[#2F4156]">
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-[#2F4156]" />
                    <div className="w-4 h-4 rounded-full bg-[#567C8D]" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-bold">•••• 1423</span>
                </div>

              </div>

              {/* Large Bold Typography in Blue (#2F4156 & #567C8D) */}
              <div className="space-y-3 sm:space-y-4 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#2F4156] tracking-tight leading-[1.12]">
                  <span>Tu ecosistema </span>
                  <span className="text-[#567C8D] block sm:inline">
                    está listo.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#2F4156]/90 font-medium leading-relaxed max-w-2xl mx-auto px-2">
                  {t.onboardingStep3Desc}
                </p>
              </div>

              {/* Ready Badge with Security Info Trigger */}
              <button
                type="button"
                onClick={() => setActiveFeatureModal(featureDetails.securityVault)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-slate-50 border border-[#C8D9E6] text-[#2F4156] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all group"
              >
                <ShieldCheck className="w-4 h-4 text-[#567C8D] group-hover:scale-110 transition-transform" />
                <span>Cifrado de grado bancario activo</span>
                <Info className="w-3.5 h-3.5 text-slate-400 opacity-60" />
              </button>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* 4.E. STEP INDICATORS & NAVIGATION BUTTONS                               */}
          {/* ----------------------------------------------------------------------- */}
          <div className="w-full max-w-xl flex flex-col items-center gap-5 sm:gap-6 mt-8 sm:mt-10 pt-5 border-t border-[#C8D9E6] relative z-10">
            
            {/* Step Indicator Dots */}
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step as 1 | 2 | 3)}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    currentStep === step
                      ? 'w-10 bg-[#2F4156] shadow-md'
                      : 'w-3 bg-[#C8D9E6] hover:bg-[#567C8D]'
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
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#2F4156] text-xs sm:text-sm font-bold transition-all border border-[#C8D9E6] shadow-xs active:scale-95"
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
                  className="flex items-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#2F4156] hover:bg-[#1f2b38] text-white text-sm sm:text-base font-black shadow-lg transition-all transform active:scale-95 ml-auto cursor-pointer"
                >
                  <span>{t.onboardingNext}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : (
                /* Big Standout CTA Button ("Entrar a mi portal") Destapa el dashboard */
                <button
                  type="button"
                  onClick={onFinish}
                  className="flex items-center justify-center gap-3 px-9 sm:px-12 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#2F4156] via-[#3a526c] to-[#2F4156] hover:from-[#567C8D] hover:to-[#2F4156] text-white text-base sm:text-lg font-black shadow-2xl border border-[#C8D9E6] transition-all transform hover:scale-105 active:scale-95 ml-auto group cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#C8D9E6] group-hover:text-white transition-colors" />
                  <span>{t.onboardingCta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. FOOTER WITH DEVICE SIMULATOR & DESIGN OPTIONS BUTTON                    */}
      {/* ========================================================================= */}
      <footer className="w-full max-w-5xl xl:max-w-6xl flex items-center justify-between text-[#C8D9E6]/80 text-xs sm:text-sm py-2 px-2 z-30">
        <div className="flex items-center gap-2">
          <span className="font-semibold">NlsPay Ecosystem</span>
          <span className="hidden sm:inline">• Finanzas & Control de Gastos</span>
        </div>

        {/* Device Simulator & Design Options Button */}
        <button
          type="button"
          onClick={() => setIsOptionsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/15 shadow-sm active:scale-95"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8D9E6]" />
          <span>Opciones de Diseño & Centrado</span>
        </button>
      </footer>

      {/* ========================================================================= */}
      {/* 6. MODAL: EXPLICATIVO DE CARACTERÍSTICAS (INTERACTIVO AL TOCAR PÍLDORAS)   */}
      {/* ========================================================================= */}
      {activeFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-[32px] bg-white border-2 border-[#C8D9E6] shadow-2xl p-6 sm:p-7 relative text-left animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveFeatureModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#2F4156] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge & Title */}
            <span className="px-3 py-1 rounded-full bg-[#C8D9E6]/40 text-[#2F4156] font-mono text-[10px] font-extrabold uppercase tracking-wider inline-block mb-3">
              {activeFeatureModal.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#2F4156] tracking-tight leading-snug mb-3">
              {activeFeatureModal.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              {activeFeatureModal.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F5EFEB] border border-[#C8D9E6]/60 mb-6 text-center">
              {activeFeatureModal.metrics.map((m, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[#567C8D] block leading-none">{m.label}</span>
                  <span className="text-xs font-black text-[#2F4156] block">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Close / Action Button */}
            <button
              type="button"
              onClick={() => setActiveFeatureModal(null)}
              className="w-full py-3 rounded-2xl bg-[#2F4156] hover:bg-[#1e2d3d] text-white text-xs sm:text-sm font-black shadow-lg transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL / DRAWER: OPCIONES DE DISEÑO, CENTRADO Y SIMULADOR DE DISPOSITIVO */}
      {/* ========================================================================= */}
      {isOptionsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-[36px] bg-[#F5EFEB] border-3 border-white shadow-2xl p-6 sm:p-8 relative text-left animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#C8D9E6]">
              <div>
                <h3 className="text-xl font-black text-[#2F4156] leading-none">
                  Opciones de Diseño & Centrado
                </h3>
                <span className="text-xs text-[#567C8D] font-semibold">
                  Personalización visual y pruebas en tiempo real
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOptionsOpen(false)}
                className="p-2 rounded-full bg-white hover:bg-slate-100 text-[#2F4156] shadow-sm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SECTION 1: SIMULADOR DE DISPOSITIVO */}
            <div className="py-4 space-y-2.5">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#2F4156] block">
                1. Simulador de Pantalla / Dispositivo
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'fluid', label: 'Fluido (100%)', Icon: Maximize2 },
                  { id: 'mobile', label: 'Móvil (390px)', Icon: Smartphone },
                  { id: 'tablet', label: 'Tablet (768px)', Icon: Tablet },
                  { id: 'desktop', label: 'Desktop', Icon: Monitor },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDeviceMode(item.id as typeof deviceMode)}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-xs font-bold transition-all ${
                      deviceMode === item.id
                        ? 'bg-[#2F4156] text-white border-[#2F4156] shadow-md scale-102'
                        : 'bg-white text-[#2F4156] border-[#C8D9E6] hover:bg-slate-50'
                    }`}
                  >
                    <item.Icon className="w-4 h-4" />
                    <span className="text-[11px]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 2: 4 OPCIONES DE SELECTOR DE IDIOMA */}
            <div className="py-4 space-y-2.5 border-t border-[#C8D9E6]">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#2F4156] block">
                2. Integración del Selector de Idioma (4 Opciones)
              </span>
              <div className="space-y-2">
                {[
                  {
                    id: 'card-navbar',
                    title: 'Card Navbar Flotante (Recomendada)',
                    desc: 'Barra unificada de vidrio satinado que engloba el logo y el selector en armonía.'
                  },
                  {
                    id: 'segmented',
                    title: 'Selector Segmentado [ ES | EN | PT ]',
                    desc: 'Botones directos con pestaña deslizante activa sin menús ocultos.'
                  },
                  {
                    id: 'card-dropdown',
                    title: 'Dropdown en Card con Localización',
                    desc: 'Muestra código regional y monedas (USD, COP, BRL) anclado al header.'
                  },
                  {
                    id: 'dock-minimal',
                    title: 'Dock Flexbox Minimalista',
                    desc: 'Micro-tarjeta con icono de globo y halo cyan iluminado.'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setNavbarStyle(opt.id as typeof navbarStyle)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                      navbarStyle === opt.id
                        ? 'bg-white border-[#2F4156] ring-2 ring-[#2F4156] shadow-md'
                        : 'bg-white/70 border-[#C8D9E6] hover:bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black text-[#2F4156] block">{opt.title}</span>
                      <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">{opt.desc}</span>
                    </div>
                    {navbarStyle === opt.id && (
                      <div className="w-5 h-5 rounded-full bg-[#2F4156] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 3: REINICIO AL PASO 1 */}
            <div className="pt-4 border-t border-[#C8D9E6] flex items-center justify-between">
              <button
                type="button"
                onClick={handleLogoClick}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-bold hover:bg-slate-50 transition-all shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#567C8D]" />
                <span>Reiniciar al Paso 1</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOptionsOpen(false)}
                className="px-6 py-2.5 rounded-2xl bg-[#2F4156] hover:bg-[#1e2d3d] text-white text-xs font-black shadow-md transition-all"
              >
                Listo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default OnboardingScreen;
