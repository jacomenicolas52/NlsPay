export type TransactionType = 'expense' | 'income';

export type PaymentMethod = 
  | 'Tarjeta Débito (NlsPay)'
  | 'Visa Platinum •••• 4829'
  | 'Mastercard Black •••• 9102'
  | 'Apple Pay'
  | 'Transferencia Bancaria'
  | 'Efectivo';

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
  warningThreshold: number; // e.g. 0.85
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
