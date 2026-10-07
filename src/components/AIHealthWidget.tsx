import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  AlertCircle, 
  CheckCircle2, 
  Sliders 
} from 'lucide-react';
import type { AIInsight } from '../types';
import { formatCurrency } from '../utils/formatters';

interface AIHealthWidgetProps {
  insights: AIInsight[];
  currency: 'COP' | 'USD';
  onActionSuccess?: (msg: string) => void;
}

export const AIHealthWidget: React.FC<AIHealthWidgetProps> = ({
  insights,
  currency,
  onActionSuccess
}) => {
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [appliedInsights, setAppliedInsights] = useState<Record<string, boolean>>({});

  const currentInsight = insights[activeInsightIndex] || insights[0];

  const handleApplyAdvice = (id: string) => {
    setAppliedInsights((prev) => ({ ...prev, [id]: true }));
    if (onActionSuccess) {
      onActionSuccess(`Regla de optimización inteligente activada para ${currentInsight.badge}`);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel p-5 lg:p-6 border border-emerald-500/30 shadow-[0_0_35px_-5px_rgba(20,241,149,0.15)]">
      {/* Background radial gradients for AI glow */}
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 p-[1px] shadow-glow-teal">
            <div className="w-full h-full bg-[#080d19] rounded-[11px] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-emerald-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                IA de Salud Financiera
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                NEURAL ENGINE V2
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Modelado predictivo de hábitos de consumo y capitalización
            </p>
          </div>
        </div>

        {/* Financial Health Score Pill */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#080d1b] border border-white/10">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Health Score</span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono">885 / 1000</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
        </div>
      </div>

      {/* Main Insight Box */}
      <div className="rounded-xl bg-[#090e1b]/80 border border-white/[0.08] p-4 lg:p-5 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/[0.06] text-slate-200 border border-white/10 font-mono">
              {currentInsight.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              <AlertCircle className="w-3.5 h-3.5" />
              {currentInsight.metric}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>Potencial de ahorro:</span>
            <span className="font-mono font-bold text-emerald-400">
              {formatCurrency(currentInsight.savingsPotential, currency)}/mes
            </span>
          </div>
        </div>

        <h4 className="text-sm lg:text-base font-bold text-white mb-1.5 flex items-center gap-2">
          {currentInsight.title}
        </h4>
        <p className="text-xs lg:text-sm text-slate-300 mb-3 leading-relaxed">
          {currentInsight.description}
        </p>

        {/* Recommendation Quote Card */}
        <div className="p-3.5 rounded-lg bg-emerald-950/20 border-l-2 border-emerald-400 border-y border-r border-emerald-500/15 mb-4">
          <p className="text-xs font-medium text-emerald-200 flex items-start gap-2">
            <span className="text-emerald-400 font-bold shrink-0">💡 Recomendación de la IA:</span>
            <span>{currentInsight.recommendation}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Selector pills */}
          <div className="flex items-center gap-1.5">
            {insights.map((ins, idx) => (
              <button
                key={ins.id}
                onClick={() => setActiveInsightIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeInsightIndex
                    ? 'w-6 bg-emerald-400 shadow-[0_0_8px_#10B981]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ver sugerencia ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleApplyAdvice(currentInsight.id)}
              disabled={appliedInsights[currentInsight.id]}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appliedInsights[currentInsight.id]
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-glow-teal hover:shadow-[0_0_20px_rgba(20,241,149,0.3)]'
              }`}
            >
              {appliedInsights[currentInsight.id] ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Regla de Ahorro Activada
                </>
              ) : (
                <>
                  <Sliders className="w-3.5 h-3.5" />
                  Activar Límite Preventivo (-$180k)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
