import React, { useState } from 'react';
import { Search, ChevronDown, User as UserIcon, LogOut, Plus, DollarSign } from 'lucide-react';
import type { User } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

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
  const { t } = useLanguage();

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative select-none">
      {/* Left: User Avatar & Greeting in Corporate Navy / Teal */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-[#C8D9E6]/40 flex items-center justify-center">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-[#2F4156] leading-tight flex items-center gap-1.5">
            <span>{t.greetings} 👋</span>
          </h1>
          <p className="text-xs text-[#567C8D] font-medium">
            {t.startDayWith} <span className="font-bold text-[#2F4156]">{currentUser.name}</span>
          </p>
        </div>
      </div>

      {/* Center: Search Bar in Corporate Palette (#F5EFEB / #C8D9E6 / #567C8D) */}
      <div className="w-full md:w-72 xl:w-80 relative">
        <Search className="w-4 h-4 text-[#567C8D] absolute left-3.5 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/90 hover:bg-white focus:bg-white border border-[#C8D9E6] focus:border-[#567C8D] text-[#2F4156] text-xs sm:text-sm rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#567C8D]/20 transition-all placeholder:text-[#567C8D]/60 shadow-sm"
        />
      </div>

      {/* Right Controls: Language Selector + Currency + "+ Gasto" + My Account */}
      <div className="flex items-center gap-2 sm:gap-2.5 self-end md:self-auto flex-wrap">
        
        {/* Language Selector Popover matching reference image */}
        <LanguageSelector variant="solid" />

        {/* Currency Switcher */}
        <button
          onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-white hover:bg-[#F5EFEB] border border-[#C8D9E6] text-xs font-mono font-bold text-[#2F4156] shadow-sm transition-all"
          title="Cambiar divisa / Currency"
        >
          <DollarSign className="w-3.5 h-3.5 text-[#567C8D]" />
          <span>{currency}</span>
        </button>

        {/* CTA: + Registrar Gasto in Teal (#567C8D) with Navy hover (#2F4156) */}
        <button
          onClick={onOpenAddTransaction}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#567C8D] hover:bg-[#2F4156] text-white font-bold text-xs shadow-md transition-all transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{t.newExpense}</span>
        </button>

        {/* My Account Pill Dropdown in Navy (#2F4156) */}
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#2F4156] hover:bg-[#1e2d3d] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <UserIcon className="w-3 h-3 text-white" />
            </div>
            <span>{t.myAccount}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Dropdown Menu */}
          {showAccountMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#C8D9E6] py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-[#2F4156] truncate">{currentUser.name}</p>
                <p className="text-[11px] text-[#567C8D] truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowAccountMenu(false);
                  onLogout();
                }}
                className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logout}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
