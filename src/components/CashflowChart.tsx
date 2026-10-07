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

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b101d]/95 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-xl">
          <p className="text-xs font-semibold text-slate-300 mb-2 font-mono">
            Periodo: {label} 2026
          </p>
          <div className="space-y-1.5 text-xs">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name}:
                </span>
                <span className="font-mono font-bold text-slate-100">
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
    <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              Evolución Financiera & Flujo de Caja
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Semestre 2
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingresos brutos vs gastos devengados y ratio de capitalización
          </p>
        </div>

        {/* View toggle & legend */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#090e1c] border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewType('both')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                viewType === 'both'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Comparativa
            </button>
            <button
              onClick={() => setViewType('savings')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                viewType === 'savings'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Curva de Ahorro
            </button>
          </div>
        </div>
      </div>

      {/* Stats micro-bar */}
      <div className="grid grid-cols-3 gap-2 py-3 px-4 mb-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
        <div>
          <span className="text-[11px] text-slate-400 block">Flujo de Octubre</span>
          <span className="text-sm font-bold text-white font-mono">
            {formatCurrency(9180000 - 3450000, currency)}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Media Mensual Ingresos</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">
            {formatCurrency(8213333, currency)}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Crecimiento Neto</span>
          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-cyan-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" /> +28.5%
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14F195" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#14F195" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }}
            />
            <YAxis
              stroke="#64748b"
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
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#gradientIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="gastos"
                  name="Gastos"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#gradientExpense)"
                />
              </>
            ) : (
              <Area
                type="monotone"
                dataKey="ahorro"
                name="Ahorro Realizado"
                stroke="#14F195"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#gradientSavings)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/[0.06] text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
            <span className="text-slate-300 font-medium">Ingresos Totales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06B6D4]" />
            <span className="text-slate-300 font-medium">Gastos Consolidados</span>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono font-medium">
          Ahorro proyectado Q4 <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
