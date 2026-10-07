import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Target, 
  Sparkles, 
  ScanLine, 
  Users2, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronRight,
  Wallet
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenScanner: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  onOpenScanner,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutDashboard, badge: null },
    { id: 'transactions', label: 'Movimientos & Gastos', icon: ArrowLeftRight, badge: '8 hoy' },
    { id: 'analytics', label: 'Centro de Estadísticas', icon: PieChart, badge: null },
    { id: 'budgets', label: 'Metas & Presupuestos', icon: Target, badge: '2 alertas' },
    { id: 'ai-health', label: 'IA Salud Financiera', icon: Sparkles, badge: 'PRO' },
  ];

  const toolsItems = [
    { id: 'scanner', label: 'Escáner OCR Recibos', icon: ScanLine, action: onOpenScanner },
    { id: 'shared', label: 'Cuentas Compartidas', icon: Users2, tab: 'shared' },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 hidden lg:flex flex-col justify-between border-r border-white/[0.08] bg-[#070B14]/90 backdrop-blur-2xl z-30 select-none">
      {/* Brand Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-[1px] shadow-glow-teal">
            <div className="w-full h-full bg-[#080d19] rounded-[11px] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            {/* Glowing dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#070B14] animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#070B14]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Nls<span className="text-emerald-400">Pay</span></span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                FINTECH
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Tu dinero. Tu control.</p>
          </div>
        </div>

        {/* Financial Security Badge */}
        <div className="mt-6 p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-transparent border border-emerald-500/20 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[11px]">
            <span className="text-emerald-300 font-semibold block">Cifrado Bancario Activo</span>
            <span className="text-slate-400 text-[10px]">TLS 1.3 • AES-256 bits</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Módulos Principales
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/15 to-cyan-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_-3px_rgba(20,241,149,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                      item.badge === 'PRO'
                        ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-bold'
                        : 'bg-white/[0.06] text-slate-300 border border-white/10'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Advanced Tools Navigation */}
        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Herramientas Avanzadas
          </p>
          <nav className="space-y-1">
            {toolsItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.tab && currentTab === item.tab;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.tab) {
                      setCurrentTab(item.tab);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer Profile & Login Preview */}
      <div className="p-4 border-t border-white/[0.08] bg-[#050812]/80">
        <button
          onClick={onOpenAuth}
          className="w-full mb-3 py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 flex items-center justify-between transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Modal de Autenticación
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">Ver Login</span>
        </button>

        <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1.5px]">
              <div className="w-full h-full rounded-full bg-[#0a0e1c] flex items-center justify-center text-xs font-bold text-white">
                NJ
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white leading-tight">Nicolás J.</p>
              <p className="text-[10px] text-slate-400">Plan Institutional PRO</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              aria-label="Configuración" 
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={onOpenAuth}
              aria-label="Cerrar sesión" 
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
