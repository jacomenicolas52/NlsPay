import React, { useState } from 'react';
import { MoreVertical, Wifi, Plus } from 'lucide-react';
import type { CardData } from '../types';

interface CardsCarouselProps {
  cards: CardData[];
  onAddCard: (newCard: CardData) => void;
}

export const CardsCarousel: React.FC<CardsCarouselProps> = ({ cards, onAddCard }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBalance, setNewBalance] = useState('5240');
  const [newLastFour, setNewLastFour] = useState('7890');
  const [newTheme, setNewTheme] = useState<'dark' | 'light'>('dark');

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(newBalance) || 1000;
    const card: CardData = {
      id: `card-${Date.now()}`,
      type: newTheme === 'dark' ? 'visa' : 'mastercard',
      balance: balanceNum,
      currencySymbol: '$',
      lastFour: newLastFour.slice(-4),
      expiryDate: '11/27',
      theme: newTheme
    };
    onAddCard(card);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-[#111827]">Cards</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="text-xs font-semibold text-[#3b82f6] hover:text-[#2563eb] flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Añadir</span>
          </button>
          <span className="text-[#9ca3af]">•</span>
          <button className="text-xs font-semibold text-[#9ca3af] hover:text-[#4b5563] transition-colors">
            See all
          </button>
        </div>
      </div>

      {/* Cards List / Grid (Matching Image 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => {
          const isDark = card.theme === 'dark';
          return (
            <div
              key={card.id}
              className={`relative h-[180px] sm:h-[195px] rounded-[24px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-lg transition-transform hover:scale-[1.01] ${
                isDark
                  ? 'bg-[#1b1c21] text-white shadow-[#1b1c21]/20'
                  : 'bg-white text-[#111827] border border-[#e5e7eb] shadow-sm'
              }`}
            >
              {/* Dot Matrix Globe Pattern Watermark */}
              <div 
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 1.2px, transparent 1.2px)`,
                  backgroundSize: '12px 12px'
                }}
              />

              {/* Top Row: Balance & Options */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">
                  {card.currencySymbol} {card.balance.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <button 
                  aria-label="Opciones de tarjeta"
                  className={`p-1 rounded-full transition-colors ${
                    isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Middle Row: Card Number with Contactless Icon */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest relative z-10 opacity-80">
                <span>**** {card.lastFour}</span>
                <Wifi className="w-3.5 h-3.5 rotate-90 opacity-70" />
              </div>

              {/* Bottom Row: Expiry & Logo */}
              <div className="flex items-end justify-between relative z-10">
                <span className="text-xs sm:text-sm font-mono font-medium opacity-80">
                  {card.expiryDate}
                </span>

                {/* Brand Logo */}
                {card.type === 'visa' ? (
                  <span className="text-base sm:text-lg font-black tracking-tighter italic font-sans">
                    VISA
                  </span>
                ) : (
                  /* Mastercard Dual Circle Logo */
                  <div className="flex items-center -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#111827]" />
                    <div className="w-6 h-6 rounded-full bg-[#9ca3af]/60 backdrop-blur-sm" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3">Añadir Nueva Tarjeta</h3>
            <form onSubmit={handleCreateCard} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Saldo inicial ($)</label>
                <input
                  type="number"
                  required
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Últimos 4 dígitos</label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={newLastFour}
                  onChange={(e) => setNewLastFour(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Estilo visual</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTheme('dark')}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      newTheme === 'dark' ? 'bg-[#1b1c21] text-white border-black' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Negra (Visa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTheme('light')}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      newTheme === 'light' ? 'bg-white text-gray-900 border-gray-400' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Blanca (Mastercard)
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 text-xs text-gray-500 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md"
                >
                  Guardar Tarjeta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
