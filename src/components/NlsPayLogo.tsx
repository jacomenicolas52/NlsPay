import React from 'react';

export interface NlsPayLogoProps {
  className?: string;
  isDark?: boolean; // Set to true if the logo is over a light background
}

/**
 * NlsPay Official Vector Logo Component
 * - Over dark background (isDark = false): Left pilar (#C8D9E6), Right pilar (#FFFFFF), Diagonal (#567C8D)
 * - Over light background (isDark = true): Left pilar (#567C8D), Right pilar (#2F4156), Diagonal (#C8D9E6)
 */
export const NlsPayLogo: React.FC<NlsPayLogoProps> = ({ 
  className = "w-10 h-10", 
  isDark = false 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Pilar Izquierdo */}
      <path 
        d="M20 85V15L42 15V85H20Z" 
        fill={isDark ? "#567C8D" : "#C8D9E6"}
      />
      {/* Pilar Derecho */}
      <path 
        d="M58 15V85H80V15H58Z" 
        fill={isDark ? "#2F4156" : "#FFFFFF"}
      />
      {/* Barra Diagonal */}
      <path 
        d="M20 15H42L80 85H58L20 15Z" 
        fill={isDark ? "#C8D9E6" : "#567C8D"}
      />
    </svg>
  );
};

export default NlsPayLogo;
