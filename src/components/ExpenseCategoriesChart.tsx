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
        <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-xl">
          <p className="text-xs font-bold text-gray-800 mb-0.5">{data.name}</p>
          <p className="text-sm font-bold text-gray-900 font-sans">
            {formatCurrency(data.value, currency)}
          </p>
          <span className="text-[11px] text-blue-600 font-medium">
            {data.percentage}% del total mensual
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-gray-200/80 shadow-md flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-blue-50 text-[#1e3fe4]">
              <PieIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                Distribución por Categorías
              </h3>
              <p className="text-xs text-gray-500">Desglose de gastos de Octubre</p>
            </div>
          </div>
          <span className="text-xs font-bold text-gray-700 px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
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
            <span className="text-[10px] uppercase font-mono text-gray-400 font-medium">
              Categoría Top
            </span>
            <span className="text-xs font-bold text-gray-900">Alimentación</span>
            <span className="text-[11px] font-bold text-emerald-600">36.2%</span>
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
                <span className="text-gray-700 font-medium group-hover:text-black transition-colors">
                  {cat.name}
                </span>
              </div>
              <div className="flex items-center gap-2 font-sans">
                <span className="text-gray-400 text-[11px]">{cat.percentage}%</span>
                <span className="text-gray-800 font-bold">
                  {formatCurrency(cat.value, currency)}
                </span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
