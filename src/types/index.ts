export type TransactionType = 'expense' | 'income';

export type PaymentMethod = 
  | 'Tarjeta Débito (NlsPay)'
  | 'Visa Platinum •••• 1810'
  | 'Mastercard Black •••• 1423'
  | 'Apple Pay'
  | 'Transferencia Bancaria'
  | 'Efectivo';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CardData {
  id: string;
  type: 'visa' | 'mastercard';
  balance: number;
  currencySymbol: string;
  lastFour: string;
  expiryDate: string;
  theme: 'dark' | 'light';
}

export interface RecentSale {
  id: string;
  senderName: string;
  senderAvatar: string;
  date: string;
  status: 'success' | 'process' | 'failed';
  amount: number;
}

export interface StatisticTransaction {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
  amount: number;
  icon: 'spotify' | 'apple' | 'bitcoin' | 'binance';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  subcategory: string;
  paymentMethod: PaymentMethod;
  date: string;
  isRecurring: boolean;
  status: 'completed' | 'pending' | 'flagged';
  merchantIcon?: string;
}

export interface CategoryStructure {
  id: string;
  name: string;
  color: string;
  icon: string;
  subcategories: string[];
}

export interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  warningThreshold: number;
  color: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  category: string;
  color: string;
}

export interface AIInsight {
  id: string;
  title: string;
  metric: string;
  description: string;
  recommendation: string;
  savingsPotential: number;
  badge: string;
  type: 'warning' | 'opportunity' | 'success';
}

export interface MonthlyCashflow {
  month: string;
  ingresos: number;
  gastos: number;
  ahorro: number;
}
