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
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const savings = Math.max(0, totalIncome - totalExpense);
  const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : '0';

  const metrics = [
    {
      title: t.metricAvailable,
      amount: totalBalance,
      delta: '+8.4%',
      deltaText: t.vsLastMonth,
      deltaType: 'positive',
      icon: Wallet,
      iconBg: 'bg-[#C8D9E6]/40 text-[#2F4156]',
    },
    {
      title: t.metricIncome,
      amount: totalIncome,
      delta: '+14.2%',
      deltaText: t.vsLastMonth,
      deltaType: 'positive',
      icon: TrendingUp,
      iconBg: 'bg-[#dcfce7] text-[#16a34a]',
    },
    {
      title: t.metricExpense,
      amount: totalExpense,
      delta: '-12.8%',
      deltaText: t.optimalControl,
      deltaType: 'good-reduction',
      icon: TrendingDown,
      iconBg: 'bg-[#fee2e2] text-[#dc2626]',
    },
    {
      title: t.metricSavings,
      amount: savings,
      delta: `${savingsRate}%`,
      deltaText: t.savingsRate,
      deltaType: 'positive',
      icon: PiggyBank,
      iconBg: 'bg-[#567C8D]/20 text-[#567C8D]',
      highlightBadge: t.goalBadge,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#C8D9E6]/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold tracking-wide text-[#567C8D]">
                {metric.title}
              </span>
              <div className={`p-2.5 rounded-2xl ${metric.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Amount in deep Navy (#2F4156) */}
            <div className="mb-2.5">
              <span className="text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-[#2F4156] font-sans">
                {formatCurrency(metric.amount, currency)}
              </span>
            </div>

            {/* Bottom stats / delta */}
            <div className="flex items-center justify-between pt-2.5 border-t border-[#F5EFEB] text-xs">
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
                <span className="text-[11px] text-[#567C8D] font-medium truncate">
                  {metric.deltaText}
                </span>
              </div>

              {metric.highlightBadge && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C8D9E6]/30 text-[#2F4156] border border-[#C8D9E6]">
                  <Sparkles className="w-2.5 h-2.5 text-[#567C8D]" />
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
