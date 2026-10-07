import React from 'react';
import type { Budget, FinancialGoal } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
  Target, 
  AlertTriangle, 
  Calendar, 
  Plus, 
  Flame 
} from 'lucide-react';

interface BudgetsAndGoalsProps {
  budgets: Budget[];
  goals: FinancialGoal[];
  currency: 'COP' | 'USD';
  onAddGoal?: () => void;
}

export const BudgetsAndGoals: React.FC<BudgetsAndGoalsProps> = ({
  budgets,
  goals,
  currency,
  onAddGoal
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* 1. Metas de Ahorro e Inversión */}
      <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <Target className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Metas de Capitalización
                </h3>
                <p className="text-xs text-slate-400">Progreso en objetivos de alto impacto</p>
              </div>
            </div>

            <button 
              onClick={onAddGoal}
              className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 transition-colors"
              title="Añadir nueva meta"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => {
              const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
              return (
                <div
                  key={goal.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">
                        {goal.title}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      {percentage}% completado
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="font-mono">
                      {formatCurrency(goal.currentAmount, currency)} de{' '}
                      <span className="text-slate-300">{formatCurrency(goal.targetAmount, currency)}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {goal.deadline}
                    </span>
                  </div>

                  {/* Gradient Progress Bar */}
                  <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700 shadow-[0_0_12px_rgba(20,241,149,0.5)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span>Total en reserva asignada:</span>
          <span className="font-mono font-bold text-emerald-400">
            {formatCurrency(37350000, currency)}
          </span>
        </div>
      </div>

      {/* 2. Control de Presupuestos Mensuales & Alertas */}
      <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <Flame className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Presupuestos & Límites
                </h3>
                <p className="text-xs text-slate-400">Monitor activo con avisos en tiempo real</p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> 2 al límite
            </span>
          </div>

          <div className="space-y-4">
            {budgets.map((budget) => {
              const ratio = budget.spent / budget.limit;
              const percentage = Math.round(ratio * 100);
              const isNearLimit = ratio >= budget.warningThreshold;
              const isOverLimit = ratio >= 1;

              return (
                <div
                  key={budget.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isOverLimit
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : isNearLimit
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-white/[0.02] border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">
                        {budget.category}
                      </span>
                    </div>

                    {isNearLimit ? (
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        {percentage}% consumido
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {percentage}% (Saludable)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="font-mono">
                      Gastado:{' '}
                      <span className={isNearLimit ? 'text-amber-300 font-bold' : 'text-white'}>
                        {formatCurrency(budget.spent, currency)}
                      </span>
                    </span>
                    <span className="font-mono text-slate-400">
                      Límite: {formatCurrency(budget.limit, currency)}
                    </span>
                  </div>

                  {/* Progress Bar with Alert coloring */}
                  <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden p-[1px]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isOverLimit
                          ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                          : isNearLimit
                          ? 'bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_10px_#f59e0b]'
                          : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      }`}
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span>Margen mensual remanente:</span>
          <span className="font-mono font-bold text-cyan-400">
            {formatCurrency(490000, currency)}
          </span>
        </div>
      </div>
    </div>
  );
};
