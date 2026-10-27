import React from 'react';
import { Shield, HeartHandshake, Lock, PhoneCall, EyeOff, Sparkles } from 'lucide-react';
import { TabType } from '../types';
import { sounds } from '../utils/audio';

interface FooterProps {
  onNavigateTab: (tab: TabType) => void;
  onActivateDiscreteMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onActivateDiscreteMode }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                ZONA DE TREGUA
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Plataforma escolar interactiva y confidencial para la desescalada de tensiones, prevención de riñas y resolución pacífica de conflictos entre jóvenes y adolescentes.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 text-[11px] font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Garantía de Privacidad Total: Sin cuentas ni rastreo</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Módulos Principales
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTab('bot')}
                  className="hover:text-emerald-300 transition text-left cursor-pointer"
                >
                  TreguaBot (Chatbot IA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('juego')}
                  className="hover:text-emerald-300 transition text-left cursor-pointer"
                >
                  Simulador: Dilemas Callejeros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('herramientas')}
                  className="hover:text-emerald-300 transition text-left cursor-pointer"
                >
                  Termómetro y Respiración 4-7-8
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('buzon')}
                  className="hover:text-emerald-300 transition text-left cursor-pointer"
                >
                  Buzón Seguro de Mediación
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('lineas')}
                  className="hover:text-emerald-300 transition text-left cursor-pointer"
                >
                  Líneas de Ayuda Inmediata
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Discretion */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Protección al Estudiante
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              ¿Alguien se acerca a tu pantalla? Presiona el botón de salida rápida para disfrazar la web como un apunte de ciencias.
            </p>
            <button
              onClick={() => {
                sounds.playClick();
                onActivateDiscreteMode();
              }}
              className="flex items-center gap-2 px-3 py-2 bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 rounded-xl font-semibold text-xs transition cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Activar Modo Discreto [ESC]</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright / peace commitment */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Zona de Tregua · Convivencia Pacífica Escolar</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              Resolución sin violencia
            </span>
            <span>·</span>
            <span>Acceso universal y libre</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
