import React from 'react';
import { ArrowLeftRight, FileText, Landmark, Car } from 'lucide-react';

interface QuickActionsBarProps {
  onTransferClick: () => void;
  onActionClick: (actionName: string) => void;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
  onTransferClick,
  onActionClick
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-1">
      {/* 1. Transfer (Active Vibrant Blue Pill) */}
      <button
        onClick={onTransferClick}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
        <span>Transfer</span>
      </button>

      {/* 2. Utility (White Pill with Black Circle Icon) */}
      <button
        onClick={() => onActionClick('Utility')}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-white hover:bg-gray-50 border border-[#e5e7eb] text-[#111827] font-semibold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <span>Utility</span>
      </button>

      {/* 3. Taxes (White Pill with Black Circle Icon) */}
      <button
        onClick={() => onActionClick('Taxes')}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-white hover:bg-gray-50 border border-[#e5e7eb] text-[#111827] font-semibold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center">
          <Landmark className="w-3.5 h-3.5" />
        </div>
        <span>Taxes</span>
      </button>

      {/* 4. Transport (White Pill with Black Circle Icon) */}
      <button
        onClick={() => onActionClick('Transport')}
        className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-[20px] bg-white hover:bg-gray-50 border border-[#e5e7eb] text-[#111827] font-semibold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center">
          <Car className="w-3.5 h-3.5" />
        </div>
        <span>Transport</span>
      </button>
    </div>
  );
};
