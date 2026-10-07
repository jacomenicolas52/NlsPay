import React from 'react';
import type { RecentSale } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RecentSalesTableProps {
  sales: RecentSale[];
}

export const RecentSalesTable: React.FC<RecentSalesTableProps> = ({ sales }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3 pt-2">
      <h3 className="text-base sm:text-lg font-bold text-[#2F4156]">{t.recentSalesTitle}</h3>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="text-[11px] sm:text-xs text-[#567C8D] font-bold border-b border-[#C8D9E6]/60">
              <th className="pb-2.5 font-bold">{t.recipientMerchant}</th>
              <th className="pb-2.5 font-bold">{t.date}</th>
              <th className="pb-2.5 font-bold">{t.status}</th>
              <th className="pb-2.5 font-bold text-right">{t.amount}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5EFEB]">
            {sales.map((sale) => {
              return (
                <tr key={sale.id} className="hover:bg-[#F5EFEB]/50 transition-colors">
                  {/* Sender */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#C8D9E6]">
                        <img
                          src={sale.senderAvatar}
                          alt={sale.senderName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#2F4156]">
                        {sale.senderName}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-xs text-[#567C8D] font-medium font-sans">
                    {sale.date === 'Hoy' ? t.today : sale.date}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    {sale.status === 'success' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#16a34a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                        {t.completed}
                      </span>
                    )}
                    {sale.status === 'process' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C8D9E6]/40 text-[#2F4156]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#567C8D]" />
                        {t.pending}
                      </span>
                    )}
                    {sale.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#fee2e2] text-[#dc2626]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                        Error
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="py-3 pl-4 text-right text-xs sm:text-sm font-bold font-sans text-[#2F4156]">
                    -${Math.abs(sale.amount).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
