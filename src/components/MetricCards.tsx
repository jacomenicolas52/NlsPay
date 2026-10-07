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
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Ingresos de Octubre',
      amount: totalIncome,
      delta: '+14.2%',
      deltaText: 'vs mes anterior',
      deltaType: 'positive',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Gastos de Octubre',
      amount: totalExpense,
      delta: '-12.8%',
      deltaText: 'control óptimo',
      deltaType: 'good-reduction',
      icon: TrendingDown,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Ahorro & Capitalización',
      amount: savings,
      delta: `${savingsRate}%`,
      deltaText: 'tasa de ahorro neta',
      deltaType: 'positive',
      icon: PiggyBank,
      iconBg: 'bg-indigo-50 text-indigo-600',
      highlightBadge: 'Meta +15%',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-[22px] p-4 sm:p-5 border border-gray-200/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold tracking-wide text-gray-500">
                {metric.title}
              </span>
              <div className={`p-2 rounded-xl ${metric.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Amount */}
            <div className="mb-2.5">
              <span className="text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-gray-900 font-sans">
                {formatCurrency(metric.amount, currency)}
              </span>
            </div>

            {/* Bottom stats / delta */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-sans font-bold text-[11px] ${
                    metric.deltaType === 'positive' || metric.deltaType === 'good-reduction'
                      ? 'bg-[#dcfce7] text-[#16a34a]'
                      : 'bg-[#fee2e2] text-[#dc2626]'
                  }`}
                >
                  {metric.deltaType === 'good-reduction' ? (
                    <ArrowDownRight className="w-3 h-3" />
                  ) : (
                    <ArrowUpRight className="w-3 h-3" />
                  )}
                  {metric.delta}
                </span>
                <span className="text-[11px] text-gray-400 truncate">
                  {metric.deltaText}
                </span>
              </div>

              {metric.highlightBadge && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
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
