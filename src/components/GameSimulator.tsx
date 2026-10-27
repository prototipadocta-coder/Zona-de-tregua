import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  RotateCcw, 
  Trophy, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Info, 
  User, 
  Swords, 
  Scale, 
  Users, 
  MessageSquare,
  School,
  Share2
} from 'lucide-react';
import { Character, Scenario, ChoiceOption, GameState, TabType } from '../types';
import { CHARACTERS, SCENARIOS } from '../data/gameData';
import { sounds } from '../utils/audio';
import { Interactive2DWorld } from './Interactive2DWorld';
import { Footprints, BookOpen } from 'lucide-react';

interface GameSimulatorProps {
  onNavigateTab: (tab: TabType) => void;
}

export const GameSimulator: React.FC<GameSimulatorProps> = ({ onNavigateTab }) => {
  const [minigameMode, setMinigameMode] = useState<'2d_world' | 'narrative'>('2d_world');
  const [gameState, setGameState] = useState<GameState>({
    selectedCharacter: null,
    selectedScenario: null,
    currentStageIndex: 0,
    tensionLevel: 30,
    peaceReputation: 50,
    tranquility: 60,
    history: [],
    isCompleted: false
  });

  const [activeFeedback, setActiveFeedback] = useState<ChoiceOption | null>(null);

  // Trigger confetti when high peace score achieved
  const triggerVictoryConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSelectCharacter = (character: Character) => {
    sounds.playClick();
    setGameState((prev) => ({
      ...prev,
      selectedCharacter: character,
      selectedScenario: null,
      currentStageIndex: 0,
      history: [],
      isCompleted: false
    }));
    setActiveFeedback(null);
  };

  const handleSelectScenario = (scenario: Scenario) => {
    sounds.playClick();
    setGameState((prev) => ({
      ...prev,
      selectedScenario: scenario,
      currentStageIndex: 0,
      tensionLevel: scenario.dangerLevel === 'Crítico' ? 45 : 30,
      peaceReputation: 50,
      tranquility: 60,
      history: [],
      isCompleted: false
    }));
    setActiveFeedback(null);
  };

  const handleMakeChoice = (option: ChoiceOption) => {
    sounds.playClick();
    setActiveFeedback(option);

    const newTension = Math.max(0, Math.min(100, gameState.tensionLevel + option.tensionScoreDelta));
    const newPeace = Math.max(0, Math.min(100, gameState.peaceReputation + option.peaceScoreDelta));
    const newTranquility = Math.max(0, Math.min(100, gameState.tranquility + option.tranquilityDelta));

    if (option.type === 'assertive') {
      sounds.playPeaceBell();
    }

    setGameState((prev) => ({
      ...prev,
      tensionLevel: newTension,
      peaceReputation: newPeace,
      tranquility: newTranquility,
      history: [
        ...prev.history,
        { stageIndex: prev.currentStageIndex, choice: option }
      ]
    }));
  };

  const handleNextStage = () => {
    sounds.playClick();
    if (!gameState.selectedScenario) return;

    const nextIndex = gameState.currentStageIndex + 1;
    if (nextIndex < gameState.selectedScenario.stages.length) {
      setGameState((prev) => ({
        ...prev,
        currentStageIndex: nextIndex
      }));
      setActiveFeedback(null);
    } else {
      // Completed scenario
      setGameState((prev) => ({
        ...prev,
        isCompleted: true
      }));
      setActiveFeedback(null);
      if (gameState.peaceReputation >= 60) {
        triggerVictoryConfetti();
      }
    }
  };

  const handleResetGame = () => {
    sounds.playClick();
    setGameState({
      selectedCharacter: null,
      selectedScenario: null,
      currentStageIndex: 0,
      tensionLevel: 30,
      peaceReputation: 50,
      tranquility: 60,
      history: [],
      isCompleted: false
    });
    setActiveFeedback(null);
  };

  const currentStage = gameState.selectedScenario?.stages[gameState.currentStageIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
        <button
          onClick={() => {
            sounds.playClick();
            setMinigameMode('2d_world');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
            minigameMode === '2d_world'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span>Mundo 2D en Movimiento</span>
          <span className="text-[10px] bg-emerald-950/40 text-emerald-900 font-extrabold px-1 rounded hidden sm:inline">NUEVO</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setMinigameMode('narrative');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
            minigameMode === 'narrative'
              ? 'bg-sky-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Dilemas Narrativos</span>
        </button>
      </div>

      {/* RENDER 2D EXPLORABLE WORLD */}
      {minigameMode === '2d_world' ? (
        <Interactive2DWorld onNavigateTab={onNavigateTab} />
      ) : (
        /* RENDER NARRATIVE DILEMMAS */
        <div className="space-y-8">
          {/* Game Title & Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Simulador de Toma de Decisiones</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dilemas Callejeros: Elige tu Camino
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Descubre cómo cada decisión en la calle, el chat o la cancha cambia tus consecuencias legales, tu salud física y tu reputación real.
            </p>
          </div>

          {/* STEP 1: Character Selection */}
          {!gameState.selectedCharacter && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              Paso 1: Selecciona a tu Personaje
            </h3>
            <span className="text-xs text-slate-400">3 perfiles con retos reales</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CHARACTERS.map((char) => (
              <div
                key={char.id}
                onClick={() => handleSelectCharacter(char)}
                className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 group-hover:scale-110 transition-transform">
                      {char.avatar}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {char.age} años
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {char.name}
                    </h4>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                      {char.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {char.description}
                  </p>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <p className="text-[11px] text-amber-300/90 italic">
                      {char.quote}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Rasgos:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {char.traits.map((trait, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Jugar con {char.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Scenario Selection (If character chosen, but scenario not yet) */}
      {gameState.selectedCharacter && !gameState.selectedScenario && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 bg-slate-800 rounded-lg">{gameState.selectedCharacter.avatar}</span>
              <div>
                <p className="text-xs text-slate-400">Personaje actual:</p>
                <p className="text-sm font-bold text-white">{gameState.selectedCharacter.name} ({gameState.selectedCharacter.role})</p>
              </div>
            </div>
            <button
              onClick={() => setGameState(prev => ({ ...prev, selectedCharacter: null }))}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Cambiar personaje
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-sky-400" />
              Paso 2: Elige el Escenario de Tensión
            </h3>
            <span className="text-xs text-slate-400">3 situaciones cotidianas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SCENARIOS.map((scen) => (
              <div
                key={scen.id}
                onClick={() => handleSelectScenario(scen)}
                className={`group relative p-6 rounded-2xl bg-gradient-to-b ${scen.bgGradient} border border-slate-800 hover:border-sky-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl hover:-translate-y-1.5`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      scen.dangerLevel === 'Crítico' 
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      Riesgo: {scen.dangerLevel}
                    </span>
                    <span className="text-xs text-slate-400">{scen.stages.length} fases</span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {scen.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scen.subtitle}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <span className="text-sky-400 font-semibold">Lugar:</span>
                    <span>{scen.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-sky-400">
                  <span>Comenzar dilema</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Active Gameplay */}
      {gameState.selectedCharacter && gameState.selectedScenario && !gameState.isCompleted && currentStage && (
        <div className="space-y-6">
          {/* Top HUD: Meters */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 bg-slate-800 rounded-xl">{gameState.selectedCharacter.avatar}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{gameState.selectedCharacter.name}</h4>
                  <p className="text-xs text-slate-400">{gameState.selectedScenario.title} · {currentStage.stageTitle}</p>
                </div>
              </div>
              <button
                onClick={handleResetGame}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar simulación</span>
              </button>
            </div>

            {/* Dynamic HUD Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              
              {/* Tension Level */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Flame className={`w-3.5 h-3.5 ${gameState.tensionLevel > 70 ? 'text-rose-500 animate-pulse' : 'text-amber-400'}`} />
                    Nivel de Tensión
                  </span>
                  <span className={`font-mono ${gameState.tensionLevel > 70 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                    {gameState.tensionLevel}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      gameState.tensionLevel > 70
                        ? 'bg-rose-500'
                        : gameState.tensionLevel > 40
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${gameState.tensionLevel}%` }}
                  />
                </div>
              </div>

              {/* Peace Reputation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Reputación Pacífica
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {gameState.peaceReputation}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${gameState.peaceReputation}%` }}
                  />
                </div>
              </div>

              {/* Personal Tranquility */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Heart className="w-3.5 h-3.5 text-sky-400" />
                    Tranquilidad Personal
                  </span>
                  <span className="font-mono text-sky-400 font-bold">
                    {gameState.tranquility}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-sky-400 transition-all duration-500"
                    style={{ width: `${gameState.tranquility}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Scenario Situation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-300">
                <School className="w-3.5 h-3.5 text-slate-400" />
                <span>{gameState.selectedScenario.location}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {currentStage.stageTitle}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStage.narrative}
              </p>
            </div>

            {/* In-game dialogue bubble */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{currentStage.dialogueSpeaker}:</span>
              </div>
              <p className="text-sm font-medium text-white italic pl-5 border-l-2 border-rose-500/60">
                "{currentStage.dialogueText}"
              </p>
              <div className="text-xs text-amber-400/90 flex items-center gap-1.5 pt-1">
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>{currentStage.crowdReaction}</span>
              </div>
            </div>

            {/* Decision Choices (If feedback not yet chosen) */}
            {!activeFeedback && (
              <div className="space-y-3 pt-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  ¿Cómo decides actuar? (Elige tu camino):
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {currentStage.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleMakeChoice(option)}
                      className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 text-left transition-all duration-200 cursor-pointer flex items-start gap-3 group"
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        option.type === 'violent'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : option.type === 'avoidant'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {option.id}
                      </span>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          {option.text}
                        </p>
                        <span className="text-[11px] text-slate-400 block">
                          {option.type === 'violent' && '⚠️ Opción de confrontación física inmediata'}
                          {option.type === 'avoidant' && '🤐 Opción de represión y sumisión'}
                          {option.type === 'assertive' && '🛡️ Opción de asertividad y mediación pacífica'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* In-depth Immediate Feedback Panel */}
            {activeFeedback && (
              <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-2">
                <div className={`p-5 rounded-xl border ${
                  activeFeedback.type === 'assertive'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : activeFeedback.type === 'violent'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2 font-bold text-base">
                    {activeFeedback.type === 'assertive' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300">Decisión Asertiva: Controlaste el escenario</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span className="text-rose-300">Consecuencias Reales de esta Elección</span>
                      </>
                    )}
                  </div>

                  <p className="text-sm font-medium text-white mb-3">
                    {activeFeedback.immediateConsequence}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-white/10">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Riesgo a corto plazo:
                      </span>
                      <p className="text-slate-300">{activeFeedback.shortTermRisk}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-300 flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-sky-400" />
                        Impacto legal y escolar:
                      </span>
                      <p className="text-slate-300">{activeFeedback.longTermImpact}</p>
                    </div>
                  </div>

                  {/* Mediator Expert Tip */}
                  <div className="mt-4 p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Consejo del Mediador Escolar:</span>
                    </div>
                    <p className="text-slate-300">{activeFeedback.mediatorTip}</p>
                  </div>
                </div>

                {/* Continue button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextStage}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <span>
                      {gameState.currentStageIndex + 1 < gameState.selectedScenario.stages.length
                        ? 'Siguiente Momento del Dilema'
                        : 'Ver Evaluación y Resultado Final'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* STEP 4: Game Completed Summary Screen */}
      {gameState.isCompleted && gameState.selectedCharacter && gameState.selectedScenario && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Simulación Finalizada
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {gameState.peaceReputation >= 70
                ? '¡Medalla de Pacificador Escolar!'
                : gameState.peaceReputation >= 40
                ? 'Resolución Parcial: Lograste evitar lo peor'
                : 'Alerta Roja: La violencia se cobró un alto precio'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Has completado el escenario con <strong className="text-white">{gameState.selectedCharacter.name}</strong> en <strong className="text-white">{gameState.selectedScenario.title}</strong>.
            </p>
          </div>

          {/* Final Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <div>
              <p className="text-xs text-slate-400">Reputación Pacífica</p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">{gameState.peaceReputation}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Tensión Final</p>
              <p className={`text-xl sm:text-2xl font-extrabold ${gameState.tensionLevel > 60 ? 'text-rose-400' : 'text-slate-200'}`}>
                {gameState.tensionLevel}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Tranquilidad</p>
              <p className="text-xl sm:text-2xl font-extrabold text-sky-400">{gameState.tranquility}%</p>
            </div>
          </div>

          {/* Lessons Learned */}
          <div className="text-left p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs sm:text-sm text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-400" />
              Lecciones Clave para la Vida Real:
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              <li>El 90% de las peleas escolares no se originan por motivos de vida o muerte, sino por la presión de quedar bien frente a quienes graban con celulares.</li>
              <li>Decir *"No me presto para el show de nadie"* te eleva como líder respetado, mientras que pelear te deja expuesto a sanciones penales y lesiones físicas.</li>
              <li>La verdadera fuerza está en el autocontrol de tus emociones.</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetGame}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Probar otro personaje o escenario</span>
            </button>

            <button
              onClick={() => onNavigateTab('herramientas')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
            >
              <Heart className="w-4 h-4 text-emerald-400" />
              <span>Ir a Herramientas de Calma</span>
            </button>
          </div>
        </div>
      )}

        </div>
      )}

    </div>
  );
};
