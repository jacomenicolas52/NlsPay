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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-in fade-in duration-200">
      {/* 1. Metas de Capitalización */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-gray-200/80 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-blue-50 text-[#1e3fe4]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                  Metas de Capitalización
                </h3>
                <p className="text-xs text-gray-500">Progreso en objetivos de alto impacto</p>
              </div>
            </div>

            <button 
              onClick={onAddGoal}
              className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-black border border-gray-200 transition-colors"
              title="Añadir nueva meta"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3.5">
            {goals.map((goal) => {
              const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
              return (
                <div
                  key={goal.id}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/60 transition-all hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">
                      {goal.title}
                    </span>
                    <span className="font-mono font-bold text-[#1e3fe4] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {percentage}% completado
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                    <span className="font-mono">
                      {formatCurrency(goal.currentAmount, currency)} de{' '}
                      <span className="text-gray-800 font-semibold">{formatCurrency(goal.targetAmount, currency)}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-gray-400">
                      <Calendar className="w-3 h-3 text-blue-500" />
                      {goal.deadline}
                    </span>
                  </div>

                  {/* Clean Progress Bar matching Image 1 palette */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1e3fe4] to-[#60a5fa] transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3.5 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Total en reserva asignada:</span>
          <span className="font-bold text-[#16a34a] font-sans">
            {formatCurrency(37350000, currency)}
          </span>
        </div>
      </div>

      {/* 2. Control de Presupuestos & Alertas Visuales */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-gray-200/80 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-amber-50 text-amber-600">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                  Presupuestos & Límites
                </h3>
                <p className="text-xs text-gray-500">Alertas visuales automáticas en tiempo real</p>
              </div>
            </div>

            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> 2 al límite
            </span>
          </div>

          <div className="space-y-3.5">
            {budgets.map((budget) => {
              const ratio = budget.spent / budget.limit;
              const percentage = Math.round(ratio * 100);
              const isNearLimit = ratio >= budget.warningThreshold;
              const isOverLimit = ratio >= 1;

              return (
                <div
                  key={budget.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isOverLimit
                      ? 'bg-rose-50/50 border-rose-200'
                      : isNearLimit
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-gray-50/80 border-gray-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">
                      {budget.category}
                    </span>

                    {isNearLimit ? (
                      <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        {percentage}% consumido
                      </span>
                    ) : (
                      <span className="font-bold text-[11px] text-[#16a34a] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {percentage}% (Saludable)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                    <span>
                      Gastado:{' '}
                      <span className={isNearLimit ? 'text-amber-700 font-bold' : 'text-gray-900 font-semibold'}>
                        {formatCurrency(budget.spent, currency)}
                      </span>
                    </span>
                    <span>
                      Límite: {formatCurrency(budget.limit, currency)}
                    </span>
                  </div>

                  {/* Progress Bar with Color Semaphore */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isOverLimit
                          ? 'bg-rose-500'
                          : isNearLimit
                          ? 'bg-amber-500'
                          : 'bg-[#1e3fe4]'
                      }`}
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3.5 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Margen mensual remanente:</span>
          <span className="font-bold text-[#1e3fe4] font-sans">
            {formatCurrency(490000, currency)}
          </span>
        </div>
      </div>
    </div>
  );
};
