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
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-gray-200/80 shadow-md space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1e3fe4] flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                IA de Salud Financiera
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1e3fe4] border border-blue-200">
                <Sparkles className="w-2.5 h-2.5" />
                NEURAL ENGINE V2
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Modelado predictivo de hábitos de consumo y capitalización
            </p>
          </div>
        </div>

        {/* Health Score Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-gray-400 block leading-tight">Health Score</span>
            <span className="text-xs sm:text-sm font-extrabold text-[#16a34a] font-sans">885 / 1000 (Excelente)</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
        </div>
      </div>

      {/* Main Insight Box */}
      <div className="rounded-2xl bg-gray-50/80 border border-gray-200/80 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-gray-800 border border-gray-200 shadow-2xl">
              {currentInsight.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              <AlertCircle className="w-3.5 h-3.5" />
              {currentInsight.metric}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Potencial de ahorro:</span>
            <span className="font-bold text-[#16a34a]">
              {formatCurrency(currentInsight.savingsPotential, currency)}/mes
            </span>
          </div>
        </div>

        <h4 className="text-sm font-bold text-gray-900 mb-1">
          {currentInsight.title}
        </h4>
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          {currentInsight.description}
        </p>

        {/* Recommendation Quote Card */}
        <div className="p-3.5 rounded-xl bg-blue-50/80 border-l-4 border-[#1e3fe4] border-y border-r border-blue-100 mb-3.5">
          <p className="text-xs text-blue-900 font-medium flex items-start gap-2">
            <span className="font-bold shrink-0 text-[#1e3fe4]">💡 Recomendación:</span>
            <span>{currentInsight.recommendation}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Selector dots */}
          <div className="flex items-center gap-1.5">
            {insights.map((ins, idx) => (
              <button
                key={ins.id}
                onClick={() => setActiveInsightIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeInsightIndex
                    ? 'w-6 bg-[#1e3fe4]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ver sugerencia ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleApplyAdvice(currentInsight.id)}
            disabled={appliedInsights[currentInsight.id]}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              appliedInsights[currentInsight.id]
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-[#1b1c21] hover:bg-black text-white hover:shadow'
            }`}
          >
            {appliedInsights[currentInsight.id] ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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
  );
};
