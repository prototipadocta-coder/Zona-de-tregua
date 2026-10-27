import React from 'react';
import { 
  ShieldCheck, 
  MessageSquareHeart, 
  Gamepad2, 
  HeartHandshake, 
  Lock, 
  Flame, 
  UserCheck, 
  ArrowRight,
  Sparkles,
  HeartPulse,
  BrainCircuit,
  PhoneCall
} from 'lucide-react';
import { TabType } from '../types';
import { sounds } from '../utils/audio';

interface HeroProps {
  onNavigate: (tab: TabType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-slate-800/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Confidentiality Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-sm">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">100% Anónimo y Seguro</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hidden sm:inline">Sin registros ni rastreo de IP</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Pausa el conflicto,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              toma el control de tu futuro
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            A la salida del colegio o en el barrio, una pelea de 2 minutos puede costarte una expulsión, una lesión permanente o un proceso legal. 
            <strong className="text-white font-semibold"> No te prestes para el show de los que solo graban para redes.</strong> Aquí puedes enfriar la mente, simular tus decisiones y resolver sin violencia.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('bot');
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <MessageSquareHeart className="w-5 h-5" />
              <span>Hablar con TreguaBot</span>
              <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded-full text-slate-950 font-extrabold uppercase">
                IA Escolar
              </span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onNavigate('juego');
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 text-white font-semibold text-sm sm:text-base shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-emerald-400" />
              <span>Jugar el Simulador de Conflictos</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Key Assurance Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cero juicios ni castigos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Diseñado con estudiantes y psicólogos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>Técnicas de mediación real</span>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (Youth-oriented interactive preview) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
          
          {/* Card 1: Chatbot */}
          <div 
            onClick={() => onNavigate('bot')}
            className="group relative p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:bg-slate-900 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                TreguaBot AI
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asistente empático en tiempo real. Desahógate, aprende a desescalar la rabia y descubre qué responder si te provocan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Abrir chat seguro</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Simulator Game */}
          <div 
            onClick={() => onNavigate('juego')}
            className="group relative p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 hover:bg-slate-900 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                Dilemas Callejeros
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Minijuego interactivo de rol. Vive los escenarios de la salida, WhatsApp y la cancha con Alex, Sam y Dani.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-sky-400 font-semibold">
              <span>Elegir personaje</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Emotional Tools */}
          <div 
            onClick={() => onNavigate('herramientas')}
            className="group relative p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:bg-slate-900 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Herramientas de Calma
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Termómetro de las Emociones, guía de respiración 4-7-8 interactiva y frases asertivas anti-provocación.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>Bajar la tensión</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Confidential Drop Box */}
          <div 
            onClick={() => onNavigate('buzon')}
            className="group relative p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:bg-slate-900 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                Buzón Seguro
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alerta de forma 100% anónima antes de que estalle una pelea. Pide mediación escolar neutral sin exponerte.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-teal-400 font-semibold">
              <span>Pedir orientación</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Reality Check Callout for Youth */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-white">
                ¿Sabías qué pasa cuando te prestas para una pelea callejera?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                Los que forman el círculo y sacan sus teléfonos no son tus amigos: están buscando vistas para sus redes a costa de tu cuerpo. Un mal golpe en un andén puede dejarte antecedentes penales juveniles y a tu familia endeudada. Decir "No peleo" es de líderes.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('lineas')}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Ver Líneas de Apoyo Urgente</span>
          </button>
        </div>

      </div>
    </section>
  );
};
