import React, { useState } from 'react';
import { 
  X, 
  ScanLine, 
  UploadCloud, 
  Receipt, 
  ArrowRight, 
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface ReceiptScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportReceipt: (receiptData: {
    description: string;
    amount: number;
    category: string;
    subcategory: string;
  }) => void;
  currency: 'COP' | 'USD';
}

export const ReceiptScannerModal: React.FC<ReceiptScannerModalProps> = ({
  isOpen,
  onClose,
  onImportReceipt,
  currency
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScannedResult({
        merchant: 'Éxito Express & Market',
        date: '06 Octubre, 2026',
        nit: '890.900.608-9',
        items: [
          { name: 'Café Grano Especialidad 500g', price: 34000 },
          { name: 'Aceite de Oliva Extra Virgen', price: 42500 },
          { name: 'Salmón Fresco Porcionado', price: 58000 }
        ],
        tax: 25555,
        total: 134500,
        suggestedCategory: 'Alimentación & Gastronomía',
        suggestedSubcategory: 'Supermercados'
      });
    }, 1800);
  };

  const handleApplyToExpenses = () => {
    if (scannedResult) {
      onImportReceipt({
        description: scannedResult.merchant,
        amount: scannedResult.total,
        category: scannedResult.suggestedCategory,
        subcategory: scannedResult.suggestedSubcategory,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-[32px] bg-white border border-gray-100 p-6 sm:p-7 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-blue-50 text-[#1e3fe4]">
              <ScanLine className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                  Escáner OCR de Recibos
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  AI OCR
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Extracción inteligente de tickets físicos y facturas electrónicas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Area */}
        {!scannedResult && !isScanning && (
          <div 
            onClick={handleSimulateScan}
            className="border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-gray-50/50 hover:bg-blue-50/30 transition-all group"
          >
            <div className="p-4 rounded-full bg-blue-50 text-[#1e3fe4] mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">
              Arrastra tu factura o haz clic para escanear
            </h4>
            <p className="text-xs text-gray-500 max-w-xs mb-4">
              Soporta imágenes JPG, PNG y archivos PDF de facturación electrónica.
            </p>
            <span className="px-4 py-2 rounded-full bg-[#1e3fe4] text-white text-xs font-semibold shadow-md">
              Simular escaneo de ticket de muestra
            </span>
          </div>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <div className="relative w-28 h-36 rounded-2xl bg-gray-900 border border-gray-700 flex flex-col justify-center items-center overflow-hidden mb-4 shadow-xl">
              <Receipt className="w-12 h-12 text-gray-500" />
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
            </div>
            <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
              Analizando estructura fiscal con OCR...
            </p>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Comercio • Discriminación de IVA • Categorización
            </p>
          </div>
        )}

        {/* Scanned Result Preview */}
        {scannedResult && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">Factura Procesada con Éxito</span>
                  <span className="text-[11px] text-emerald-600 font-medium">Confianza: 99.4%</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-emerald-700 font-sans">
                {formatCurrency(scannedResult.total, currency)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500">Comercio:</span>
                <span className="font-bold text-gray-900">{scannedResult.merchant}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500">Categoría asignada:</span>
                <span className="text-blue-600 font-bold">{scannedResult.suggestedCategory}</span>
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block text-[11px] font-mono">Ítems desglosados:</span>
                {scannedResult.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-gray-700 font-mono text-[11px]">
                    <span>• {item.name}</span>
                    <span>{formatCurrency(item.price, currency)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setScannedResult(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-800"
              >
                Escanear Otro
              </button>
              <button
                onClick={handleApplyToExpenses}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e3fe4] hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                <span>Importar a Movimientos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
