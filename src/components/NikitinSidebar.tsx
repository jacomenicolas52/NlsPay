import React from 'react';
import { 
  LayoutGrid, 
  CalendarDays, 
  CreditCard, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface NikitinSidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onLogout: () => void;
}

export const NikitinSidebar: React.FC<NikitinSidebarProps> = ({
  currentTab,
  setCurrentTab,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'calendar', icon: CalendarDays, label: 'Planificación' },
    { id: 'cards', icon: CreditCard, label: 'Billetera & Tarjetas' },
    { id: 'analytics', icon: BarChart3, label: 'Estadísticas' },
    { id: 'messages', icon: MessageSquare, label: 'Mensajes' },
    { id: 'notifications', icon: Bell, label: 'Notificaciones' },
    { id: 'settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className="w-16 sm:w-20 bg-[#191a1f] h-full flex flex-col items-center justify-between py-6 rounded-l-[32px] sm:rounded-l-[36px] border-r border-[#262830] select-none shrink-0 z-20">
      {/* Top Stylized 'N' Brand Logo */}
      <div className="flex flex-col items-center gap-6">
        <div 
          onClick={() => setCurrentTab('dashboard')}
          className="cursor-pointer group flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          title="NlsPay Home"
        >
          {/* Stylized N geometric logo matching Image 1 */}
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h4.5l7 10.5V4H20v16h-4.5l-7-10.5V20H4V4z" />
          </svg>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col items-center gap-3.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <div key={item.id} className="relative flex items-center">
                <button
                  onClick={() => setCurrentTab(item.id)}
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
          className="p-2.5 rounded-xl text-[#7e8494] hover:text-rose-400 hover:bg-rose-500/10 transition-all group"
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>
    </aside>
  );
};
