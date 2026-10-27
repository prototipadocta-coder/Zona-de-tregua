import React from 'react';

export type Mood = 'calm' | 'angry' | 'smug' | 'happy' | 'worried';

interface Look {
  skin: string;
  hair: string;
  hairStyle: 'short' | 'spiky' | 'long' | 'bun' | 'cap' | 'chef';
  shirt: string;
  pants: string;
  extra?: 'backpack' | 'apron' | 'whistle' | 'glasses';
  mood: Mood;
}

// Jugadores (por id) y personajes del mapa (por su avatar original)
const LOOKS: Record<string, Look> = {
  alex: { skin: '#d9a273', hair: '#1f1410', hairStyle: 'spiky', shirt: '#d9a21b', pants: '#1c3c5d', extra: 'backpack', mood: 'calm' },
  sam: { skin: '#c68a5c', hair: '#3b2418', hairStyle: 'long', shirt: '#2a9d4f', pants: '#2a4163', extra: 'backpack', mood: 'worried' },
  dani: { skin: '#e0b08a', hair: '#2b1d14', hairStyle: 'short', shirt: '#2f87cc', pants: '#0f2038', extra: 'backpack', mood: 'calm' },
  '😠': { skin: '#c68a5c', hair: '#14100d', hairStyle: 'short', shirt: '#c0392b', pants: '#2a2a3a', mood: 'angry' },
  '👩‍🏫': { skin: '#e0b08a', hair: '#5a3a2a', hairStyle: 'bun', shirt: '#7a4f9e', pants: '#2b2b3a', extra: 'glasses', mood: 'happy' },
  '👨‍🍳': { skin: '#d9a273', hair: '#3a3a3a', hairStyle: 'chef', shirt: '#f4f7fb', pants: '#2a2a3a', extra: 'apron', mood: 'happy' },
  '😏': { skin: '#e0b08a', hair: '#1f1410', hairStyle: 'cap', shirt: '#4b4b5a', pants: '#1c1c28', mood: 'smug' },
  '🤝': { skin: '#c68a5c', hair: '#1f1410', hairStyle: 'long', shirt: '#1d6f85', pants: '#2a4163', mood: 'happy' },
  '😤': { skin: '#d9a273', hair: '#1f1410', hairStyle: 'spiky', shirt: '#2f6fb0', pants: '#14233a', mood: 'angry' },
  '🟨': { skin: '#e0b08a', hair: '#2b1d14', hairStyle: 'short', shirt: '#ebbb36', pants: '#14100d', extra: 'whistle', mood: 'calm' },
};

const FALLBACK: Look = { skin: '#d9a273', hair: '#2b1d14', hairStyle: 'short', shirt: '#2f87cc', pants: '#1c3c5d', mood: 'calm' };

interface SpriteProps {
  look: string;
  /** Alto en px (el ancho es proporcional) */
  size?: number;
  mood?: Mood;
  walking?: boolean;
  className?: string;
}

const Hair: React.FC<{ look: Look }> = ({ look }) => {
  const c = look.hair;
  switch (look.hairStyle) {
    case 'spiky':
      return <path d="M14 13 L13 6 L18 8 L20 2 L24 7 L28 2 L30 8 L35 6 L34 13 C31 9 28 8 24 8 C20 8 17 9 14 13Z" fill={c} />;
    case 'long':
      return <path d="M13.5 14 C13 5 19 2.5 24 2.5 C29 2.5 35 5 34.5 14 L35 28 L31 28 L31 13 C28 9 20 9 17 13 L17 28 L13 28Z" fill={c} />;
    case 'bun':
      return (
        <>
          <circle cx="24" cy="1.5" r="4" fill={c} />
          <path d="M14.5 13 C14 5 20 2.5 24 2.5 C29 2.5 34 5 33.5 13 C31 9 28 8 24 8 C20 8 17 9 14.5 13Z" fill={c} />
        </>
      );
    case 'cap':
      return (
        <>
          <path d="M14.5 11 C14.5 3 20 1.5 24 1.5 C28 1.5 33.5 3 33.5 11Z" fill="#c0392b" />
          <path d="M24 9 H38 C38 11.5 36 12.5 33 12.5 H24Z" fill="#8f2a20" />
        </>
      );
    case 'chef':
      return (
        <>
          <ellipse cx="24" cy="-1" rx="10.5" ry="6" fill="#ffffff" />
          <rect x="15" y="2" width="18" height="5" rx="1" fill="#e8edf4" />
        </>
      );
    default:
      return <path d="M14.5 13 C14 5 20 2.5 24 2.5 C29 2.5 34 5 33.5 13 C31 9 28 8 24 8 C20 8 17 9 14.5 13Z" fill={c} />;
  }
};

