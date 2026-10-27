import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Logo de Zona de Tregua: escudo (protección) + paloma (paz) + rama de olivo (tregua).
 * Colores tomados de la paleta institucional definida en index.css.
 */
export const Logo: React.FC<LogoProps> = ({ className = 'w-11 h-11', title = 'Zona de Tregua' }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`sh${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d4770" />
          <stop offset="1" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id={`rim${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1d06a" />
          <stop offset="1" stopColor="#d9a21b" />
        </linearGradient>
      </defs>
      {/* Escudo */}
      <path d="M32 3 L57 11 V32 C57 47 46 57 32 62 C18 57 7 47 7 32 V11 Z" fill={`url(#sh${uid})`} stroke={`url(#rim${uid})`} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Paloma */}
      <path d="M17 33 C21 27 28 25 34 27 C36 22 41 19 47 20 C45 24 43 27 41 29 C44 30 46 32 47 35 C42 34 38 35 35 38 C30 42 22 42 17 33 Z" fill="#ffffff" />
      <path d="M29 28 C26 20 29 13 36 10 C35 16 36 21 39 26 C36 26 32 26 29 28 Z" fill="#e8edf4" />
      <circle cx="43.5" cy="23.5" r="1" fill="#0a1628" />
      <path d="M47 20 L52 21.5 L47 23 Z" fill="#d9a21b" />
      {/* Rama de olivo en el pico */}
      <path d="M47 23 C44 30 36 33 27 33" fill="none" stroke="#7fd496" strokeWidth="1.6" strokeLinecap="round" />
      <g fill="#4bbd6d">
        <ellipse cx="41" cy="30" rx="3.2" ry="1.5" transform="rotate(-35 41 30)" />
        <ellipse cx="36" cy="33.2" rx="3.2" ry="1.5" transform="rotate(-20 36 33.2)" />
        <ellipse cx="31" cy="34.4" rx="3.2" ry="1.5" transform="rotate(-5 31 34.4)" />
      </g>
      {/* Línea de calma (pausa) */}
      <path d="M20 49 Q26 45 32 49 T44 49" fill="none" stroke="#f1d06a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
