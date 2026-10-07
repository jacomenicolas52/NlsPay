import React, { useState } from 'react';
import type { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  CreditCard, 
  RefreshCw, 
  Tag
} from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
  currency: 'COP' | 'USD';
  onViewAll?: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  currency,
  onViewAll,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = 
      filterType === 'all' 
        ? true 
        : filterType === 'recurring' 
          ? tx.isRecurring 
          : tx.type === filterType;
          
    const matchesSearch = 
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-gray-200/80 shadow-md">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">
              Libro Mayor de Movimientos
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
              {filteredTransactions.length} registros
            </span>
          </div>
          <p className="text-xs text-gray-500">Historial en tiempo real con categorización inteligente</p>
        </div>

        {/* Filter Badges & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Filter Tabs */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                filterType === 'all'
                  ? 'bg-white text-gray-900 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                filterType === 'expense'
                  ? 'bg-white text-rose-600 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Gastos
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                filterType === 'income'
                  ? 'bg-white text-emerald-600 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setFilterType('recurring')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                filterType === 'recurring'
                  ? 'bg-white text-blue-600 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Recurrentes
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar..."
              className="bg-gray-100 border border-transparent focus:border-gray-300 text-xs text-gray-900 rounded-full pl-8 pr-3 py-1.5 focus:outline-none w-32 sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs">
            No se encontraron movimientos con los filtros seleccionados.
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <div
                key={tx.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-gray-50/70 hover:bg-gray-50 border border-gray-200/60 hover:border-gray-300 transition-all gap-3"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isIncome
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                        : 'bg-rose-50 border-rose-100 text-rose-500'
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">
                        {tx.description}
                      </span>
                      {tx.isRecurring && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200" title="Gasto recurrente automatizado">
                          <RefreshCw className="w-2.5 h-2.5" /> Recurrente
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600">
                        <Tag className="w-3 h-3 text-blue-600" />
                        {tx.category} › <span className="text-gray-400">{tx.subcategory}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                        <CreditCard className="w-3 h-3" />
                        {tx.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Date, Amount & Status */}
                <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
                  <div>
                    <span
                      className={`text-xs sm:text-sm font-bold font-sans block ${
                        isIncome ? 'text-[#16a34a]' : 'text-gray-900'
                      }`}
                    >
                      {isIncome ? '+' : '-'} {formatCurrency(tx.amount, currency)}
                    </span>
                    <span className="text-[11px] text-gray-400 font-sans">
                      {formatDate(tx.date)}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">
                      {tx.status === 'completed' ? 'Ejecutado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {onViewAll && (
        <div className="pt-3.5 mt-3 border-t border-gray-100 text-center">
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-[#1e3fe4] hover:underline inline-flex items-center gap-1"
          >
            Ver todos los movimientos en el Libro Mayor <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
