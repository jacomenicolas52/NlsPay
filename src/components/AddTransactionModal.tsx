import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Tag, 
  CreditCard, 
  Calendar, 
  Repeat, 
  Sparkles, 
  ArrowDownLeft, 
  ArrowUpRight 
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import type { PaymentMethod, Transaction, TransactionType } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<Transaction, 'id' | 'status'>) => void;
  currency: 'COP' | 'USD';
}

const PAYMENT_METHODS: PaymentMethod[] = [
  'Tarjeta Débito (NlsPay)',
  'Visa Platinum •••• 4829',
  'Mastercard Black •••• 9102',
  'Apple Pay',
  'Transferencia Bancaria',
  'Efectivo'
];

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  currency
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
  const [selectedSubcategory, setSelectedSubcategory] = useState(CATEGORIES[0].subcategories[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isRecurring, setIsRecurring] = useState(false);

  if (!isOpen) return null;

  // Find subcategories for selected category
  const activeCategoryObj = CATEGORIES.find((c) => c.name === selectedCategory) || CATEGORIES[0];

  const handleCategoryChange = (catName: string) => {
    setSelectedCategory(catName);
    const cat = CATEGORIES.find((c) => c.name === catName);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSubcategory(cat.subcategories[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (!description.trim() || isNaN(numAmount) || numAmount <= 0) {
      alert('Por favor ingresa una descripción y un monto válido.');
      return;
    }

    onAddTransaction({
      description,
      amount: numAmount,
      type,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      paymentMethod,
      date: new Date(date).toISOString(),
      isRecurring
    });

    // Reset & close
    setDescription('');
    setAmount('');
    setIsRecurring(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl glass-panel border border-white/10 p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Registrar Movimiento
              </h2>
              <p className="text-xs text-slate-400">
                Módulo inteligente de conciliación de gastos e ingresos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selector (Gasto vs Ingreso) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#080d1a] border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                type === 'expense'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-rose-400" />
              Gasto
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                type === 'income'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
              Ingreso
            </button>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Valor / Importe ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono text-sm">$</span>
              <input
                type="number"
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#0a0f1f] border border-white/10 focus:border-emerald-400 text-white font-mono text-lg font-bold rounded-xl pl-8 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Concepto / Descripción
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Almuerzo ejecutivo, Servidores AWS, etc."
              className="w-full bg-[#0a0f1f] border border-white/10 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Categoría Inteligente & Subcategoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                Categoría Inteligente
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-[#0a0f1f] border border-white/10 focus:border-emerald-400 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name} className="bg-[#0b101d] text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Subcategoría Contextual
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full bg-[#0a0f1f] border border-white/10 focus:border-emerald-400 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
              >
                {activeCategoryObj.subcategories.map((sub, i) => (
                  <option key={i} value={sub} className="bg-[#0b101d] text-white">
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                Método de Pago
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full bg-[#0a0f1f] border border-white/10 focus:border-emerald-400 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
              >
                {PAYMENT_METHODS.map((pm, i) => (
                  <option key={i} value={pm} className="bg-[#0b101d] text-white">
                    {pm}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0a0f1f] border border-white/10 focus:border-emerald-400 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>
          </div>

          {/* Recurring Toggle Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Repeat className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">
                  Movimiento Recurrente
                </span>
                <span className="text-[11px] text-slate-400">
                  Registrar automáticamente cada periodo mensual
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsRecurring(!isRecurring)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isRecurring ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isRecurring ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-glow-teal hover:shadow-[0_0_25px_rgba(20,241,149,0.35)] transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Guardar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
