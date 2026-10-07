import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import type { StatisticTransaction } from '../types';

interface StatisticPanelProps {
  transactions: StatisticTransaction[];
}

export const StatisticPanel: React.FC<StatisticPanelProps> = ({ transactions }) => {
  const [period, setPeriod] = useState('This week');

  return (
    <div className="w-full lg:w-[360px] xl:w-[400px] bg-white rounded-[32px] p-6 shadow-xl shadow-gray-100/80 border border-[#f0f2f5] flex flex-col justify-between shrink-0">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1.5 text-base font-bold text-[#111827]">
            <span>Statistic</span>
            <Info className="w-3.5 h-3.5 text-[#9ca3af]" />
          </div>

          {/* Period Selector Dropdown */}
          <button 
            onClick={() => setPeriod(period === 'This week' ? 'This month' : 'This week')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-xs text-[#6b7280] font-medium cursor-pointer transition-colors border border-gray-100"
          >
            <span>{period}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Donut Chart with Floating Badge */}
        <div className="relative flex flex-col items-center justify-center my-4">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Donut Chart matching Image 1 */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Black / Dark segment (Money transactions - ~35%) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#1f2127"
                strokeWidth="20"
                strokeDasharray="377"
                strokeDashoffset="130"
                strokeLinecap="round"
              />
              {/* Blue segment (Payment at store - ~65%) */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#7096f8"
                strokeWidth="20"
                strokeDasharray="377"
                strokeDashoffset="245"
                strokeLinecap="round"
              />
            </svg>

            {/* Centered Total Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] text-[#9ca3af] font-medium">Total</span>
              <span className="text-base font-extrabold text-[#111827] tracking-tight">
                $14,810.0
              </span>
            </div>

            {/* Floating Pill on Blue Segment matching Image 1 */}
            <div className="absolute top-10 right-0 transform translate-x-3 -translate-y-1 bg-[#1f2127] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
              $9,560.0
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-[#6b7280]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-[#7096f8]" />
              <span>Payment at the store</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-[#1f2127]" />
              <span>Money transaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3.5 mt-5 pt-3 border-t border-gray-100">
        {transactions.map((tx) => {
          const isStore = tx.category === 'Payment at the store';
          return (
            <div key={tx.id} className="flex items-center justify-between group">
              {/* Left: Icon & Title */}
              <div className="flex items-center gap-3">
                {/* Brand circle icon matching Image 1 */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    isStore
                      ? 'bg-[#e2ecfe] text-[#2563eb]'
                      : 'bg-[#1f2127] text-white'
                  }`}
                >
                  {tx.icon === 'spotify' && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.307c-.217.355-.679.467-1.034.25-2.836-1.733-6.406-2.124-10.609-1.164-.405.093-.812-.162-.905-.568-.093-.405.163-.812.568-.905 4.607-1.054 8.549-.611 11.73 1.353.355.217.467.679.25 1.034zm1.468-3.26c-.273.444-.855.586-1.299.313-3.247-1.996-8.197-2.573-12.037-1.408-.499.151-1.032-.132-1.183-.631-.151-.499.132-1.032.631-1.183 4.388-1.332 9.839-.684 13.575 1.61.444.273.586.855.313 1.299zm.126-3.41c-3.893-2.312-10.316-2.525-14.032-1.396-.597.181-1.233-.162-1.414-.759-.181-.597.162-1.233.759-1.414 4.269-1.296 11.359-1.047 15.823 1.602.537.319.715 1.018.396 1.555-.319.537-1.018.715-1.532.412z"/>
                    </svg>
                  )}
                  {tx.icon === 'apple' && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.14-.54 2.77-1.28z"/>
                    </svg>
                  )}
                  {tx.icon === 'bitcoin' && (
                    <span className="font-bold text-sm leading-none font-serif">₿</span>
                  )}
                  {tx.icon === 'binance' && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M16.624 13.92l2.715 2.715-7.34 7.34-7.339-7.34 2.715-2.715 4.624 4.624 4.624-4.624zm0-9.84l2.715 2.715-7.34 7.34-7.339-7.34 2.715-2.715 4.624 4.624 4.624-4.624zm-4.624 5.215l2.715 2.715-2.715 2.715-2.715-2.715 2.715-2.715z"/>
                    </svg>
                  )}
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#111827] leading-tight">
                    {tx.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#9ca3af]">
                    {tx.timeAgo}
                  </p>
                </div>
              </div>

              {/* Right: Amount */}
              <div className="text-right">
                <span className="text-xs sm:text-sm font-bold text-[#111827] font-sans">
                  {tx.amount}$
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
