import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MetricCards } from './components/MetricCards';
import { CashflowChart } from './components/CashflowChart';
import { ExpenseCategoriesChart } from './components/ExpenseCategoriesChart';
import { AIHealthWidget } from './components/AIHealthWidget';
import { RecentTransactions } from './components/RecentTransactions';
import { BudgetsAndGoals } from './components/BudgetsAndGoals';
import { AddTransactionModal } from './components/AddTransactionModal';
import { ReceiptScannerModal } from './components/ReceiptScannerModal';
import { SharedExpensesView } from './components/SharedExpensesModal';
import { AuthModal } from './components/AuthModal';
import { 
  INITIAL_TRANSACTIONS, 
  MONTHLY_CASHFLOW, 
  BUDGETS, 
  FINANCIAL_GOALS, 
  AI_INSIGHTS 
} from './data/mockData';
import type { Transaction } from './types';
import { CheckCircle2, X, Sparkles, Layers } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute live aggregates from transactions
  const totalBalance = 34820000;
  const currentMonthTransactions = transactions;
  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = currentMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleAddTransaction = (newTxData: Omit<Transaction, 'id' | 'status'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}`,
      status: 'completed',
    };
    setTransactions([newTx, ...transactions]);
    showToast(`Movimiento "${newTx.description}" registrado con éxito en el Libro Mayor.`);
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

  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Dashboard Principal';
      case 'transactions': return 'Libro Mayor de Movimientos';
      case 'analytics': return 'Centro Analítico & Estadísticas';
      case 'budgets': return 'Metas de Capitalización & Presupuestos';
      case 'ai-health': return 'IA de Salud Financiera';
      case 'shared': return 'Cuentas Compartidas';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050811] text-slate-100 font-sans relative selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-64 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenScanner={() => setIsScannerModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onOpenAddTransaction={() => setIsAddModalOpen(true)}
          currency={currency}
          setCurrency={setCurrency}
          activeTabTitle={getTabTitle()}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Floating Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#090f1d] border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(20,241,149,0.2)] animate-in fade-in slide-in-from-bottom-5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Navigation Subheader / Section Switcher */}
        <div className="border-b border-white/[0.06] bg-[#070b16]/60 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between gap-3 min-w-max">
            {/* Sections Pills */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] font-mono text-slate-400 mr-1 uppercase tracking-wider font-semibold">
                Secciones:
              </span>
              {[
                { id: 'dashboard', label: '1. Dashboard Global', icon: '📊' },
                { id: 'transactions', label: '2. Movimientos & Gastos', icon: '💳' },
                { id: 'analytics', label: '3. Centro Analítico', icon: '📈' },
                { id: 'budgets', label: '4. Metas & Presupuestos', icon: '🎯' },
                { id: 'ai-health', label: '5. IA Salud Financiera', icon: '🧠' },
                { id: 'shared', label: '6. Cuentas Compartidas', icon: '👥' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                    currentTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_-3px_rgba(20,241,149,0.25)] font-bold'
                      : 'text-slate-400 hover:text-slate-200 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04]'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Demo Modals Trigger */}
            <div className="flex items-center gap-2 pl-3 border-l border-white/10 text-xs">
              <button
                onClick={() => setIsScannerModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/25 transition-all font-semibold"
                title="Abrir Escáner OCR de facturas"
              >
                <span>🧾</span>
                <span>7. Escáner OCR</span>
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/25 transition-all font-semibold"
                title="Abrir Pantalla de Autenticación Premium"
              >
                <span>🔐</span>
                <span>8. Login Premium</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
          {currentTab === 'dashboard' && (
            <>
              {/* 1. Quick KPI Metrics (Summary in <10 seconds) */}
              <MetricCards
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                currency={currency}
              />

              {/* 2. Charts Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="xl:col-span-2">
                  <CashflowChart data={MONTHLY_CASHFLOW} currency={currency} />
                </div>
                <div className="xl:col-span-1">
                  <ExpenseCategoriesChart currency={currency} />
                </div>
              </div>

              {/* 3. AI Health Advisor Widget (Diferenciador) */}
              <AIHealthWidget
                insights={AI_INSIGHTS}
                currency={currency}
                onActionSuccess={showToast}
              />

              {/* 4. Metas y Presupuestos */}
              <BudgetsAndGoals
                budgets={BUDGETS}
                goals={FINANCIAL_GOALS}
                currency={currency}
                onAddGoal={() => setIsAddModalOpen(true)}
              />

              {/* 5. Últimos Movimientos */}
              <RecentTransactions
                transactions={transactions}
                currency={currency}
                onViewAll={() => setCurrentTab('transactions')}
              />
            </>
          )}

          {currentTab === 'transactions' && (
            <div className="space-y-6">
              <RecentTransactions
                transactions={transactions}
                currency={currency}
              />
            </div>
          )}

          {currentTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="xl:col-span-2">
                  <CashflowChart data={MONTHLY_CASHFLOW} currency={currency} />
                </div>
                <div className="xl:col-span-1">
                  <ExpenseCategoriesChart currency={currency} />
                </div>
              </div>
              <AIHealthWidget
                insights={AI_INSIGHTS}
                currency={currency}
                onActionSuccess={showToast}
              />
            </div>
          )}

          {currentTab === 'budgets' && (
            <div className="space-y-6">
              <BudgetsAndGoals
                budgets={BUDGETS}
                goals={FINANCIAL_GOALS}
                currency={currency}
                onAddGoal={() => setIsAddModalOpen(true)}
              />
            </div>
          )}

          {currentTab === 'ai-health' && (
            <div className="space-y-6">
              <AIHealthWidget
                insights={AI_INSIGHTS}
                currency={currency}
                onActionSuccess={showToast}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="glass-panel p-5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Auditoría Automática de Fugas de Capital
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    NlsPay audita cada micro-gasto recurrente, fluctuaciones de precios en servicios públicos y tarifas bancarias no deseadas para alertarte antes del cierre contable de mes.
                  </p>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Optimización Fiscal & Conciliación
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tus gastos empresariales y personales se segregan automáticamente para deducción de impuestos y emisión de reportes contables certificados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'shared' && (
            <SharedExpensesView currency={currency} />
          )}
        </main>
      </div>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        currency={currency}
      />

      <ReceiptScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        onImportReceipt={handleImportReceipt}
        currency={currency}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => showToast('Sesión iniciada con éxito.')}
      />
    </div>
  );
}

export default App;
