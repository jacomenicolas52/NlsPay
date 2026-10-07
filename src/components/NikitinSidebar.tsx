import React from 'react';
import { NlsPayLogo } from './NlsPayLogo';
import { 
  LayoutGrid, 
  ArrowLeftRight, 
  BarChart3, 
  Target, 
  Sparkles, 
  ScanLine, 
  Users, 
  MapPin, 
  LogOut 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NikitinSidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onLogout: () => void;
  onOpenScanner?: () => void;
}

export const NikitinSidebar: React.FC<NikitinSidebarProps> = ({
  currentTab,
  setCurrentTab,
  onLogout,
  onOpenScanner
}) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: t.navDashboard },
    { id: 'transactions', icon: ArrowLeftRight, label: t.navTransactions },
    { id: 'analytics', icon: BarChart3, label: t.navAnalytics },
    { id: 'budgets', icon: Target, label: t.navBudgets },
    { id: 'ai-health', icon: Sparkles, label: t.navAiHealth },
    { id: 'scanner', icon: ScanLine, label: t.navScanner, isModal: true },
    { id: 'shared', icon: Users, label: t.navShared },
    { id: 'map', icon: MapPin, label: t.navMap },
  ];

  return (
    <aside className="w-16 sm:w-20 bg-[#2F4156] h-full flex flex-col items-center justify-between py-6 rounded-l-[32px] sm:rounded-l-[36px] border-r border-[#567C8D]/30 select-none shrink-0 z-20">
      {/* Top Stylized NlsPay Logo */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => setCurrentTab('dashboard')}
          className="cursor-pointer group flex items-center justify-center w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#567C8D] transition-all p-1.5 shadow-sm"
          title="NlsPay Dashboard"
        >
          <NlsPayLogo className="w-8 h-8 drop-shadow-sm" isDark={false} />
        </button>

        {/* Navigation Icons with Active Indicator Dot */}
        <nav className="flex flex-col items-center gap-3 mt-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <div key={item.id} className="relative flex items-center">
                <button
                  onClick={() => {
                    if (item.isModal && onOpenScanner) {
                      onOpenScanner();
                    } else {
                      setCurrentTab(item.id);
                    }
                  }}
                  className={`p-2.5 sm:p-3 rounded-[18px] transition-all relative ${
                    isActive
                      ? 'text-white bg-[#567C8D] border border-[#C8D9E6]/70 shadow-lg shadow-[#567C8D]/25'
                      : 'text-[#C8D9E6]/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </button>

                {/* Active indicator dot in Sky Blue matching Image 2 */}
                {isActive && (
                  <span className="absolute -left-2.5 w-1.5 h-1.5 rounded-full bg-[#C8D9E6] shadow-xs" />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Button */}
      <div className="relative flex items-center">
        <button
          onClick={onLogout}
          className="p-2.5 rounded-xl text-[#C8D9E6]/70 hover:text-rose-300 hover:bg-rose-500/20 transition-all"
          title={t.navLogout}
        >
          <LogOut className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>
    </aside>
  );
};
