import { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { NikitinSidebar } from './components/NikitinSidebar';
import { NikitinTopbar } from './components/NikitinTopbar';
import { CardsCarousel } from './components/CardsCarousel';
import { QuickActionsBar } from './components/QuickActionsBar';
import { RecentSalesTable } from './components/RecentSalesTable';
import { StatisticPanel } from './components/StatisticPanel';
import { TransferModal } from './components/TransferModal';
import { 
  DEFAULT_CARDS, 
  RECENT_SALES, 
  STATISTIC_TRANSACTIONS 
} from './data/mockData';
import type { User, CardData, RecentSale } from './types';
import { CheckCircle2, X } from 'lucide-react';

export function App() {
  // Check active user session from localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nlspay_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // State for Cards & Sales with localStorage persistence
  const [cards, setCards] = useState<CardData[]>(() => {
    const saved = localStorage.getItem('nlspay_cards');
    return saved ? JSON.parse(saved) : DEFAULT_CARDS;
  });

  const [sales, setSales] = useState<RecentSale[]>(() => {
    const saved = localStorage.getItem('nlspay_sales');
    return saved ? JSON.parse(saved) : RECENT_SALES;
  });

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('nlspay_cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('nlspay_sales', JSON.stringify(sales));
  }, [sales]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('nlspay_session');
    setCurrentUser(null);
  };

  const handleAddCard = (newCard: CardData) => {
    setCards([...cards, newCard]);
    showToast(`Tarjeta ${newCard.type.toUpperCase()} •••• ${newCard.lastFour} agregada exitosamente.`);
  };

  const handleTransfer = (amount: number, recipient: string) => {
    // Deduct from first card
    if (cards.length > 0) {
      const updatedCards = [...cards];
      updatedCards[0].balance = Math.max(0, updatedCards[0].balance - amount);
      setCards(updatedCards);
    }

    // Add to recent sales
    const newSale: RecentSale = {
      id: `sale-${Date.now()}`,
      senderName: recipient,
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      date: 'Hoy',
      status: 'success',
      amount: -amount
    };

    setSales([newSale, ...sales]);
    showToast(`Transferencia de $${amount} a ${recipient} completada.`);
  };

  const handleActionClick = (actionName: string) => {
    showToast(`Módulo de ${actionName} en preparación.`);
  };

  // Filter sales by search query
  const filteredSales = sales.filter((s) =>
    s.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If user is not authenticated, show the Login/Register Screen (Image 2)
  if (!currentUser) {
    return <AuthScreen onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  // Once authenticated, show the redesigned Dashboard (Image 1)
  return (
    <div className="min-h-screen w-full bg-[#1e2026] flex items-center justify-center p-2 sm:p-4 md:p-8 font-sans selection:bg-blue-500/20 selection:text-blue-700">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-900 text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-gray-700 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Tablet/Device Bezel Container (Matching Image 1) */}
      <div className="w-full max-w-[1360px] min-h-[820px] bg-[#18191d] rounded-[38px] sm:rounded-[44px] p-2.5 sm:p-4 shadow-2xl flex border border-[#262830] overflow-hidden">
        
        {/* Left Dark Sidebar with Geometric 'N' Logo */}
        <NikitinSidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onLogout={handleLogout}
        />

        {/* Main Content Area: Light Canvas with Subtle Topo Curves */}
        <div className="flex-1 bg-[#f4f5f8] rounded-r-[32px] sm:rounded-r-[36px] p-4 sm:p-6 lg:p-8 overflow-y-auto relative flex flex-col justify-between">
          
          {/* Subtle Topographic Background Lines matching Image 1 */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 200 C 300 150, 500 250, 700 200 M50 400 C 250 350, 550 450, 750 400 M120 600 C 320 550, 480 650, 680 600' stroke='%23000' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '800px 800px'
            }}
          />

          <div className="relative z-10">
            {/* Topbar: Greetings + Search + My account */}
            <NikitinTopbar
              currentUser={currentUser}
              onLogout={handleLogout}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Main Columns Layout */}
            <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
              
              {/* Left/Center Column: Cards + Quick Actions + Recent Sales */}
              <div className="flex-1 w-full space-y-5">
                {/* 1. Cards Carousel */}
                <CardsCarousel
                  cards={cards}
                  onAddCard={handleAddCard}
                />

                {/* 2. Quick Actions Bar (Transfer, Utility, Taxes, Transport) */}
                <QuickActionsBar
                  onTransferClick={() => setIsTransferModalOpen(true)}
                  onActionClick={handleActionClick}
                />

                {/* 3. Recent Sales Table */}
                <RecentSalesTable sales={filteredSales} />
              </div>

              {/* Right Column: Floating Statistic Panel */}
              <StatisticPanel transactions={STATISTIC_TRANSACTIONS} />

            </div>
          </div>

          {/* Quick Footer Watermark */}
          <div className="relative z-10 pt-6 mt-4 border-t border-gray-200/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9ca3af]">
            <span>NlsPay Ecosystem • Arquitectura Rediseñada</span>
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="hover:text-blue-600 font-semibold transition-colors"
              >
                + Nueva Transferencia
              </button>
              <span>•</span>
              <button
                onClick={handleLogout}
                className="hover:text-rose-600 transition-colors"
              >
                Ver Pantalla de Login
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Transfer Funds Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        cards={cards}
        onTransferSuccess={handleTransfer}
      />

    </div>
  );
}

export default App;
