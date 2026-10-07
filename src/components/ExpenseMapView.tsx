import React, { useState } from 'react';
import { MapPin, Navigation, Store } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface ExpenseLocation {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  address: string;
  coords: { x: number; y: number }; // Percentage for interactive map pins
}

const MOCK_LOCATIONS: ExpenseLocation[] = [
  {
    id: 'loc-1',
    merchant: 'Rappi Prime - Supermercado',
    category: 'Alimentación',
    amount: 145000,
    date: 'Ayer, 7:40 PM',
    address: 'Calle 93 #14-20, Zona Norte',
    coords: { x: 42, y: 35 }
  },
  {
    id: 'loc-2',
    merchant: 'Cena Restaurante Criterión',
    category: 'Restaurantes',
    amount: 320000,
    date: '3 Octubre',
    address: 'Calle 69A #5-75, Zona G',
    coords: { x: 58, y: 52 }
  },
  {
    id: 'loc-3',
    merchant: 'Gasolina Primax Premium',
    category: 'Transporte',
    amount: 160000,
    date: '2 Octubre',
    address: 'Av. Carrera 30 #45-10',
    coords: { x: 28, y: 68 }
  },
  {
    id: 'loc-4',
    merchant: 'Starbucks Reserva',
    category: 'Cafeterías',
    amount: 28500,
    date: '29 Sep',
    address: 'Carrera 11 #93A-03, Parque de la 93',
    coords: { x: 48, y: 25 }
  },
  {
    id: 'loc-5',
    merchant: 'Smart Fit VIP',
    category: 'Salud & Gimnasio',
    amount: 119900,
    date: '30 Sep',
    address: 'Centro Comercial Andino',
    coords: { x: 65, y: 40 }
  }
];

export const ExpenseMapView: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<ExpenseLocation>(MOCK_LOCATIONS[0]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#3b82f6]" />
            <span>Mapa Geo-Analítico de Gastos</span>
          </h2>
          <p className="text-xs text-[#6b7280]">
            Visualiza dónde se concentran tus desembolsos físicos y comercios frecuentes
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm">
          <Navigation className="w-3.5 h-3.5 text-[#3b82f6]" />
          <span>5 puntos geo-referenciados este mes</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Interactive Map Visual */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-6 border border-gray-200/80 shadow-md relative min-h-[380px] overflow-hidden flex flex-col justify-between">
          {/* Map stylized background grid */}
          <div 
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#2563eb 1.5px, transparent 1.5px), linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
              backgroundSize: '24px 24px, 48px 48px, 48px 48px'
            }}
          />

          {/* Top filter badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Vista Satelital / Vectorial
            </span>
            <span className="text-xs text-gray-400">Toca un pin para ver el detalle</span>
          </div>

          {/* Map Pins Canvas */}
          <div className="relative w-full h-[260px] my-auto">
            {MOCK_LOCATIONS.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{ top: `${loc.coords.y}%`, left: `${loc.coords.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  title={`${loc.merchant} - $${loc.amount.toLocaleString()}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                      isSelected
                        ? 'bg-[#1e3fe4] text-white ring-4 ring-blue-300/60'
                        : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  {/* Tooltip on pin */}
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {loc.merchant}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer of the Map */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
            <span>Zona Urbana Principal • Bogotá D.C.</span>
            <span className="font-mono text-gray-700 font-semibold">Radio de análisis: 12 km</span>
          </div>
        </div>

        {/* Selected Location Card Details */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-200/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1e3fe4] flex items-center justify-center shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">
                  {selectedLocation.merchant}
                </h3>
                <span className="text-[11px] text-blue-600 font-medium">
                  {selectedLocation.category}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Monto del gasto:</span>
                <span className="font-mono font-bold text-gray-900 text-sm">
                  {formatCurrency(selectedLocation.amount, 'COP')}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Fecha y hora:</span>
                <span className="font-mono text-gray-700">{selectedLocation.date}</span>
              </div>
              <div className="pt-2 border-t border-gray-200/60 text-xs">
                <span className="text-gray-500 block mb-0.5">Ubicación física:</span>
                <span className="text-gray-800 font-medium">{selectedLocation.address}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Registrado automáticamente mediante conciliación de tarjeta y geolocalización del ticket emitido.
            </p>
          </div>

          <button 
            onClick={() => alert(`Ruta hacia ${selectedLocation.merchant} abierta en mapas.`)}
            className="w-full mt-4 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Ver ruta en Google Maps</span>
          </button>
        </div>
      </div>
    </div>
  );
};
