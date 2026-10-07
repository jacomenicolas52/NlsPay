import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PiggyBank, 
  TrendingUp, 
  TrendingDown, 
  Sparkles 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface MetricCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  currency: 'COP' | 'USD';
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalBalance,
  totalIncome,
  totalExpense,
  currency,
}) => {
  const savings = Math.max(0, totalIncome - totalExpense);
  const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : '0';

  const metrics = [
    {
      title: 'Dinero Disponible',
      amount: totalBalance,
      delta: '+8.4%',
      deltaText: 'vs mes anterior',
      deltaType: 'positive',
      icon: Wallet,
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15',
      glow: 'shadow-[0_0_25px_-5px_rgba(16,185,129,0.2)]',
    },
    {
      title: 'Ingresos de Octubre',
      amount: totalIncome,
      delta: '+14.2%',
      deltaText: 'vs mes anterior',
      deltaType: 'positive',
      icon: TrendingUp,
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15',
      glow: 'shadow-[0_0_25px_-5px_rgba(6,182,212,0.2)]',
    },
    {
      title: 'Gastos de Octubre',
      amount: totalExpense,
      delta: '-12.8%',
      deltaText: 'control de gastos óptimo',
      deltaType: 'good-reduction', // Reduction in expenses is positive
      icon: TrendingDown,
      gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-rose-500/20',
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/15',
      glow: 'shadow-[0_0_25px_-5px_rgba(244,63,94,0.15)]',
    },
    {
      title: 'Ahorro & Capitalización',
      amount: savings,
      delta: `${savingsRate}%`,
      deltaText: 'tasa de ahorro neta',
      deltaType: 'positive',
      icon: PiggyBank,
      gradient: 'from-teal-400/25 via-emerald-500/15 to-transparent',
      borderColor: 'border-teal-400/30',
      iconColor: 'text-teal-300',
      iconBg: 'bg-teal-400/15',
      glow: 'shadow-[0_0_25px_-5px_rgba(20,241,149,0.25)]',
      highlightBadge: 'Meta +15%',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl glass-card p-5 border ${metric.borderColor} ${metric.glow} transition-all duration-300 hover:scale-[1.01]`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wide text-slate-400">
                {metric.title}
              </span>
              <div className={`p-2.5 rounded-xl ${metric.iconBg} border border-white/10`}>
                <Icon className={`w-4 h-4 ${metric.iconColor}`} />
              </div>
            </div>

            {/* Amount */}
            <div className="mb-3">
              <span className="text-2xl lg:text-[26px] font-extrabold tracking-tight text-white font-sans">
                {formatCurrency(metric.amount, currency)}
              </span>
            </div>

            {/* Bottom stats / delta */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-mono font-bold text-[11px] ${
                    metric.deltaType === 'positive' || metric.deltaType === 'good-reduction'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                  }`}
                >
                  {metric.deltaType === 'good-reduction' ? (
                    <ArrowDownRight className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  )}
                  {metric.delta}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {metric.deltaText}
                </span>
              </div>

              {metric.highlightBadge && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  {metric.highlightBadge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
