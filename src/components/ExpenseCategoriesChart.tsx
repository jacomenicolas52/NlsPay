import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { CATEGORY_EXPENSE_DISTRIBUTION } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { PieChart as PieIcon } from 'lucide-react';

interface ExpenseCategoriesChartProps {
  currency: 'COP' | 'USD';
}

export const ExpenseCategoriesChart: React.FC<ExpenseCategoriesChartProps> = ({ currency }) => {
  const totalExpenseMonth = CATEGORY_EXPENSE_DISTRIBUTION.reduce((acc, curr) => acc + curr.value, 0);

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0b101d]/95 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-xl">
          <p className="text-xs font-semibold text-slate-300 mb-1">{data.name}</p>
          <p className="text-sm font-bold text-white font-mono">
            {formatCurrency(data.value, currency)}
          </p>
          <span className="text-[11px] text-emerald-400 font-mono font-medium">
            {data.percentage}% del total mensual
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <PieIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Distribución por Categorías
              </h3>
              <p className="text-xs text-slate-400">Desglose de gastos de Octubre</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10">
            {formatCurrency(totalExpenseMonth, currency)}
          </span>
        </div>

        {/* Donut Chart with Centered Metric */}
        <div className="relative h-[200px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={CATEGORY_EXPENSE_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {CATEGORY_EXPENSE_DISTRIBUTION.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="cursor-pointer transition-all hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-medium">
              Categoría Top
            </span>
            <span className="text-xs font-bold text-white">Alimentación</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400">36.2%</span>
          </div>
        </div>
      </div>

      {/* Categories Breakdown List */}
      <div className="mt-4 space-y-2.5">
        {CATEGORY_EXPENSE_DISTRIBUTION.map((cat, idx) => (
          <div key={idx} className="group">
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-400 text-[11px]">{cat.percentage}%</span>
                <span className="text-slate-200 font-semibold">
                  {formatCurrency(cat.value, currency)}
                </span>
              </div>
            </div>
            {/* Mini Progress Bar */}
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${cat.percentage}%`,
                  backgroundColor: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
