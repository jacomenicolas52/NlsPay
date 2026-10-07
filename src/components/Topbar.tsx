import React from 'react';
import { 
  Plus, 
  Bell, 
  Search, 
  Calendar, 
  Menu,
  Activity,
  DollarSign
} from 'lucide-react';

interface TopbarProps {
  onOpenAddTransaction: () => void;
  currency: 'COP' | 'USD';
  setCurrency: (c: 'COP' | 'USD') => void;
  onToggleMobileMenu?: () => void;
  activeTabTitle: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenAddTransaction,
  currency,
  setCurrency,
  onToggleMobileMenu,
  activeTabTitle
}) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/[0.08] bg-[#050811]/80 backdrop-blur-xl px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button 
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white">
                {activeTabTitle}
              </h1>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </div>
            </div>
            <p className="hidden md:block text-xs text-slate-400 font-medium">
              Ecosistema Analítico Institucional de Finanzas Personales
            </p>
          </div>
        </div>

        {/* Center: Quick Search */}
        <div className="hidden xl:flex items-center relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar transacciones, etiquetas..."
            className="w-full bg-[#0c1220]/80 border border-white/10 focus:border-emerald-400 text-xs text-slate-200 rounded-xl pl-9 pr-12 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
          />
          <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.05] border border-white/10 rounded">
            ⌘K
          </kbd>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Period Selector */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 hover:border-white/20 transition-all cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium">Octubre 2026</span>
          </div>

          {/* Currency Switcher */}
          <button
            onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-all"
            title="Cambiar divisa de visualización"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currency}</span>
          </button>

          {/* Health indicator */}
          <div className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-[11px] text-cyan-300 font-mono">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Score: 885/1000</span>
          </div>

          {/* Notifications Button */}
          <button 
            aria-label="Notificaciones"
            className="relative p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#050811]" />
          </button>

          {/* CTA: Nuevo Gasto */}
          <button
            onClick={onOpenAddTransaction}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-semibold text-xs sm:text-sm shadow-glow-teal hover:shadow-[0_0_30px_rgba(20,241,149,0.4)] transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden xs:inline">Nuevo Movimiento</span>
            <span className="xs:hidden">Nuevo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
