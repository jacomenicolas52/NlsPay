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
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [appliedInsights, setAppliedInsights] = useState<Record<string, boolean>>({});

  const currentInsight = insights[activeInsightIndex] || insights[0];

  const handleApplyAdvice = (id: string) => {
    setAppliedInsights((prev) => ({ ...prev, [id]: true }));
    if (onActionSuccess) {
      onActionSuccess(`${t.ruleActivated}: ${currentInsight.badge}`);
    }
  };

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#C8D9E6]/70 shadow-md space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C8D9E6]/40 text-[#567C8D] flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#2F4156] tracking-tight">
                {t.aiHealthTitle}
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C8D9E6]/30 text-[#2F4156] border border-[#C8D9E6]">
                <Sparkles className="w-2.5 h-2.5 text-[#567C8D]" />
                {t.aiEngineBadge}
              </span>
            </div>
            <p className="text-xs text-[#567C8D]">
              {t.aiSubtitle}
            </p>
          </div>
        </div>

        {/* Health Score Pill */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F5EFEB] border border-[#C8D9E6]">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-[#567C8D] block leading-tight font-bold">{t.healthScore}</span>
            <span className="text-xs sm:text-sm font-extrabold text-[#16a34a] font-sans">885 / 1000 ({t.scoreExcellent})</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
        </div>
      </div>

      {/* Main Insight Box */}
      <div className="rounded-2xl bg-[#F5EFEB]/50 border border-[#C8D9E6]/60 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#2F4156] border border-[#C8D9E6] shadow-sm">
              {currentInsight.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              <AlertCircle className="w-3.5 h-3.5" />
              {currentInsight.metric}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#567C8D] font-medium">
            <span>{t.savingsPotential}</span>
            <span className="font-bold text-[#16a34a]">
              {formatCurrency(currentInsight.savingsPotential, currency)}{t.perMonth}
            </span>
          </div>
        </div>

        <h4 className="text-sm font-bold text-[#2F4156] mb-1">
          {currentInsight.title}
        </h4>
        <p className="text-xs text-[#2F4156]/80 mb-3 leading-relaxed">
          {currentInsight.description}
        </p>

        {/* Recommendation Quote Card */}
        <div className="p-3.5 rounded-xl bg-[#C8D9E6]/25 border-l-4 border-[#567C8D] border-y border-r border-[#C8D9E6]/40 mb-3.5">
          <p className="text-xs text-[#2F4156] font-medium flex items-start gap-2">
            <span className="font-bold shrink-0 text-[#567C8D]">💡 {t.recommendationTitle}:</span>
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
                    ? 'w-6 bg-[#567C8D]'
                    : 'w-2 bg-[#C8D9E6] hover:bg-[#567C8D]'
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
                : 'bg-[#567C8D] hover:bg-[#2F4156] text-white hover:shadow-md'
            }`}
          >
            {appliedInsights[currentInsight.id] ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {t.ruleActivated}
              </>
            ) : (
              <>
                <Sliders className="w-3.5 h-3.5" />
                {t.activateSavingsRule}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
