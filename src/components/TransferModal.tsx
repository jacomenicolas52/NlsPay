import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import type { CardData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: CardData[];
  onTransferSuccess: (amount: number, recipient: string) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  cards,
  onTransferSuccess,
}) => {
  const { t } = useLanguage();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || '');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!recipient.trim() || isNaN(val) || val <= 0) return;

    onTransferSuccess(val, recipient);
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-[32px] p-6 shadow-2xl border border-[#C8D9E6] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[#2F4156] hover:bg-[#F5EFEB] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#C8D9E6]/40 text-[#567C8D] flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2F4156]">{t.transferTitle}</h3>
            <p className="text-xs text-[#567C8D]">Envía dinero al instante entre cuentas</p>
          </div>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-[#2F4156]">¡Transferencia exitosa!</h4>
            <p className="text-xs text-[#567C8D]">
              Se han enviado ${amount} a {recipient}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#567C8D] mb-1">
                Desde la tarjeta
              </label>
              <select
                value={selectedCardId}
                onChange={(e) => setSelectedCardId(e.target.value)}
                className="w-full bg-[#F5EFEB]/50 border border-[#C8D9E6] rounded-xl px-3 py-2.5 text-xs text-[#2F4156] focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
              >
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.type.toUpperCase()} •••• {c.lastFour} (${c.balance.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#567C8D] mb-1">
                Destinatario (Nombre o Correo)
              </label>
              <input
                type="text"
                required
                placeholder="Ej. James Smith"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-[#F5EFEB]/50 border border-[#C8D9E6] rounded-xl px-3.5 py-2.5 text-xs text-[#2F4156] focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#567C8D] mb-1">
                Monto a transferir ($)
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#F5EFEB]/50 border border-[#C8D9E6] rounded-xl px-3.5 py-2.5 text-base font-bold text-[#2F4156] focus:outline-none focus:ring-2 focus:ring-[#567C8D] font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#567C8D] hover:text-[#2F4156]"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#567C8D] hover:bg-[#2F4156] text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Enviar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
