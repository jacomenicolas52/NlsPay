import React from 'react';
import { ArrowLeftRight, FileText, Landmark, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuickActionsBarProps {
  onTransferClick: () => void;
  onActionClick: (actionName: string) => void;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
  onTransferClick,
  onActionClick
}) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-1">
      {/* 1. Transfer in Corporate Teal (#567C8D) */}
      <button
        onClick={onTransferClick}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-[#567C8D] hover:bg-[#2F4156] text-white font-bold text-xs sm:text-sm shadow-md transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
        <span>{t.actionTransfer}</span>
      </button>

      {/* 2. Utility (White Pill with Corporate Navy Accent) */}
      <button
        onClick={() => onActionClick('Utility')}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-white hover:bg-[#F5EFEB] border border-[#C8D9E6] text-[#2F4156] font-bold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-[#2F4156] text-white flex items-center justify-center group-hover:bg-[#567C8D] transition-colors">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <span>{t.actionUtility}</span>
      </button>

      {/* 3. Taxes (White Pill with Corporate Navy Accent) */}
      <button
        onClick={() => onActionClick('Taxes')}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-white hover:bg-[#F5EFEB] border border-[#C8D9E6] text-[#2F4156] font-bold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-[#2F4156] text-white flex items-center justify-center group-hover:bg-[#567C8D] transition-colors">
          <Landmark className="w-3.5 h-3.5" />
        </div>
        <span>{t.actionTaxes}</span>
      </button>

      {/* 4. Transport (White Pill with Corporate Navy Accent) */}
      <button
        onClick={() => onActionClick('Transport')}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-white hover:bg-[#F5EFEB] border border-[#C8D9E6] text-[#2F4156] font-bold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-[#2F4156] text-white flex items-center justify-center group-hover:bg-[#567C8D] transition-colors">
          <Car className="w-3.5 h-3.5" />
        </div>
        <span>{t.actionTransport}</span>
      </button>
    </div>
  );
};
