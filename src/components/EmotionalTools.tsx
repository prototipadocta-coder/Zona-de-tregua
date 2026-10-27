import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Wind, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  Copy, 
  Check, 
  ShieldAlert, 
  FileCheck2, 
  Smile, 
  Meh, 
  Frown, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { EmotionIntensity } from '../types';
import { ASSERTIVE_RESPONSES } from '../data/gameData';
import { sounds } from '../utils/audio';

export const EmotionalTools: React.FC = () => {
  // Emotion Thermometer State
  const [emotionLevel, setEmotionLevel] = useState<EmotionIntensity>(6);
  const [somaticFocus, setSomaticFocus] = useState<string[]>(['pecho']);

  // Breathing Exercise State (4-7-8 technique)
  // Phases: 'inhale' (4s) -> 'hold' (7s) -> 'exhale' (8s)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Assertive Responses State
  const [activeCategory, setActiveCategory] = useState<'todos' | 'reto-pelea' | 'burlas' | 'presion-amigos' | 'redes'>('todos');
  const [copiedResponseId, setCopiedResponseId] = useState<string | null>(null);

  // 24-Hour Truce Contract State
  const [truceName, setTruceName] = useState('');
  const [truceSigned, setTruceSigned] = useState(false);
  const [truceDate, setTruceDate] = useState('');

  // Breathing timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isBreathingActive) {
      interval = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Transition to next phase
            if (breathingPhase === 'inhale') {
              sounds.playBreathCue('hold');
              setBreathingPhase('hold');
              return 7;
            } else if (breathingPhase === 'hold') {
              sounds.playBreathCue('exhale');
              setBreathingPhase('exhale');
              return 8;
            } else {
              sounds.playBreathCue('inhale');
              setBreathingPhase('inhale');
              setCompletedCycles((c) => c + 1);
              return 4;
            }
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathingActive, breathingPhase]);

  const toggleBreathing = () => {
    sounds.playClick();
    if (!isBreathingActive) {
      sounds.playBreathCue(breathingPhase);
    }
    setIsBreathingActive(!isBreathingActive);
  };

  const resetBreathing = () => {
    sounds.playClick();
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
    setPhaseSecondsLeft(4);
    setCompletedCycles(0);
  };

  const handleCopyPhrase = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResponseId(id);
    setTimeout(() => setCopiedResponseId(null), 2000);
  };

  const handleSignTruce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!truceName.trim()) return;
    sounds.playPeaceBell();
    setTruceSigned(true);
    setTruceDate(new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
  };

  const filteredResponses = activeCategory === 'todos' 
    ? ASSERTIVE_RESPONSES 
    : ASSERTIVE_RESPONSES.filter(r => r.category === activeCategory);

  // Somatic areas list
  const somaticOptions = [
    { id: 'mandibula', label: 'Mandíbula apretada' },
    { id: 'punos', label: 'Puños cerrados' },
    { id: 'pecho', label: 'Presión / Opresión en el pecho' },
    { id: 'estomago', label: 'Nudo en el estómago' },
    { id: 'cara', label: 'Calor / Rostro ardiendo' },
    { id: 'temblor', label: 'Manos o piernas temblorosas' }
  ];

  const toggleSomatic = (id: string) => {
    sounds.playClick();
    setSomaticFocus(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      
      {/* Module Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Descompresión Emocional Inmediata</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Zona de Herramientas de Calma
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Cuando la adrenalina sube, el cerebro racional se apaga. Usa estas herramientas para desactivar el impulso físico antes de reaccionar.
        </p>
      </div>

      {/* TOOL 1: Termómetro de las Emociones */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Termómetro de las Emociones</h3>
              <p className="text-xs text-slate-400">Mide tu nivel de rabia, miedo o tensión en este momento</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            Nivel actual: {emotionLevel}/10
          </span>
        </div>

        {/* Thermometer Slider & Levels */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-emerald-400 flex items-center gap-1">
              <Smile className="w-4 h-4" /> 1: Calma / Paz
            </span>
            <span className="text-amber-400 flex items-center gap-1">
              <Meh className="w-4 h-4" /> 5: Tensión / Presión
            </span>
            <span className="text-rose-400 flex items-center gap-1">
              <Frown className="w-4 h-4" /> 10: Furia / Descontrol
            </span>
          </div>

          <div className="relative py-2">
            <input
              type="range"
              min="1"
              max="10"
              value={emotionLevel}
              onChange={(e) => {
                sounds.playClick();
                setEmotionLevel(Number(e.target.value) as EmotionIntensity);
              }}
              className="w-full h-3 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Quick buttons */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as EmotionIntensity[]).map((num) => (
              <button
                key={num}
                onClick={() => {
                  sounds.playClick();
                  setEmotionLevel(num);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  emotionLevel === num
                    ? 'bg-white text-slate-950 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Somatic Check */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            ¿Dónde estás sintiendo esta emoción en tu cuerpo? (Marca las que sientas):
          </label>
          <div className="flex flex-wrap gap-2">
            {somaticOptions.map((item) => {
              const active = somaticFocus.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleSomatic(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer border ${
                    active
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Advice Card based on level */}
        <div className={`p-5 rounded-2xl border transition-all ${
          emotionLevel >= 8
            ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            : emotionLevel >= 5
            ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="flex items-center gap-2 mb-2 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              {emotionLevel >= 8
                ? '¡Nivel Crítico de Adrenalina! Aléjate de la zona de confrontación ya'
                : emotionLevel >= 5
                ? 'Nivel Moderado: Hay riesgo de que una provocación te haga explotar'
                : 'Nivel Estable: Tu cerebro racional está al mando'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {emotionLevel >= 8 && (
              'En este nivel (8-10), tu cuerpo está listo para la lucha o la huida: tu ritmo cardíaco supera las 130 pulsaciones y no eres capaz de medir las consecuencias legales o físicas. No tomes ninguna decisión, no respondas chats ni vayas a ninguna esquina. Toma agua fría y haz 3 ciclos de respiración 4-7-8 abajo.'
            )}
            {emotionLevel >= 5 && emotionLevel < 8 && (
              'Sientes una molestia profunda, rabia o temor a quedar mal. Es el momento perfecto para aplicar una respuesta asertiva o firmar el pacto de tregua de 24 horas antes de que la situación escale.'
            )}
            {emotionLevel < 5 && (
              'Estás en una zona segura de calma mental. Es el mejor momento para hablar las cosas con serenidad, pedir mediación o simplemente ignorar provocaciones vacías.'
            )}
          </p>
        </div>
      </section>

      {/* TOOL 2: Ejercicio Guiado de Respiración 4-7-8 */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Respiración Anti-Pánico 4-7-8</h3>
              <p className="text-xs text-slate-400">Técnica clínica para reducir el ritmo cardíaco en menos de 2 minutos</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-teal-300 border border-slate-700 font-mono">
            Ciclos completados: {completedCycles}
          </span>
        </div>

        {/* Interactive Breathing Canvas Circle */}
        <div className="py-8 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            
            {/* Outer animated halo */}
            <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isBreathingActive && breathingPhase === 'inhale'
                ? 'bg-teal-500/20 scale-110 blur-xl'
                : isBreathingActive && breathingPhase === 'hold'
                ? 'bg-amber-500/25 scale-110 blur-xl'
                : isBreathingActive && breathingPhase === 'exhale'
                ? 'bg-emerald-500/15 scale-90 blur-lg'
                : 'bg-slate-800/40 blur-md'
            }`} />

            {/* Main Interactive Circle */}
            <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 shadow-2xl ${
              isBreathingActive && breathingPhase === 'inhale'
                ? 'scale-110 border-teal-400 bg-teal-950/60 shadow-teal-500/30'
                : isBreathingActive && breathingPhase === 'hold'
                ? 'scale-110 border-amber-400 bg-amber-950/60 shadow-amber-500/30'
                : isBreathingActive && breathingPhase === 'exhale'
                ? 'scale-90 border-emerald-400 bg-emerald-950/60 shadow-emerald-500/20'
                : 'scale-95 border-slate-700 bg-slate-950'
            }`}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {isBreathingActive ? (
                  breathingPhase === 'inhale' ? 'Inhala por la nariz' :
                  breathingPhase === 'hold' ? 'Sostén el aire' : 'Exhala por la boca'
                ) : 'Pausa mental'}
              </span>

              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                {isBreathingActive ? phaseSecondsLeft : '4-7-8'}
              </span>

              <span className="text-[11px] text-slate-300 mt-2 font-medium max-w-[150px]">
                {isBreathingActive ? (
                  breathingPhase === 'inhale' ? 'Llena tus pulmones lentamente (4s)' :
                  breathingPhase === 'hold' ? 'Mantén la calma y el aire (7s)' : 'Suelta toda la tensión despacio (8s)'
                ) : 'Presiona Iniciar para comenzar'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={toggleBreathing}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition cursor-pointer ${
                isBreathingActive
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isBreathingActive ? 'Pausar' : 'Iniciar Respiración Guiada'}</span>
            </button>

            <button
              onClick={resetBreathing}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Reiniciar ejercicio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TOOL 3: Generador de Respuestas Asertivas (Anti-Provocación) */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Respuestas Asertivas Anti-Provocación</h3>
              <p className="text-xs text-slate-400">Frases inteligentes para desarmar provocaciones sin mostrar miedo ni cobardía</p>
            </div>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'todos', label: 'Todas las situaciones' },
            { id: 'reto-pelea', label: 'Cita o reto a pelear' },
            { id: 'burlas', label: 'Burlas de cobardía / gallina' },
            { id: 'presion-amigos', label: 'Presión de amigos' },
            { id: 'redes', label: 'Ataques en redes sociales' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setActiveCategory(cat.id as typeof activeCategory);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Phrases List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResponses.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Si te dicen:
                </span>
                <p className="text-xs font-semibold text-rose-300 italic">
                  "{item.provocation}"
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Tu respuesta de poder:
                  </span>
                  <p className="text-sm font-bold text-white mt-1 leading-snug">
                    {item.response}
                  </p>
                </div>

                <p className="text-xs text-slate-400 pt-1">
                  💡 {item.explanation}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                <button
                  onClick={() => handleCopyPhrase(item.id, item.response)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
                >
                  {copiedResponseId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar frase</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOL 4: Pacto de Tregua de 24 Horas */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Pacto Simbólico de Tregua de 24 Horas</h3>
            <p className="text-xs text-slate-400">Comprométete contigo mismo a posponer cualquier confrontación</p>
          </div>
        </div>

        {!truceSigned ? (
          <form onSubmit={handleSignTruce} className="space-y-4 max-w-xl">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              La regla de las 24 horas es la técnica más efectiva contra la impulsividad: no perdonas ni te rindes; simplemente <strong>congelas cualquier acción violenta durante 24 horas</strong>. Si después de dormir y reflexionar sigues con rabia, buscas mediación, pero nunca una pelea en caliente.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                Tu nombre, alias o iniciales (anónimo si prefieres):
              </label>
              <input
                type="text"
                required
                value={truceName}
                onChange={(e) => setTruceName(e.target.value)}
                placeholder="Ej: Alex R. o 'Guerrero de Paz'"
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Firmar y Activar Pacto de 24 Horas</span>
            </button>
          </form>
        ) : (
          <div className="p-6 bg-emerald-950/30 border border-emerald-500/50 rounded-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                ✓ PACTO OFICIAL ACTIVADO
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Válido por 24 horas
              </span>
            </div>

            <h4 className="text-xl font-bold text-white">
              Certificado de Autocontrol y Madurez Personal
            </h4>

            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
              "Yo, <strong className="text-emerald-400 underline">{truceName}</strong>, pacto conmigo mismo y con mi futuro no participar en ninguna agresión física, ni responder insultos ni acudir a peleas durante las próximas 24 horas. Mi tranquilidad y mi libertad valen más que el show de los demás."
            </p>

            <div className="pt-2 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <span>Activado el: {truceDate}</span>
              <button
                onClick={() => {
                  sounds.playClick();
                  setTruceSigned(false);
                  setTruceName('');
                }}
                className="text-xs text-emerald-400 hover:underline text-left cursor-pointer"
              >
                Renovar o crear nuevo pacto
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
