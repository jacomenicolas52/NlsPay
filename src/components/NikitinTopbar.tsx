import React, { useState } from 'react';
import { Search, ChevronDown, User as UserIcon, LogOut, Plus, DollarSign } from 'lucide-react';
import type { User } from '../types';

interface NikitinTopbarProps {
  currentUser: User;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenAddTransaction: () => void;
  currency: 'COP' | 'USD';
  setCurrency: (c: 'COP' | 'USD') => void;
}

export const NikitinTopbar: React.FC<NikitinTopbarProps> = ({
  currentUser,
  onLogout,
  searchQuery,
  setSearchQuery,
  onOpenAddTransaction,
  currency,
  setCurrency
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative select-none">
      {/* Left: User Avatar & Greeting matching Image 1 */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-amber-100 flex items-center justify-center">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-[#111827] leading-tight flex items-center gap-1">
            <span>Greetings! 👋</span>
          </h1>
          <p className="text-xs text-[#9ca3af] font-medium">
            Start your day with {currentUser.name}
          </p>
        </div>
      </div>

      {/* Center: Search Bar matching Image 1 */}
      <div className="w-full md:w-72 xl:w-80 relative">
        <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#f3f4f6]/90 hover:bg-[#ebeef2] focus:bg-white border border-transparent focus:border-gray-200 text-[#111827] text-xs sm:text-sm rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-[#9ca3af]"
        />
      </div>

      {/* Right Controls: Currency + "+ Gasto" + My Account */}
      <div className="flex items-center gap-2.5 self-end md:self-auto">
        {/* Currency Switcher */}
        <button
          onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-700 shadow-sm transition-all"
          title="Cambiar moneda"
        >
          <DollarSign className="w-3.5 h-3.5 text-blue-600" />
          <span>{currency}</span>
        </button>

        {/* CTA: + Registrar Gasto */}
        <button
          onClick={onOpenAddTransaction}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e3fe4] hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Nuevo Gasto</span>
        </button>

        {/* My Account Pill Dropdown matching Image 1 */}
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1b1c21] text-white text-xs font-semibold shadow-sm hover:bg-[#282a32] transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <UserIcon className="w-3 h-3 text-white" />
            </div>
            <span>My account</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Dropdown Menu */}
          {showAccountMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowAccountMenu(false);
                  onLogout();
                }}
                className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