const Face: React.FC<{ mood: Mood }> = ({ mood }) => {
  const ink = '#1a1a1a';
  const brows =
    mood === 'angry' ? (
      <>
        <path d="M16.5 9.5 L22 12" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M31.5 9.5 L26 12" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      </>
    ) : mood === 'worried' ? (
      <>
        <path d="M17 11.5 L22 10" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M31 11.5 L26 10" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M17 10.5 H22" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M26 10.5 H31" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
      </>
    );
  const mouth =
    mood === 'happy' ? (
      <path d="M20.5 18 Q24 23 27.5 18 Z" fill="#fff" stroke={ink} strokeWidth="1" strokeLinejoin="round" />
    ) : mood === 'angry' ? (
      <path d="M20.5 21 Q24 17.5 27.5 21" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
    ) : mood === 'smug' ? (
      <path d="M21 19.5 Q25 20.5 28.5 17.5" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
    ) : mood === 'worried' ? (
      <path d="M21 20.5 Q24 18.5 27 20.5" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
    ) : (
      <path d="M21 19 Q24 21.5 27 19" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
    );
  return (
    <>
      {brows}
      <circle cx="20" cy="14.5" r="1.4" fill={ink} />
      <circle cx="28" cy="14.5" r="1.4" fill={ink} />
      {mouth}
    </>
  );
};

export const CharacterSprite: React.FC<SpriteProps> = ({ look, size = 48, mood, walking = false, className = '' }) => {
  const l = LOOKS[look] ?? FALLBACK;
  const m = mood ?? l.mood;
  const shoe = '#f4f7fb';
  return (
    <svg
      viewBox="0 -8 48 72"
      height={size}
      width={(size * 48) / 72}
      className={`${walking ? 'sprite-walking' : 'sprite-idle'} ${className}`}
      aria-hidden="true"
    >
      <ellipse cx="24" cy="61.5" rx="13" ry="3" fill="rgba(0,0,0,0.35)" />
      {l.extra === 'backpack' && <rect x="11" y="26" width="26" height="19" rx="6" fill="#0a1628" opacity="0.9" />}
      {/* Piernas */}
      <g className="sprite-leg sprite-leg-l">
        <rect x="17" y="43" width="6" height="14" rx="2.5" fill={l.pants} />
        <rect x="16" y="55" width="8" height="5" rx="2.5" fill={shoe} />
      </g>
      <g className="sprite-leg sprite-leg-r">
        <rect x="25" y="43" width="6" height="14" rx="2.5" fill={l.pants} />
        <rect x="24" y="55" width="8" height="5" rx="2.5" fill={shoe} />
      </g>
      {/* Brazos */}
      <g className="sprite-leg sprite-arm-l">
        <rect x="8.5" y="26" width="6" height="16" rx="3" fill={l.shirt} />
        <circle cx="11.5" cy="43" r="3" fill={l.skin} />
      </g>
      <g className="sprite-leg sprite-arm-r">
        <rect x="33.5" y="26" width="6" height="16" rx="3" fill={l.shirt} />
        <circle cx="36.5" cy="43" r="3" fill={l.skin} />
      </g>
      {/* Torso */}
      <rect x="14" y="24" width="20" height="22" rx="6" fill={l.shirt} />
      {l.extra === 'apron' && <path d="M17 30 H31 V46 H17 Z" fill="#ffffff" stroke="#c9d3e0" strokeWidth="0.8" />}
      {l.extra === 'whistle' && (
        <>
          <path d="M20 25 Q24 34 28 25" fill="none" stroke="#14100d" strokeWidth="0.9" />
          <circle cx="24" cy="33" r="2" fill="#e8edf4" stroke="#14100d" strokeWidth="0.8" />
        </>
      )}
      {/* Cuello y cabeza */}
      <rect x="21" y="20" width="6" height="6" fill={l.skin} />
      <ellipse cx="14.5" cy="15" rx="1.8" ry="2.4" fill={l.skin} />
      <ellipse cx="33.5" cy="15" rx="1.8" ry="2.4" fill={l.skin} />
      <ellipse cx="24" cy="14" rx="9.5" ry="10.5" fill={l.skin} />
      <Hair look={l} />
      <Face mood={m} />
      {l.extra === 'glasses' && (
        <g fill="none" stroke="#14100d" strokeWidth="1">
          <circle cx="20" cy="14.5" r="3.2" />
          <circle cx="28" cy="14.5" r="3.2" />
          <path d="M23.2 14.5 H24.8" />
        </g>
      )}
    </svg>
  );
};
