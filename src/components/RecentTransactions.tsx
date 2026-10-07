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
    <div className="glass-panel rounded-2xl p-5 border border-white/[0.08]">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Últimos Movimientos
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
              {filteredTransactions.length} registros
            </span>
          </div>
          <p className="text-xs text-slate-400">Historial en tiempo real con categorización contextual</p>
        </div>

        {/* Filter Badges & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Filter Tabs */}
          <div className="flex items-center bg-[#080d1b] border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterType === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterType === 'expense'
                  ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Gastos
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterType === 'income'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setFilterType('recurring')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterType === 'recurring'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Recurrentes
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar..."
              className="bg-[#080d1b] border border-white/10 text-xs text-slate-200 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-400 w-32 sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No se encontraron movimientos con los filtros seleccionados.
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <div
                key={tx.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/15 transition-all gap-3 group"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isIncome
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-white/[0.03] border-white/10 text-slate-300'
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-rose-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {tx.description}
                      </span>
                      {tx.isRecurring && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20" title="Gasto recurrente automatizado">
                          <RefreshCw className="w-2.5 h-2.5" /> Recurrente
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300">
                        <Tag className="w-3 h-3 text-emerald-400" />
                        {tx.category} › <span className="text-slate-400">{tx.subcategory}</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
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
                      className={`text-sm lg:text-base font-extrabold font-mono block ${
                        isIncome ? 'text-emerald-400' : 'text-slate-200'
                      }`}
                    >
                      {isIncome ? '+' : '-'} {formatCurrency(tx.amount, currency)}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatDate(tx.date)}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
        <div className="pt-4 mt-3 border-t border-white/[0.06] text-center">
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors"
          >
            Ver todos los movimientos en el Libro Mayor <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
