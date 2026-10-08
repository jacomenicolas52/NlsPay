import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, type Language } from '../context/LanguageContext';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'glass' | 'solid' | 'labeled';
}

/**
 * High-definition circular vector flag icons matching the iconset.co / Flaticon circular style
 */
const SpainFlagIcon = () => (
  <svg className="w-5 h-5 rounded-full shrink-0 shadow-sm border border-black/10" viewBox="0 0 36 36">
    <defs>
      <clipPath id="es-flag-circle">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#es-flag-circle)">
      {/* Red bands */}
      <rect width="36" height="36" fill="#C60B1E" />
      {/* Yellow central band */}
      <rect y="9" width="36" height="18" fill="#FFC400" />
      {/* Coat of arms simplified silhouette */}
      <path d="M9.5 14.5 h4 v5 a2 2 0 0 1 -4 0 z" fill="#C60B1E" opacity="0.8" />
      <circle cx="11.5" cy="13.5" r="1.2" fill="#AA151B" />
      <rect x="8.5" y="14.5" width="1" height="5" fill="#990000" opacity="0.6" />
      <rect x="14" y="14.5" width="1" height="5" fill="#990000" opacity="0.6" />
    </g>
  </svg>
);

const UKFlagIcon = () => (
  <svg className="w-5 h-5 rounded-full shrink-0 shadow-sm border border-black/10" viewBox="0 0 36 36">
    <defs>
      <clipPath id="uk-flag-circle">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#uk-flag-circle)">
      <rect width="36" height="36" fill="#012169" />
      {/* White Saltire */}
      <path d="M0 0 L36 36 M36 0 L0 36" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="square" />
      {/* Red Saltire */}
      <path d="M0 0 L36 36 M36 0 L0 36" stroke="#C8102E" strokeWidth="2.5" strokeLinecap="square" />
      {/* White Cross */}
      <path d="M18 0 V36 M0 18 H36" stroke="#FFFFFF" strokeWidth="7" />
      {/* Red Cross */}
      <path d="M18 0 V36 M0 18 H36" stroke="#C8102E" strokeWidth="4.2" />
    </g>
  </svg>
);

const BrazilFlagIcon = () => (
  <svg className="w-5 h-5 rounded-full shrink-0 shadow-sm border border-black/10" viewBox="0 0 36 36">
    <defs>
      <clipPath id="br-flag-circle">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#br-flag-circle)">
      {/* Green Field */}
      <rect width="36" height="36" fill="#009739" />
      {/* Yellow Rhombus */}
      <polygon points="18,5 31,18 18,31 5,18" fill="#FEDF00" />
      {/* Blue Circle */}
      <circle cx="18" cy="18" r="7.5" fill="#012169" />
      {/* White Celestial Band */}
      <path d="M11 19.5 C 13.5 16.5, 22.5 17, 25 20" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
      {/* Southern Cross stars */}
      <circle cx="16.5" cy="20.5" r="0.6" fill="#FFFFFF" />
      <circle cx="19.5" cy="20.5" r="0.6" fill="#FFFFFF" />
      <circle cx="18" cy="21.5" r="0.5" fill="#FFFFFF" />
    </g>
  </svg>
);

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'glass' 
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; tag: string; label: string; Icon: React.FC }[] = [
    { code: 'es', tag: 'ES', label: 'España', Icon: SpainFlagIcon },
    { code: 'en', tag: 'UK', label: 'United Kingdom', Icon: UKFlagIcon },
    { code: 'pt', tag: 'PT', label: 'Brasil', Icon: BrazilFlagIcon },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button Matching Reference Image */}
      {variant === 'labeled' ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/15 text-white text-xs font-medium shadow-sm transition-all"
          title="Idioma"
        >
          <Globe className="w-3.5 h-3.5 text-[#C8D9E6]" />
          <span className="font-mono font-bold text-[11px] text-[#C8D9E6]">
            {language === 'es' ? 'ES' : language === 'en' ? 'EN' : 'PT'}
          </span>
          <span className="font-semibold text-xs text-white/95">
            {language === 'es' ? 'Español (ES)' : language === 'en' ? 'English (UK)' : 'Português (BR)'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-white/70" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={
            variant === 'glass'
              ? 'flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-sm transition-all group'
              : 'flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5EFEB] border border-[#C8D9E6] text-[#2F4156] text-xs font-semibold shadow-sm transition-all group'
          }
          title="Language"
        >
          <Globe className="w-4 h-4 text-inherit opacity-90 group-hover:scale-110 transition-transform" />
          <span>Language</span>
        </button>
      )}

      {/* Floating Popover Card with Triangle Arrow (Exact replica of Reference Image) */}
      {isOpen && (
        <div className="absolute top-full right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Top Triangle Caret Arrow */}
          <div className="flex justify-center -mb-1 relative z-10">
            <div className="w-0 h-0 border-x-[8px] border-x-transparent border-b-[8px] border-b-white drop-shadow-sm" />
          </div>

          {/* Card Box with circular vector flag icons */}
          <div className="bg-white rounded-2xl shadow-2xl p-2.5 w-60 border border-slate-100 flex flex-col gap-1">
            {languages.map((item) => {
              const isSelected = language === item.code;
              const Flag = item.Icon;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isSelected
                      ? 'bg-[#C8D9E6]/40 text-[#2F4156] font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {/* Two-letter tag */}
                  <span className={`w-6 font-mono text-[11px] ${isSelected ? 'text-[#2F4156] font-extrabold' : 'text-slate-400 font-semibold'}`}>
                    {item.tag}
                  </span>

                  {/* Circular Vector Flag matching iconset.co / Flaticon */}
                  <Flag />

                  {/* Country / Language Name */}
                  <span className="flex-1 truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
