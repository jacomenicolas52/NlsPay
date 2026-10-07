import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  ArrowRight, 
  Clock, 
  UserCheck
} from 'lucide-react';
import { SHARED_EXPENSES_MOCK } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

interface SharedExpensesModalProps {
  currency: 'COP' | 'USD';
}

export const SharedExpensesView: React.FC<SharedExpensesModalProps> = ({ currency }) => {
  const [splits, setSplits] = useState(SHARED_EXPENSES_MOCK);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newMembers, setNewMembers] = useState('3');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSplit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(newAmount);
    const members = parseInt(newMembers) || 2;
    if (!newTitle || isNaN(total) || total <= 0) return;

    const newEntry = {
      id: `se-${Date.now()}`,
      title: newTitle,
      total,
      members,
      yourShare: Math.round(total / members),
      status: `Pendiente (${members - 1} por pagar)`,
      date: 'Hoy'
    };

    setSplits([newEntry, ...splits]);
    setNewTitle('');
    setNewAmount('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1e3fe4]" />
            Cuentas Compartidas & Grupos
          </h2>
          <p className="text-xs text-gray-500">
            División algorítmica de cuentas en salidas, viajes y proyectos
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3fe4] text-white text-xs font-semibold shadow hover:bg-blue-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Dividir Nueva Cuenta</span>
        </button>
      </div>

      {/* Creation form */}
      {isCreating && (
        <form onSubmit={handleCreateSplit} className="bg-white p-5 rounded-[28px] border border-gray-200 shadow-md space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Nueva división grupal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Concepto</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ej. Asado fin de semana"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Monto Total ({currency})</label>
              <input
                type="number"
                required
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-sans"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Nº de Integrantes</label>
              <input
                type="number"
                min="2"
                max="20"
                value={newMembers}
                onChange={(e) => setNewMembers(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-sans"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3.5 py-1.5 text-xs text-gray-500 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-[#1e3fe4] text-white font-bold text-xs shadow"
            >
              Crear División
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {splits.map((s) => (
          <div key={s.id} className="bg-white rounded-[24px] p-5 border border-gray-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">{s.title}</span>
              <span className="text-[11px] text-gray-400 font-sans">{s.date}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Total de la cuenta:</span>
              <span className="font-bold text-gray-900 font-sans">{formatCurrency(s.total, currency)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#1e3fe4]" />
                <span className="text-gray-700">Tu parte ({s.members} personas):</span>
              </div>
              <span className="font-bold text-[#1e3fe4] font-sans">
                {formatCurrency(s.yourShare, currency)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
              <span className="text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {s.status}
              </span>
              <button 
                onClick={() => alert(`Enlace de cobro para ${s.title} copiado al portapapeles.`)}
                className="text-[#1e3fe4] hover:underline font-semibold flex items-center gap-1"
              >
                Cobrar link <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
