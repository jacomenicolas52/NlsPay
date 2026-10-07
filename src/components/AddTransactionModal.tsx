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
  'Visa Platinum •••• 1810',
  'Mastercard Black •••• 1423',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-[32px] bg-white border border-gray-100 p-6 sm:p-7 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-blue-50 text-[#1e3fe4]">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Registrar Movimiento
              </h2>
              <p className="text-xs text-gray-500">
                Módulo inteligente de conciliación de gastos e ingresos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Type Selector (Gasto vs Ingreso) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 border border-gray-200 rounded-2xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                type === 'expense'
                  ? 'bg-white text-rose-600 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-rose-500" />
              Gasto
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                type === 'income'
                  ? 'bg-white text-emerald-600 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4 text-emerald-500" />
              Ingreso
            </button>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Valor / Importe ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400 font-sans text-sm font-bold">$</span>
              <input
                type="number"
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#1e3fe4] text-gray-900 font-sans text-lg font-bold rounded-2xl pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Concepto / Descripción
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Almuerzo ejecutivo, Servidores AWS, Rappi"
              className="w-full bg-gray-50 border border-gray-200 focus:border-[#1e3fe4] text-gray-900 text-xs sm:text-sm rounded-2xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Categoría Inteligente & Subcategoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                Categoría Inteligente
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#1e3fe4] text-gray-900 text-xs rounded-2xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Subcategoría
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#1e3fe4] text-gray-900 text-xs rounded-2xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                {activeCategoryObj.subcategories.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                Método de Pago
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#1e3fe4] text-gray-900 text-xs rounded-2xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                {PAYMENT_METHODS.map((pm, i) => (
                  <option key={i} value={pm}>
                    {pm}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#1e3fe4] text-gray-900 text-xs rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Recurring Toggle Switch */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-blue-100 text-blue-600">
                <Repeat className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-900 block">
                  Movimiento Recurrente
                </span>
                <span className="text-[11px] text-gray-500">
                  Registrar automáticamente cada periodo mensual
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsRecurring(!isRecurring)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isRecurring ? 'bg-[#567C8D]' : 'bg-gray-300'
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
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#567C8D] hover:bg-[#2F4156] text-white font-bold text-xs shadow-md transition-all"
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
