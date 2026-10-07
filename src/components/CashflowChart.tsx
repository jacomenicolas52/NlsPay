import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import type { MonthlyCashflow } from '../types';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface CashflowChartProps {
  data: MonthlyCashflow[];
  currency: 'COP' | 'USD';
}

export const CashflowChart: React.FC<CashflowChartProps> = ({ data, currency }) => {
  const [viewType, setViewType] = useState<'both' | 'savings'>('both');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-xl">
          <p className="text-xs font-bold text-gray-800 mb-1.5 font-sans">
            Periodo: {label} 2026
          </p>
          <div className="space-y-1 text-xs">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name}:
                </span>
                <span className="font-bold text-gray-900 font-sans">
                  {formatCurrency(entry.value, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-gray-200/80 shadow-md flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
              Evolución Financiera & Flujo de Caja
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
              Semestre 2
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Ingresos brutos vs gastos devengados y ratio de capitalización
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-full text-xs">
          <button
            onClick={() => setViewType('both')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              viewType === 'both'
                ? 'bg-white text-gray-900 font-bold shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Comparativa
          </button>
          <button
            onClick={() => setViewType('savings')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              viewType === 'savings'
                ? 'bg-[#1e3fe4] text-white font-bold shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Curva de Ahorro
          </button>
        </div>
      </div>

      {/* Stats micro-bar */}
      <div className="grid grid-cols-3 gap-2 py-2.5 px-4 mb-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs">
        <div>
          <span className="text-[11px] text-gray-500 block">Flujo de Octubre</span>
          <span className="text-xs sm:text-sm font-bold text-gray-900 font-sans">
            {formatCurrency(9180000 - 3450000, currency)}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-gray-500 block">Media Ingresos</span>
          <span className="text-xs sm:text-sm font-bold text-blue-600 font-sans">
            {formatCurrency(8213333, currency)}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-gray-500 block">Crecimiento Neto</span>
          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#16a34a]">
            <TrendingUp className="w-3.5 h-3.5" /> +28.5%
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientIncomeClean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3fe4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#1e3fe4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientExpenseClean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1f2127" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1f2127" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientSavingsClean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />

            {viewType === 'both' ? (
              <>
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  name="Ingresos"
                  stroke="#1e3fe4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#gradientIncomeClean)"
                />
                <Area
                  type="monotone"
                  dataKey="gastos"
                  name="Gastos"
                  stroke="#1f2127"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#gradientExpenseClean)"
                />
              </>
            ) : (
              <Area
                type="monotone"
                dataKey="ahorro"
                name="Ahorro Realizado"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#gradientSavingsClean)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1e3fe4]" />
            <span className="text-gray-700 font-medium">Ingresos Totales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1f2127]" />
            <span className="text-gray-700 font-medium">Gastos Consolidados</span>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-blue-600 font-medium">
          Ahorro proyectado Q4 <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
