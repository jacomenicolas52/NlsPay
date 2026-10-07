import React, { useState } from 'react';
import { 
  X, 
  ScanLine, 
  UploadCloud, 
  Sparkles, 
  Receipt, 
  ArrowRight, 
  FileCheck2 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-2xl glass-panel border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ScanLine className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Escáner OCR de Recibos
                </h2>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                  AI OCR
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Extracción inteligente de tickets físicos y facturas electrónicas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Area */}
        {!scannedResult && !isScanning && (
          <div 
            onClick={handleSimulateScan}
            className="border-2 border-dashed border-white/20 hover:border-cyan-400/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
          >
            <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400 mb-3 group-hover:scale-110 group-hover:shadow-glow-cyan transition-all">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">
              Arrastra tu factura o haz clic para escanear
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mb-4">
              Soporta imágenes JPG, PNG y archivos PDF de facturación electrónica DIAN.
            </p>
            <span className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
              Simular escaneo de ticket de muestra
            </span>
          </div>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <div className="py-12 flex flex-col items-center justify-center text-center relative">
            <div className="relative w-28 h-36 rounded-lg bg-slate-900 border border-white/20 flex flex-col justify-center items-center overflow-hidden mb-4 shadow-2xl">
              <Receipt className="w-12 h-12 text-slate-600" />
              {/* Animated laser line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
            </div>
            <p className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              Analizando estructura fiscal con OCR...
            </p>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Detectando Comercio • Discriminación de IVA • Categorización
            </p>
          </div>
        )}

        {/* Scanned Result Preview */}
        {scannedResult && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold text-emerald-300 block">Factura Procesada con Éxito</span>
                  <span className="text-[11px] text-slate-400">Confianza de coincidencia: 99.4%</span>
                </div>
              </div>
              <span className="text-sm font-extrabold font-mono text-emerald-400">
                {formatCurrency(scannedResult.total, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#090e1b] border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">Comercio emisor:</span>
                <span className="font-semibold text-white">{scannedResult.merchant}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">Categoría asignada:</span>
                <span className="text-emerald-400 font-semibold">{scannedResult.suggestedCategory}</span>
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-slate-400 block text-[11px] font-mono">Ítems desglosados:</span>
                {scannedResult.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-slate-300 font-mono text-[11px]">
                    <span>• {item.name}</span>
                    <span>{formatCurrency(item.price, currency)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setScannedResult(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Escanear Otro
              </button>
              <button
                onClick={handleApplyToExpenses}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-glow-teal"
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
