import { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { NikitinSidebar } from './components/NikitinSidebar';
import { NikitinTopbar } from './components/NikitinTopbar';
import { CardsCarousel } from './components/CardsCarousel';
import { QuickActionsBar } from './components/QuickActionsBar';
import { RecentSalesTable } from './components/RecentSalesTable';
import { StatisticPanel } from './components/StatisticPanel';
import { TransferModal } from './components/TransferModal';
import { MetricCards } from './components/MetricCards';
import { AIHealthWidget } from './components/AIHealthWidget';
import { BudgetsAndGoals } from './components/BudgetsAndGoals';
import { RecentTransactions } from './components/RecentTransactions';
import { CashflowChart } from './components/CashflowChart';
import { ExpenseCategoriesChart } from './components/ExpenseCategoriesChart';
import { ReceiptScannerModal } from './components/ReceiptScannerModal';
import { SharedExpensesView } from './components/SharedExpensesModal';
import { ExpenseMapView } from './components/ExpenseMapView';
import { AddTransactionModal } from './components/AddTransactionModal';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { 
  DEFAULT_CARDS, 
  RECENT_SALES, 
  STATISTIC_TRANSACTIONS, 
  INITIAL_TRANSACTIONS,
  MONTHLY_CASHFLOW,
  BUDGETS,
  FINANCIAL_GOALS,
  AI_INSIGHTS
} from './data/mockData';
import type { User, CardData, RecentSale, Transaction } from './types';
import { CheckCircle2, X, Sparkles, Layers } from 'lucide-react';

function AppContent() {
  const { t } = useLanguage();

  // Login appears first as requested ("primero que todo debe aparecer primero el login")
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // State with localStorage persistence
  const [cards, setCards] = useState<CardData[]>(() => {
    const saved = localStorage.getItem('nlspay_cards');
    return saved ? JSON.parse(saved) : DEFAULT_CARDS;
  });

  const [sales, setSales] = useState<RecentSale[]>(() => {
    const saved = localStorage.getItem('nlspay_sales');
    return saved ? JSON.parse(saved) : RECENT_SALES;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('nlspay_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('nlspay_cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('nlspay_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('nlspay_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('nlspay_session');
    setCurrentUser(null);
    setShowOnboarding(false);
  };

  const handleAddCard = (newCard: CardData) => {
    setCards([...cards, newCard]);
    showToast(`Tarjeta ${newCard.type.toUpperCase()} •••• ${newCard.lastFour} agregada exitosamente.`);
  };

  const handleTransfer = (amount: number, recipient: string) => {
    if (cards.length > 0) {
      const updatedCards = [...cards];
      updatedCards[0].balance = Math.max(0, updatedCards[0].balance - amount);
      setCards(updatedCards);
    }

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

  const handleAddTransaction = (newTxData: Omit<Transaction, 'id' | 'status'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}`,
      status: 'completed',
    };
    setTransactions([newTx, ...transactions]);
    showToast(`Movimiento "${newTx.description}" registrado con éxito.`);
  };

  const handleImportReceipt = (receiptData: {
    description: string;
    amount: number;
    category: string;
    subcategory: string;
  }) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      description: receiptData.description,
      amount: receiptData.amount,
      type: 'expense',
      category: receiptData.category,
      subcategory: receiptData.subcategory,
      paymentMethod: 'Tarjeta Débito (NlsPay)',
      date: new Date().toISOString(),
      isRecurring: false,
      status: 'completed'
    };
    setTransactions([newTx, ...transactions]);
    showToast(`Factura de "${receiptData.description}" importada exitosamente vía OCR.`);
  };

  const handleActionClick = (actionName: string) => {
    if (actionName === 'Utility' || actionName === 'Taxes' || actionName === 'Transport') {
      setIsAddTransactionModalOpen(true);
    } else {
      showToast(`Módulo de ${actionName} seleccionado.`);
    }
  };

  // Financial calculations
  const totalBalance = 34820000;
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Filter sales by search query
  const filteredSales = sales.filter((s) =>
    s.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 1. If user is not authenticated, show AuthScreen (Option 1 only with fintech background)
  if (!currentUser) {
    return (
      <AuthScreen 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setShowOnboarding(true);
        }} 
      />
    );
  }

  // 2. If authenticated and in onboarding flow, show the 3-step OnboardingScreen
  if (showOnboarding) {
    return (
      <OnboardingScreen
        user={currentUser}
        onFinish={() => setShowOnboarding(false)}
      />
    );
  }

  // Once authenticated, show the redesigned Dashboard in corporate palette (Navy, Teal, Sky Blue, Beige, White)
  return (
    <div className="min-h-screen w-full bg-[#2F4156] flex items-center justify-center p-2 sm:p-4 md:p-8 font-sans selection:bg-[#C8D9E6] selection:text-[#2F4156]">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-[#C8D9E6] text-[#2F4156] text-xs font-bold shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-[#567C8D] hover:text-[#2F4156] ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Tablet/Device Bezel Container */}
      <div className="w-full max-w-[1440px] min-h-[860px] bg-[#1e2d3d] rounded-[38px] sm:rounded-[44px] p-2 sm:p-3.5 shadow-2xl flex border border-[#567C8D]/40 overflow-hidden">
        
        {/* Left Dark Sidebar with Geometric NlsPay Logo */}
        <NikitinSidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onLogout={handleLogout}
          onOpenScanner={() => setIsScannerModalOpen(true)}
        />

        {/* Main Content Area: Soft Beige Canvas */}
        <div className="flex-1 bg-[#F5EFEB] rounded-r-[32px] sm:rounded-r-[36px] p-4 sm:p-6 lg:p-7 overflow-y-auto relative flex flex-col justify-between">
          
          {/* Subtle Topographic Background Lines */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 200 C 300 150, 500 250, 700 200 M50 400 C 250 350, 550 450, 750 400 M120 600 C 320 550, 480 650, 680 600' stroke='%232F4156' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '800px 800px'
            }}
          />

          <div className="relative z-10 space-y-6">
            {/* Topbar: Greetings + Search + Language Switcher + Currency + "+ Nuevo Gasto" + My account */}
            <NikitinTopbar
              currentUser={currentUser}
              onLogout={handleLogout}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenAddTransaction={() => setIsAddTransactionModalOpen(true)}
              currency={currency}
              setCurrency={setCurrency}
            />

            {/* TAB 1: DASHBOARD PRINCIPAL */}
            {currentTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 1. KPI Metric Cards */}
                <MetricCards
                  totalBalance={totalBalance}
                  totalIncome={totalIncome}
                  totalExpense={totalExpense}
                  currency={currency}
                />

                {/* 2. Main Columns Layout: Cards + Quick Actions + Table | Right Statistic Panel */}
                <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
                  
                  {/* Left Column */}
                  <div className="flex-1 w-full space-y-5">
                    {/* Visual Cards Carousel */}
                    <CardsCarousel
                      cards={cards}
                      onAddCard={handleAddCard}
                    />

                    {/* Quick Action Pill Buttons */}
                    <QuickActionsBar
                      onTransferClick={() => setIsTransferModalOpen(true)}
                      onActionClick={handleActionClick}
                    />

                    {/* IA de Salud Financiera */}
                    <AIHealthWidget
                      insights={AI_INSIGHTS}
                      currency={currency}
                      onActionSuccess={showToast}
                    />

                    {/* Recent Sales Table */}
                    <RecentSalesTable sales={filteredSales} />
                  </div>

                  {/* Right Column: Floating Statistic Panel with Donut Chart and Store Transactions */}
                  <div className="w-full lg:w-[360px] xl:w-[400px] space-y-5">
                    <StatisticPanel transactions={STATISTIC_TRANSACTIONS} />
                  </div>

                </div>

                {/* 3. Metas y Presupuestos con Alertas en el Dashboard */}
                <BudgetsAndGoals
                  budgets={BUDGETS}
                  goals={FINANCIAL_GOALS}
                  currency={currency}
                  onAddGoal={() => setIsAddTransactionModalOpen(true)}
                />

                {/* 4. Últimos Movimientos Detallados */}
                <RecentTransactions
                  transactions={transactions}
                  currency={currency}
                  onViewAll={() => setCurrentTab('transactions')}
                />
              </div>
            )}

            {/* TAB 2: MÓDULO DE GASTOS & LIBRO MAYOR */}
            {currentTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#2F4156]">{t.navTransactions}</h2>
                    <p className="text-xs text-[#567C8D]">Gestión clasificada con categorías y subcategorías inteligentes</p>
                  </div>
                  <button
                    onClick={() => setIsAddTransactionModalOpen(true)}
                    className="px-5 py-2.5 rounded-full bg-[#567C8D] hover:bg-[#2F4156] text-white font-bold text-xs shadow-md transition-all"
                  >
                    {t.recordMovement}
                  </button>
                </div>
                <RecentTransactions
                  transactions={transactions}
                  currency={currency}
                />
              </div>
            )}

            {/* TAB 3: CENTRO DE ESTADÍSTICAS */}
            {currentTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <CashflowChart data={MONTHLY_CASHFLOW} currency={currency} />
                  </div>
                  <div className="xl:col-span-1">
                    <ExpenseCategoriesChart currency={currency} />
                  </div>
                </div>
                <StatisticPanel transactions={STATISTIC_TRANSACTIONS} />
              </div>
            )}

            {/* TAB 4: METAS Y PRESUPUESTOS */}
            {currentTab === 'budgets' && (
              <div className="space-y-6">
                <BudgetsAndGoals
                  budgets={BUDGETS}
                  goals={FINANCIAL_GOALS}
                  currency={currency}
                  onAddGoal={() => setIsAddTransactionModalOpen(true)}
                />
              </div>
            )}

            {/* TAB 5: IA DE SALUD FINANCIERA */}
            {currentTab === 'ai-health' && (
              <div className="space-y-6">
                <AIHealthWidget
                  insights={AI_INSIGHTS}
                  currency={currency}
                  onActionSuccess={showToast}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white p-6 rounded-[28px] border border-[#C8D9E6]/70 shadow-md">
                    <h4 className="text-sm font-bold text-[#2F4156] mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#567C8D]" />
                      Auditoría Automática de Fugas de Capital
                    </h4>
                    <p className="text-xs text-[#567C8D] leading-relaxed">
                      NlsPay audita cada micro-gasto recurrente, fluctuaciones en suscripciones y comisiones para alertarte antes del cierre contable de mes.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-[28px] border border-[#C8D9E6]/70 shadow-md">
                    <h4 className="text-sm font-bold text-[#2F4156] mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#567C8D]" />
                      Optimización Fiscal & Conciliación
                    </h4>
                    <p className="text-xs text-[#567C8D] leading-relaxed">
                      Tus gastos se organizan automáticamente para deducción de impuestos y emisión de reportes financieros certificados.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: CUENTAS COMPARTIDAS */}
            {currentTab === 'shared' && (
              <SharedExpensesView currency={currency} />
            )}

            {/* TAB 7: MAPA DE GASTOS */}
            {currentTab === 'map' && (
              <ExpenseMapView />
            )}
          </div>

          {/* Quick Footer in Corporate Palette */}
          <div className="relative z-10 pt-6 mt-6 border-t border-[#C8D9E6]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#567C8D]">
            <span>{t.ecosystemFooter}</span>
            <div className="flex items-center gap-3 mt-2 sm:mt-0 font-bold">
              <button
                onClick={() => setIsAddTransactionModalOpen(true)}
                className="hover:text-[#2F4156] transition-colors"
              >
                + {t.newExpense}
              </button>
              <span>•</span>
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="hover:text-[#2F4156] transition-colors"
              >
                {t.actionTransfer}
              </button>
              <span>•</span>
              <button
                onClick={() => setIsScannerModalOpen(true)}
                className="hover:text-[#2F4156] transition-colors"
              >
                {t.ocrScannerTitle}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Modals */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        cards={cards}
        onTransferSuccess={handleTransfer}
      />

      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        currency={currency}
      />

      <ReceiptScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        onImportReceipt={handleImportReceipt}
        currency={currency}
      />

    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
