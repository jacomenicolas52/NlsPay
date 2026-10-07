import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  ArrowRight, 
  Lock, 
  Mail, 
  Fingerprint, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('nicolas@nlspay.finance');
  const [password, setPassword] = useState('••••••••••••');
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphism Auth Card */}
      <div 
        className="w-full max-w-md rounded-3xl glass-panel border border-white/10 p-7 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          title="Cerrar vista de autenticación"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-[1.5px] shadow-glow-teal mb-3">
            <div className="w-full h-full bg-[#080d19] rounded-[13px] flex items-center justify-center">
              <Wallet className="w-7 h-7 text-emerald-400" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Nls<span className="text-emerald-400">Pay</span>
          </h2>
          <p className="text-xs font-semibold text-emerald-400/90 tracking-wide mt-0.5">
            Tu dinero. Tu control.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {isRegister
              ? 'Crea tu cuenta institucional y toma el control total de tus finanzas'
              : 'Accede a tu bóveda analítica y gestión de capital'}
          </p>
        </div>

        {/* Social Authentication Providers */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {/* Google */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all group"
            title="Continuar con Google"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7 0-1.2.2-2 .4-2.7L1.9 6.4C.7 8.8 0 10.4 0 12s.7 3.2 1.9 5.6l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16C3.7 19.8 7.5 23 12 23z"
              />
            </svg>
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all group"
            title="Continuar con Apple"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.14-.54 2.77-1.28z"/>
            </svg>
          </button>

          {/* Microsoft */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all group"
            title="Continuar con Microsoft Entra ID"
          >
            <svg className="w-4 h-4" viewBox="0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0b101c] px-3 text-[11px] text-slate-400 font-mono">
            o con credenciales
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@nlspay.finance"
                className="w-full bg-[#080d1b] border border-white/10 focus:border-emerald-400 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-300">
                Contraseña
              </label>
              <button type="button" className="text-[10px] text-emerald-400 hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#080d1b] border border-white/10 focus:border-emerald-400 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>
          </div>

          {/* Passkey option */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs cursor-pointer hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2 text-slate-300">
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px]">Autenticar con Passkey / Face ID</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold">WebAuthn</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-glow-teal hover:shadow-[0_0_30px_rgba(20,241,149,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" /> Verificando credenciales...
              </span>
            ) : (
              <>
                <span>{isRegister ? 'Crear Bóveda NlsPay' : 'Ingresar a Bóveda'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div className="text-center mt-5 pt-4 border-t border-white/[0.08] text-xs text-slate-400">
          <span>{isRegister ? '¿Ya tienes una cuenta?' : '¿Nuevo en NlsPay?'} </span>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline ml-1"
          >
            {isRegister ? 'Iniciar Sesión' : 'Crear Cuenta Institucional'}
          </button>
        </div>

        {/* Security watermark */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Protegido por Cifrado Cuántico de Cero Conocimiento</span>
        </div>
      </div>
    </div>
  );
};
