import React from 'react';
import type { RecentSale } from '../types';

interface RecentSalesTableProps {
  sales: RecentSale[];
}

export const RecentSalesTable: React.FC<RecentSalesTableProps> = ({ sales }) => {
  return (
    <div className="space-y-3 pt-2">
      <h3 className="text-base sm:text-lg font-bold text-[#111827]">Recent Sales</h3>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="text-[11px] sm:text-xs text-[#9ca3af] font-medium border-b border-gray-100">
              <th className="pb-2.5 font-normal">Sender</th>
              <th className="pb-2.5 font-normal">Date</th>
              <th className="pb-2.5 font-normal">Status</th>
              <th className="pb-2.5 font-normal text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/80">
            {sales.map((sale) => {
              return (
                <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Sender */}
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200">
                        <img
                          src={sale.senderAvatar}
                          alt={sale.senderName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#111827]">
                        {sale.senderName}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-xs text-[#6b7280] font-sans">
                    {sale.date}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    {sale.status === 'success' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#dcfce7] text-[#16a34a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                        Success
                      </span>
                    )}
                    {sale.status === 'process' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#f3f4f6] text-[#4b5563]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af]" />
                        Process
                      </span>
                    )}
                    {sale.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#fee2e2] text-[#dc2626]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                        Failed
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="py-3 pl-4 text-right text-xs sm:text-sm font-bold font-sans text-[#111827]">
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
