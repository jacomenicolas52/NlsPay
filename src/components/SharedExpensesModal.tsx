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
      status: `Pendiente de cobro (${members - 1} pendientes)`,
      date: 'Hoy'
    };

    setSplits([newEntry, ...splits]);
    setNewTitle('');
    setNewAmount('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Cuentas Compartidas & Grupos
          </h2>
          <p className="text-xs text-slate-400">
            División algorítmica de cuentas en salidas, viajes y proyectos en equipo
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 text-xs font-semibold transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Dividir Nueva Cuenta</span>
        </button>
      </div>

      {/* Creation form */}
      {isCreating && (
        <form onSubmit={handleCreateSplit} className="glass-panel p-5 rounded-2xl border border-cyan-500/30 space-y-3">
          <h3 className="text-sm font-bold text-white">Nueva división grupal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Concepto</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ej. Asado fin de semana"
                className="w-full bg-[#090e1b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Monto Total ({currency})</label>
              <input
                type="number"
                required
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-[#090e1b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Nº de Integrantes</label>
              <input
                type="number"
                min="2"
                max="20"
                value={newMembers}
                onChange={(e) => setNewMembers(e.target.value)}
                className="w-full bg-[#090e1b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Crear División
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {splits.map((s) => (
          <div key={s.id} className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{s.title}</span>
              <span className="text-[11px] font-mono text-slate-400">{s.date}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Total de la cuenta:</span>
              <span className="font-mono font-bold text-white">{formatCurrency(s.total, currency)}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300">Tu parte proporcional ({s.members} personas):</span>
              </div>
              <span className="font-mono font-bold text-cyan-300">
                {formatCurrency(s.yourShare, currency)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {s.status}
              </span>
              <button className="text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                Cobrar link <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
