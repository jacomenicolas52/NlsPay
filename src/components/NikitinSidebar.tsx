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
  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard Principal' },
    { id: 'transactions', icon: ArrowLeftRight, label: 'Módulo de Gastos' },
    { id: 'analytics', icon: BarChart3, label: 'Centro de Estadísticas' },
    { id: 'budgets', icon: Target, label: 'Metas y Presupuestos' },
    { id: 'ai-health', icon: Sparkles, label: 'IA Salud Financiera' },
    { id: 'scanner', icon: ScanLine, label: 'Escáner OCR de Recibos', isModal: true },
    { id: 'shared', icon: Users, label: 'Cuentas Compartidas' },
    { id: 'map', icon: MapPin, label: 'Mapa de Gastos' },
  ];

  return (
    <aside className="w-16 sm:w-20 bg-[#191a1f] h-full flex flex-col items-center justify-between py-6 rounded-l-[32px] sm:rounded-l-[36px] border-r border-[#262830] select-none shrink-0 z-20">
      {/* Top Stylized 'N' Brand Logo */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => setCurrentTab('dashboard')}
          className="cursor-pointer group flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all p-1"
          title="NlsPay Dashboard"
        >
          <NlsPayLogo className="w-7 h-7 drop-shadow-sm" isDark={false} />
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
                  className={`p-2.5 rounded-xl transition-all relative ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-[#7e8494] hover:text-[#d1d5db] hover:bg-white/5'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </button>

                {/* Active white indicator dot matching Image 1 */}
                {isActive && (
                  <span className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Button with Dot */}
      <div className="relative flex items-center">
        <button
          onClick={onLogout}
          className="p-2.5 rounded-xl text-[#7e8494] hover:text-rose-400 hover:bg-rose-500/10 transition-all"
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>
    </aside>
  );
};
